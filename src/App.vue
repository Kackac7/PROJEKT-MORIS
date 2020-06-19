<template>
  <div id="app">
    <v-app class="application">
      <span class="bg"></span>
      <appBar />
      

      <v-main>
        <router-view></router-view>
      </v-main>

      <foot />
    </v-app>
  </div>
</template>

<script>

import Appbar from "./components/Appbar.vue";

import Footer from "./components/Footer.vue";

export default {
  name: "App",

  components: {
    appBar: Appbar,
   
    foot: Footer
  },

  data() {
    return {};
  }
};
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&family=Quicksand:wght@300;400;500;600;700&display=swap');

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
  background-size: cover;
  background-repeat: no-repeat;
}

</style>
