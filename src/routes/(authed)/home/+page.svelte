<script lang="ts">
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    let L: any;
    let marker;
    let circle;
    let polygon;
    let popup;

    onMount(async () => {
        if (browser) {
            L = await import('leaflet')

            // initiate map
            let map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            // add marker
            marker = L.marker([51.5, -0.09]).addTo(map);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

            // add circle
            circle = L.circle([51.508, -0.11], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(map);
            circle.bindPopup("I am a circle.");

            //add polygon
            polygon = L.polygon([
                [51.509, -0.08],
                [51.503, -0.06],
                [51.51, -0.047]
            ]).addTo(map);
            polygon.bindPopup("I am a polygon.");

            // add standalonde popup
            popup = L.popup()
                .setLatLng([51.513, -0.09])
                .setContent("I am a standalone popup.")
                .openOn(map);

            // add popup onclick
            function onMapClick(e: any) {
                popup = L.popup()
                    .setLatLng(e.latlng)
                    .setContent("You clicked the map at " + e.latlng.toString())
                    .openOn(map);
            }
            map.on('click', onMapClick);
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