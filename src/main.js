import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/css/style.css';
import { initializeApp } from "firebase/app";
import * as config from "./config"

initializeApp(config.config);

createApp(App).mount('#app')
