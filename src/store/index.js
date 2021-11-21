import { createStore } from 'vuex'

export default createStore({
  state: {
    themeName: '租車站位',
    theme: 'rent'
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme.theme
      state.themeName = theme.themeName
    }
  }
})
