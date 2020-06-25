<template>
  <div id="app">
    <v-app class="application">
      <div class="bg"></div>

      <appBar />

      <v-main>
        <router-view></router-view>

        <v-snackbar centered
          class="snackbar-okno"
          v-model="snackbar"
          :timeout="snackbarTimeout"
        >{{snackbarText}}</v-snackbar>
      </v-main>
      <list />
    </v-app>
    <foot class="footer"/>
  </div>
  
</template>

<script>
import Appbar from "./components/Appbar.vue";

import Footer from "./components/Footer.vue";

import List from "./components/List.vue";

import userStore from "./assets/user.js";

import Bus from "./assets/bus.js";

export default {
  name: "App",

  data() {
    return {
      snackbar: false,
      snackbarTimeout: 2000,
      snackbarText: ""
    };
  },

  components: {
    appBar: Appbar,

    foot: Footer,

    list: List
  },

  created() {
    Bus.$on("userLoggedOut",() => {
     if (this.$router.currentRoute.path !== "/")
     {
       this.$router.push('/');
     }
    });
    Bus.$on("showSnackbar", snackbarParams => {
      this.snackbarText = snackbarParams.text;
      this.snackbarTimeout = snackbarParams.timeout;
      this.snackbar = true;
    });
    
    let userCookie = this.$cookie.get('user');
    if (userCookie !== null) {
        let user = JSON.parse(userCookie);
        userStore.store().user = user;
        Bus.$emit('userLoggedIn');
    }

  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");

.application {
  font-family: "Quicksand";
}

.v-application .headline {
  font-family: "Quicksand" !important;
}

.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.v-navigation-drawer--fixed {
  z-index: 1;
}

.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("./assets/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.v-btn:hover{
  color: white;
}

.snackbar-okno {
  height: 170vh !important;
  color: white;
  font-style: "Quicksand";
}

</style>
