<template>
  <form class="login-popup form">
      <div @click="exit" class="exit">
          <img src="../assets/arrow-right-circle.svg" alt="Return">
      </div>
      <h2>Giriş Yap</h2>
      <span class="placeholder">Kullanıcı adı</span>
      <input type="username" v-model="username">
      <div class="alert">{{ usernameAlert }}</div>
      <span class="placeholder">Şifre</span>
      <input type="password" v-model="password">
      <div class="alert">{{ passwordAlert }}</div>
      <button class="login-btn" @click.prevent="login()">Giriş Yap</button>
      <footer>Hesabın yok mu? <span class="signup-button" @click="toggleSignup">Hesap Oluştur</span></footer>
  </form>
</template>

<script>
import { getDatabase, ref, child, get } from "firebase/database";

export default {
  name: 'LoginPopup',
  data(){
      return {
            username: "",
            password: "",
            usernameAlert: "",
            passwordAlert: "",
        }
    },
    props: {
        toggleSignup: Function,
        exit: Function
    },
    methods: {
        login(){
            if (this.username !== "" && this.password !== ""){
                const db = getDatabase();
                get(child(ref(db), `users/${this.username}`)).then(snapshot => {
                    if (snapshot.exists()) {
                        const data = snapshot.val()
                        if (data.password === this.password){
                            this.$parent.$data.username = this.username;
                            this.$parent.$data.status = "Giriş yapıldı";
                            this.$parent.$data.counter = data.click;
                            console.log("Giriş yapıldı.")
                            this.$props.exit()
                        } else {
                            this.passwordAlert = "Kullanıcı adı veya şifre yanlış.";
                        }
                    } else {
                        this.passwordAlert = "Kullanıcı adı veya şifre yanlış.";
                    }
                });
            }
        }
    }
}
</script>
