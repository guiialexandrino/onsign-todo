import { createApp } from 'vue'
import AppEntry from './AppEntry.vue'
import router from './router'
import './assets/style.css'

const app = createApp(AppEntry)

app.use(router)

app.mount('#app')
