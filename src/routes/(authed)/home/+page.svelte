<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { jsPDF } from "jspdf"
    import { autoTable } from 'jspdf-autotable'

    let L: any;

    let { data } = $props();
    let selected_country: any = $state([]);
    
    function handleDownload() {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'letter'
        });
        const dataUser = data.user?.email;
        const timestamp = new Date();
        const total_country = data.dataMap.features.length
        let all_country_name: any = []
        let select_country: any = []

        selected_country.forEach((country: any) => {
            all_country_name.push(country.name)

            if (country.selected === true || country.selected === 'true') {
                select_country.push(country.name)
            }
        })

        const tableColumn = ["Field", "Value"];
        const tableRows = [
            ["User", dataUser],
            ["Timestamp", timestamp],
            ["Total Countries", total_country],
            ["Selected Countries", select_country.join(', ')],
            ["All Countries", all_country_name.join(', ')]
        ]

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows
        })
        
        doc.save("Country-Map.pdf");
    }

    const poly_style = {
        color: "#FF7700",
        weight: 3,
        opacity: 0.65,
        fillOpacity: 0.2
    }

    function makeCountryState(countryObj: any) {
        countryObj.forEach((country: any) => {
            selected_country.push({ selected: false, isClicked: false, name: country.properties.name })
        })

        selected_country.sort((a: any, b: any) => a.name.localeCompare(b.name))

    }

    function highlightClicked(e: any) {
        let layer = e.target;
        let current_country = layer.feature.properties.name

        selected_country.forEach((cCountry: any) => {
            if (cCountry.name === current_country) {
                if (!cCountry.isClicked) {
                    layer.setStyle({
                        weight: 6,
                        color: "#FF7700",
                        opacity: 0.8,
                        fillOpacity: 0.4
                    })
            
                    layer.bringToFront()
                    cCountry.isClicked = true
                } else {
                    layer.setStyle({
                        weight: 3,
                        color: "#FF7700",
                        opacity: 0.65,
                        fillOpacity: 0.2
                    })
            
                    layer.bringToBack()
                    layer.closePopup()
                    cCountry.isClicked = false
                }
            } 
        })
    }

    function onEachFeature(feature: any, layer: any) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }

        layer.on({
            click: highlightClicked
        })
    }

    onMount(async () => {
        const dataMap = data.dataMap.features;
        makeCountryState(dataMap)
        
        if (browser) {
            L = await import('leaflet')

            // initiate map
            let map = L.map('map').setView([-7.33535, 108.204346], 4);
            
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
                
            // initiate geojson map
            L.geoJSON(dataMap, {
                style: poly_style,
                onEachFeature: onEachFeature
            }).addTo(map);
        }
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
     integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
     crossorigin=""/>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
     integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
     crossorigin=""></script>
</svelte:head>

<div class="grid grid-cols-5 grid-rows-5">
    <div class="row-span-5 bg-slate-100 flex flex-col justify-between items-start">
        <div class="w-full px-2 pt-2 bg-slate-200">
            <button onclick={handleDownload} class="btn mb-2 px-2 py-2 inline-block rounded-sm border border-yellow-600 bg-yellow-600 text-sm font-medium text-white hover:bg-transparent hover:text-yellow-600">Download as PDF</button>
        </div>
        <div class="max-h-[83vh] px-2 flex flex-col overflow-y-auto no-scrollbar">
            {#each selected_country as sCountry}
                <label class="{sCountry.isClicked ? 'bg-slate-300' : ''}">
                    <input
                        type="checkbox"
                        bind:checked={sCountry.selected}
                        name="countries"
                        value={sCountry.name}
                    />
                    { sCountry.name }
                </label>
            {/each}
        </div>

        <div class="w-full pl-2 bg-slate-200">
            <ul class="pb-2">
                <li class="pb-2">{ data.user?.email }</li>
                <li>
                    <form method="POST" action="/home?/logout">
                        <button class="px-3 py-1 text-sm text-white duration-150 bg-blue-600 rounded-sm hover:bg-blue-500 active:bg-blue-700">
                            Logout 
                        </button>
                    </form>
            </li>
            </ul>
        </div>
    </div>
    <div id="map" class="col-span-4 row-span-5"></div>
    <!-- {#each selected_country as sCountry}
        <p>{JSON.stringify(sCountry)}</p>
    {/each} -->
</div>

<style>
    #map {
        height: 100vh;
        width: 100%;
    }

    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>