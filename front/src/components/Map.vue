<template>
    <div class="container">
        <l-map v-if="!this.loading" ref="map" :zoom="zoom" :center="marker" style="width: 100%; height: 480px;">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
            <l-marker :lat-lng="marker">
                <l-popup>{{ signalement.voie }} <br/> {{ signalement.cp }} - {{ signalement.ville }}</l-popup>
            </l-marker>
        </l-map>
    </div>
</template>

<script>
import L from 'leaflet'
import Vue2Leaflet from 'vue2-leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const { LMap, LTileLayer, LMarker, LPopup } = Vue2Leaflet
export default {
	name: 'Map',
    components: { LMap, LTileLayer, LMarker, LPopup },
	props: {
        signalement: Object
	},
    data() {
        return {
            loading: true,
            zoom: 14,
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            marker: {}
        }
    },
    mounted() {
        setTimeout(() => {
            this.marker = L.latLng(this.signalement.coordonnees)
            this.loading = false
        }, 500)
    }
}
</script>
