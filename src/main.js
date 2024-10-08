// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Tạo vuetify instance
const vuetify = createVuetify({
    components,
    directives,
})

// Tạo Vue App và cấu hình vuetify + router
const app = createApp(App)

app.use(vuetify)
app.use(router)
app.mount('#app')
