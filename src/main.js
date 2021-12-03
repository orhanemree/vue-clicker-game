import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/css/style.css';
import { initializeApp } from "firebase/app";
import * as config from "./config"


// const options = {
//     apiKey: process.env.API_KEY,
//     authDomain: "clicker-game-28113.firebaseapp.com",
//     projectId: "clicker-game-28113",
//     storageBucket: "clicker-game-28113.appspot.com",
//     messagingSenderId: process.env.MSG_ID,
//     appId: process.env.APP_ID,
//     measurementId: process.env.M_ID,
//     databaseURL: "https://clicker-game-28113-default-rtdb.europe-west1.firebasedatabase.app/",
// }

// initializeApp(options);
initializeApp(config.config);

createApp(App).mount('#app')
