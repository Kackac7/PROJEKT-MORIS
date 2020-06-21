<template>
  <div id="app">
    <v-app class="application">
      <div class="bg"></div>
      
      <appBar />

      <v-main>

        <router-view></router-view>
        
      </v-main>
      <list />

      <foot />
    </v-app>
  </div>
</template>

<script>
import Appbar from "./components/Appbar.vue";

import Footer from "./components/Footer.vue";

import List from "./components/List.vue";

import userStore from "./assets/user.js";


export default {
  name: "App",

  components: {
    appBar: Appbar,

    foot: Footer,

    list: List
  },

  created() {
    console.log('nastavuji promennou');
    userStore.store().user = 'kokos';
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap");

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
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("./assets/images/pozadi1.jpg");
  background-size: 100%;
  background-repeat: repeat;
}

</style>
