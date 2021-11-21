<template>
  <div class="search bg-color pt-7 pb-10">
    <div class="border-bottom border-white border-1 d-flex flex-column justify-content-center align-items-center pb-10 px-13">
      <h2 class="fs-5 fw-bold text-white text-center mb-7">搜尋{{ this.$store.state.themeName }}</h2>
      <div class="search-item position-relative mb-7">
        <img src="../assets/img/search.png" alt="search icon" class="position-absolute">
        <input type="text" class="form-control rounded-4 ps-12 py-5" placeholder="請輸入位置" readonly>
      </div>
      <button class="btn btn-dark text-primary rounded-4 fs-6 px-10" @click.prevent="isShow = !isShow">
        選擇城市
        <img src="../assets/img/arrow2.png" alt="search icon" class="ms-4">
      </button>
    </div>
    <!-- country list -->
    <div v-if="isShow" class="countryList bg-dark">
      <ul class="list-unstyled d-flex flex-wrap p-3 mb-0">
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">臺北市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">新北市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">桃園市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">新竹縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">苗栗縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">台中市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">彰化縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">南投縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">雲林縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">嘉義縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">台南市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">高雄市</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">屏東縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">台東縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">宜蘭縣</a></li>
        <li><a href="#" class="fs-6 fw-bold text-primary d-block py-5 px-5">花蓮縣</a></li>
      </ul>
    </div>
    <div class="searchResults px-10">
      <template v-if="this.$store.state.theme === 'rent'">
        <div class="bg-card-color rounded-1 py-9 px-10 mt-10" v-for="station in stations" :key="station.StationID">
          <div class="row">
            <div class="col-2 text-center">
              <img src="../assets/img/bikeicon.png" alt="theme icon">
            </div>
            <div class="col-10">
              <h3 class="fs-6 fw-bold mb-5">{{ station.StationName.Zh_tw }}</h3>
              <p class="fw-bold mb-5">可借數量：{{ station.AvailableRentBikes }}</p>
              <p class="fw-bold mb-0">可歸還數量：{{ station.AvailableReturnBikes }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if="this.$store.state.theme === 'bike'">
        <div class="bg-card-color rounded-1 py-9 px-10 mt-10" v-for="bike in bikeWay" :key="bike.StationID">
          <div class="row">
            <div class="col-2 text-center">
              <img src="../assets/img/bikeicon.png" alt="theme icon">
            </div>
            <div class="col-10">
              <h3 class="fs-6 fw-bold mb-5">{{ bike.RouteName }}</h3>
              <p class="fw-bold mb-5">長度：{{ bike.CyclingLength }} 公尺</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stations: '',
      available: '',
      isShow: false,
      bikeWay: ''
    }
  },
  methods: {
    getStations () {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Taipei?$top=30'
      this.$http.get(url)
        .then((res) => {
          if (res.status === 200) {
            this.stations = res.data
            this.getAvailable()
          }
        })
    },
    getAvailable () {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/Taipei?$top=30'
      this.$http.get(url)
        .then((res) => {
          if (res.status === 200) {
            this.available = res.data
            this.stations.forEach((station) => {
              this.available.forEach((available) => {
                if (station.StationID === available.StationID) {
                  station.AvailableRentBikes = available.AvailableRentBikes
                  station.AvailableReturnBikes = available.AvailableReturnBikes
                }
              })
            })
          }
          this.$emit('getMapdata', this.stations)
        })
    },
    getBikeWay () {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Taipei?$top=30'
      this.$http.get(url)
        .then((res) => {
          if (res.status === 200) {
            this.bikeWay = res.data
            // this.$emit('getMapdata', this.bikeWay)
          }
        })
    }
  },
  watch: {
    '$store.state.theme' () {
      this.stations = ''
      if (this.$store.state.theme === 'rent') {
        this.getStations()
      } else if (this.$store.state.theme === 'bike') {
        this.getBikeWay()
      }
    }
  },
  mounted () {
    this.getStations()
  }
}
</script>
