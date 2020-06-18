<template>
  <div id="app">
    <v-app>
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
