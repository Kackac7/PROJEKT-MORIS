<template>
  <div fill-height class="main-page odsazeni-od-appbar" style="max-height: 100vh;">
    <div v-if="!userLoggedIn">
    
      <div class="moris-nazev">MORIS.</div>
<div class="main-page-subheader"> ...místo pro tvoje recepty i seznamy</div>
      <div
        class="main-page-subtitle mx-10 ma-5"
      >Válí se ti všude papíry s recepty, ale ten co hledáš, nemůžeš najít? </div>
      <div class="main-page-subtitle-popis mx-10 ma-5">Registruj se a vytvoř si svůj vlastní receptář.</div>

      <div class="main-page-subtitle mx-10">
      <p class="subtitle-main">S <span class="moris-jmeno">MORISEM</span> je to snadné</p>
      <p>- Zapiš si svuj recept.</p>
      <p>- Ulož ho. </p>
      <p>- Přidej na nákupní seznam.</p>
      <p>- Hurá do obchodu!</p></div>
      

      <v-row no-gutters class="my-15 mx-10">
        <v-col cols="3">
          <v-btn class="main-page-button white--text" color="#302F2F" bottom>Registrovat</v-btn>
        </v-col>
        <v-col cols="3">
          <v-dialog max-width="250px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="main-page-button white--text"
                color="#302F2F"
                v-bind="attrs"
                v-on="on" 
                v-on:click="validationError=false"
                bottom
              >Přihlásit</v-btn>
            </template>
            <v-form ref="form" class="white pa-5">
              <span class="red--text" v-if="validationError">Chybné údaje</span>
              <v-text-field
                v-model="username"
                label="Přihlašovací jméno"
                required
                v-on:keyup.enter="login"
                autofocus
              ></v-text-field>
              <v-text-field
                :type="'password'"
                v-model="password"
                label="Heslo"
                required
                v-on:keyup.enter="login"
              ></v-text-field>
              <v-btn color="#302F2F" class="mr-4" v-on:click="login">Přihlásit</v-btn>
            </v-form>
          </v-dialog>
        </v-col>
      </v-row>
    </div>

    <mainNavigation />
  </div>
</template>

<script>
import MainNavigation from "./../components/MainNavigation.vue";

import Bus from "./../assets/bus.js";

import userStore from "./../assets/user.js";

export default {
  name: "Home",

  components: {
    mainNavigation: MainNavigation
  },

  data() {
    return {
      userLoggedIn: false,
      user: null,

      dialog: false,

      username: "",
      password: "",

      validationError: false
    };
  },
  methods: {
    logout() {
      userStore.store().user = null;
      Bus.$emit("userLoggedOut");

      this.userLoggedIn = false;
      this.user = null;

      this.menu = false;

      Bus.$emit("showSnackbar", {
        text: "Odhlášení úspěšné",
        timeout: 3000
      });
    },

    login() {
      const getUsers = async () => {
        const response = await fetch(
          "https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/users"
        );
        const json = await response.json();
        if (json.length > 0) {
          if (json[0] !== undefined) {
            return json[0].users;
          }
        }
      };

      getUsers().then(users => {
        this.validateUser(users);
      });
    },

    validateUser(users) {
      let filteredUsers = users.filter(user => {
        return (
          user.username === this.username && user.password === this.password
        );
      });
      if (filteredUsers.length === 1) {
        userStore.store().user = filteredUsers[0];
        Bus.$emit("userLoggedIn");

        this.user = filteredUsers[0];
        this.userLoggedIn = true;
  
        this.validationError = false;
        this.menu = false; 
        this.$cookie.set('user',JSON.stringify(this.user), 1);

        this.username = '';
        this.password = '';
      } else {
        this.validationError = true;
      }
    }
  },

  created() {
    Bus.$on("userLoggedIn", () => {
      this.userLoggedIn = true;
    });
    Bus.$on("userLoggedOut", () => {
      this.userLoggedIn = false;
    });
    this.userLoggedIn = userStore.store().user !== null;
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');

.main-page {
  background: url("./../assets/images/main-pozadi5.jpg");
  background-size: cover;
  margin-top: -40px;
  width: 100%;
  height: 100vh;
}

.main-page-button {
  width: 180px;
  min-height: 40px;
  margin-left: 150px;
  position: absolute;
  bottom: 60px;
}
.subtitle-main {
  font-size: 30px;
  margin-left: 250px;
}
.main-page-subtitle p {
  font-size: 20px;
  margin-left: 250px;
}
.moris-jmeno {
  font-family: 'Indie Flower' !important;
  font-size: 34px !important;
}
.main-page-subheader {
  font-family: 'Indie Flower';
  padding: 0 250px;
  font-size: 24px;
}
.moris-nazev {
  font-family: 'Indie Flower' !important;
  font-size: 100px !important;
  text-shadow: 2px 4px 4px #CFCFCF;
  margin-top: 20px;
  padding: 0 300px;
}
.main-page-subtitle {
  padding: 0 150px;
}
.main-page-subtitle-popis {
  padding: 0 237px;
}
</style>