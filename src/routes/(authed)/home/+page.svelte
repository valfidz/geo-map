<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import { jsPDF } from "jspdf"

    let L: any;

    let { data } = $props();
    let clicked = $state(false);
    let countries = $state([]);
    let clickedCountry: any = $state();
    let selected_country: any = $state([])

    const doc = new jsPDF();
    
    function handleDownload() {
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
        
        // const tableData = {
        //     user: dataUser,
        //     timestamp: timestamp,
        //     total_countries: total_country,
        //     selected_countries: select_country,
        //     all_country_name: all_country_name
        // }
        // doc.table(10, 10, tableData, null, null)

        doc.text(`User: ${dataUser}`, 10, 10);
        doc.text(`Timestamp: ${timestamp}`, 10, 20);
        doc.text(`Total countries: ${total_country}`, 10, 30);
        doc.text(`Selected countries: ${select_country}`, 10, 40);
        doc.text(`All Country Name: ${all_country_name}`, 10, 50);
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
            selected_country.push({ selected: false, name: country.properties.name })
        })

        selected_country.sort((a: any, b: any) => a.name.localeCompare(b.name))

    }

    function highlightClicked(e: any) {
        let layer = e.target;
        let current_country = layer.feature.properties.name
        clicked = !clicked
        // clickedCountry = layer.feature.properties.name

        // sebelumnya buat dulu state clicked_country dengan value seperti [{isClicked: false, name: 'country a'}, {isClicked: false, name: 'country b'}]
        // iterasi state clicked_country
        // jika clicked_country.name === current_country, cek isClicked
        // jika isClicked == false, ubah style menjadi style highlight dan ubah value isClicked menjadi true
        // jika isClicked == true, ubah style menjadi style awal dan ubah value isClicked menjadi false

        // layer.setStyle({
        //     weight: 6,
        //     color: "#FF7700",
        //     opacity: 0.8,
        //     fillOpacity: 0.4
        // })

        if (clicked) {
            layer.setStyle({
                weight: 6,
                color: "#FF7700",
                opacity: 0.8,
                fillOpacity: 0.4
            })
    
            layer.bringToFront()
            clickedCountry = layer.feature.properties.name
        } else {
            layer.setStyle({
                weight: 3,
                color: "#FF7700",
                opacity: 0.65,
                fillOpacity: 0.2
            })
    
            layer.bringToBack()
            clickedCountry = ''
        }
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
    <div class="row-span-5 bg-slate-100 h-full pl-2 pt-2 flex flex-col justify-between items-start">
        <div>
            <button onclick={handleDownload} class="btn mb-2 px-2 bg-yellow-300 hover:bg-yellow-500 rounded-md">Download as PDF</button>
        </div>
        <div class="max-h-[85vh] flex flex-col overflow-y-auto no-scrollbar">
            {#each selected_country as sCountry}
                <label class="{clickedCountry === sCountry.name ? 'bg-slate-300' : ''}">
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

        <div class="w-full pl-2">
            <ul class="pb-2">
                <li class="pb-2">{ data.user?.email }</li>
                <li>
                    <form method="POST" action="/home?/logout">
                        <button class="px-3 py-1 text-sm text-white duration-150 bg-blue-600 rounded-full hover:bg-blue-500 active:bg-blue-700">
                            Logout 
                        </button>
                    </form>
            </li>
            </ul>
        </div>
    </div>
    <div id="map" class="col-span-4 row-span-5"></div>
    {#each selected_country as sCountry}
        <p>{JSON.stringify(sCountry)}</p>
    {/each}
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