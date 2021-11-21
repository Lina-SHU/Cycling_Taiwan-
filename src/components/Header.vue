<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-0">
    <div class="container-fluid px-md-12">
      <a class="navbar-brand py-0" href="#">
        <img src="../assets/img/logo.png" alt="">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link fs-5 px-9 pt-10 text-white" aria-current="page" href="#" @click.prevent="this.$store.commit('setTheme', { themeName: '自行車道', theme: 'bike' })" :class="{ active: this.$store.state.theme === 'bike' }">自行車道</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5 px-9 pt-10 text-white" href="#" @click.prevent="this.$store.commit('setTheme', { themeName: '租車站位', theme: 'rent' })" :class="{ active: this.$store.state.theme === 'rent' }">租借車輛</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5 px-9 pt-10 text-white" href="#" @click.prevent="this.$store.commit('setTheme', { themeName: '景點美食', theme: 'food' })" :class="{ active: this.$store.state.theme === 'food' }">景點美食</a>
          </li>
          <li class="nav-item">
            <a class="nav-link fs-5 px-9 pt-10 text-white" href="#" @click.prevent="this.$store.commit('setTheme', { themeName: '住宿地點', theme: 'hotel' })" :class="{ active: this.$store.state.theme === 'hotel' }">尋找旅宿</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
}
</script>
