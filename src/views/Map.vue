<template>
  <section>
    <Header></Header>
    <div id="mapid"></div>
    <Search @get-mapdata="getMapData"></Search>
  </section>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Header from '../components/Header.vue'
import Search from '../components/Search.vue'

var mymap = ''
const iconSettings = {
  iconSize: [32, 32],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
}
const icons = {
  bike: new L.Icon({
    iconUrl: require('../assets/img/bikemarker.png'),
    shadowUrl: require('../assets/img/bikemarker.png'),
    ...iconSettings
  })
}

export default ({
  data () {
    return {
      mapData: ''
    }
  },
  components: {
    Header,
    Search
  },
  methods: {
    getMap () {
      mymap = L.map('mapid', {
        center: [25.03, 121.55],
        zoom: 16
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a> contributors'
      }).addTo(mymap)
    },
    getMapData (data) {
      this.mapData = data
    },
    getLayer () {
      this.mapData.forEach((item) => {
        L.marker([item.StationPosition.PositionLat, item.StationPosition.PositionLon], { icon: icons.bike }).addTo(mymap)
          .bindPopup(`<h3 class="fs-6 fw-bold mb-5">${item.StationName.Zh_tw}</h3>
          <p class="fs-8 fw-bold mb-5">可借數量：${item.AvailableRentBikes}</p>
          <p class="fs-8 fw-bold mb-0">可歸還數量：${item.AvailableReturnBikes}</p>`)
      })
    },
    removeLayer () {
      mymap.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
          mymap.removeLayer(layer)
        }
      })
    },
    getPolyline (geo) {
      const wicket = new L.Wkt.Wkt()
      const geojsonFeature = wicket.read(geo).toJson()
      const myStyle = {
        color: 'blue',
        weight: 10,
        opacity: 0.65
      }
      const myLayer = L.geoJSON(geojsonFeature, {
        style: myStyle
      }).addto(mymap)
      myLayer.addData(geojsonFeature)
      console.log(myLayer)
      mymap.fitBounds(myLayer.getBounds())
    }
  },
  watch: {
    mapData () {
      this.removeLayer()
      if (this.$store.state.theme === 'rent') {
        this.getLayer()
      } else if (this.$store.state.theme === 'bike') {
        this.mapData.forEach((item) => {
          this.getPolyline(item.Geometry)
        })
      }
    }
  },
  mounted () {
    this.getMap()
  }
})
</script>
