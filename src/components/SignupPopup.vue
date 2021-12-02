<template>
  <form class="signup-popup form">
      <div @click="exit" class="exit">
            <img src="../assets/arrow-right-circle.svg" alt="Return">
        </div>
      <h2>Hesap Oluştur</h2>
      <span class="placeholder">Kullanıcı adı</span>
      <input type="username" v-model="username">
      <div class="alert">{{ usernameAlert }}</div>
      <span class="placeholder">Şifre</span>
      <input type="password" v-model="password">
      <div class="alert">{{ passwordAlert }}</div>
      <button class="signup-btn" @click.prevent="signup()">Hesap Oluştur</button>
      <span class="warn">Hiçbir yerde kullanmadığınız bir şifre ile kayıt olunuz. Şifrelerin güvenliğinden geliştirici sorumlu değildir.</span> <br>
      <footer>Hesabın var mı? <span class="signup-button" @click="toggleLogin">Giriş Yap</span></footer>
  </form>
</template>

<script>
import { getDatabase, ref, set, child, get } from "firebase/database";

export default {
  name: 'SignupPopup',
  data(){
      return {
          username: "",
          password: "",
          usernameAlert: "",
          passwordAlert: "",
        }
    },
    props: {
        toggleLogin: Function,
        exit: Function
    },
    methods: {
        signup(){
            if (this.username !== "" && this.password !== ""){
                const db = getDatabase();
                get(child(ref(db), `users/${this.username}`)).then(snapshot => {
                    if (snapshot.exists()) {
                        this.usernameAlert = "Bu kullanıcı adı kullanılıyor."
                    } else {
                        set(ref(db, `users/${this.username}`), {
                            username: this.username,
                            password: this.password,
                            click: this.$parent.$data.counter
                        });
                        console.log("Kullanıcı oluşturuldu.")
                        this.$props.exit()
                    }
                });
            }
        }
    }
}
</script>
