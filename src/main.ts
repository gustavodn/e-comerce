import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import GlobalSnackbar from './components/GlobalSnackbar.vue'

// Create Pinia instance
const pinia = createPinia()

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light', // We'll set this dynamically after Pinia is initialized
  },
})

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(pinia)
app.use(vuetify)
app.use(router)
app.use(i18n)

// Set theme after Pinia is initialized
import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore()
vuetify.theme.global.name.value = themeStore.isDark ? 'dark' : 'light'

app.component('GlobalSnackbar', GlobalSnackbar)

// Mount app
app.mount('#app')
