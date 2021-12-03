<template>
  <LoginPopup :exit="exit" v-if="loginForm" :toggleSignup="toggleSignup" />
  <SignupPopup :exit="exit" v-if="signupForm" :toggleLogin="toggleLogin" />
  <Menu :username="username" :toggleLeaderboard="toggleLeaderboard" :toggleLogin="toggleLogin" :status="status"/>
  <Leaderboard v-if="leaderboard" :exit="exit" :username="this.username" :click="this.counter" :leaders="leaders" />
  <h1 class="counter">{{ counter }}</h1>
  <div class="clicker-container flex" >
    <Clicker @click="clicked()"/>
  </div>
  <div class="save flex" style="gap: 5px;" @click="save()">
    <img src="./assets/content-save.svg" alt="save button"> <span>{{ saveWarn }}</span>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
import Clicker from './components/Clicker.vue'
import LoginPopup from './components/LoginPopup.vue'
import SignupPopup from './components/SignupPopup.vue'
import Leaderboard from './components/Leaderboard.vue'
import { getDatabase, ref, update, get, child } from "firebase/database";

export default {
  name: 'App',
  data(){
    return{
      counter: 0,
      username: "Misafir",
      loginForm: false,
      signupForm: false,
      status: "Giriş yap",
      saveWarn: "Kaydet",
      leaderboard: false,
      leaders: []
    }
  },
  methods: {
    clicked(){
      this.counter = this.counter + 1;
      if (this.saveWarn !== "Kaydet"){
        this.saveWarn = "Kaydet"
      }
    },
    toggleLogin(){
      if (this.status === "Giriş yap"){
        this.signupForm = false
        this.loginForm = !this.loginForm
      }
    },
    toggleSignup(){
      if (this.status === "Giriş yap"){
        this.loginForm = false
        this.signupForm = !this.signupForm
       }

    },
    exit(){
      this.loginForm = false
      this.signupForm = false
      this.leaderboard = false
    },
    save(){
      if (this.username !== "Misafir"){
        const db = getDatabase();
        const date = new Date();
        const updates = {};
        updates[`/users/${this.username}/click`] = this.counter;
        updates[`/users/${this.username}/lastSave`] = date.toString();
        update(ref(db), updates);
        this.saveWarn = "Kaydedildi";
      } else {
        this.saveWarn = "Giriş yap"
      }
    },
    toggleLeaderboard(){
      this.leaderboard = !this.leaderboard;
      const db =getDatabase();
        get(child(ref(db), `users/`)).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const dataArray = Object.keys(data).map(val => data[val]);
          this.leaders = dataArray.sort((a, b) => (a.click - b.click)).reverse()
          console.log(this.leaders)
        }
      });
    }
  },
  components: {
    Menu,
    Clicker,
    LoginPopup,
    SignupPopup,
    Leaderboard
  }
};
</script>
