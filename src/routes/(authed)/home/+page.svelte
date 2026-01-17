<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let L: any;

    let { data } = $props();

    const poly_style = {
        color: "#FF7700",
        weight: 3,
        opacity: 0.65
    }

    function onEachFeature(feature: any, layer: any) {
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }


    onMount(async () => {
        const dataMap = data.dataMap.features;
        console.log("data map", dataMap)
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

<div id="map"></div>

<style>
    #map {
        height: 94vh;
        width: 100%;
    }
</style>