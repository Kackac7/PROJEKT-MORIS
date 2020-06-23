<template>
  <div fill-height class="main-page odsazeni-od-appbar" style="max-height: 100vh;">

    <div v-if="!userLoggedIn">
      <div class="main-page-header ma-10">NEJUZASNEJSI APLIKACE</div>

      <div class="main-page-subtitle mx-10 ma-5">Nenos papirky, pouzivej moderni technologie, ty kokos</div>

      <div class="main-page-subtitle mx-10">Vyber recept, pridej na seznam a nakupuj</div>


      <v-row no-gutters class="my-15 mx-10">

        <v-col cols="3"> 
          <v-btn class="main-page-button white--text" color="#302F2F">Registrace</v-btn>
        </v-col>
        <v-col cols="3">
         <v-btn class="main-page-button white--text" color="#302F2F" v-on:click="login">Přihlásit</v-btn>
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
  name: 'Home',

  components: {
    mainNavigation: MainNavigation,
  },

  data() {
    return {
      userLoggedIn: false
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

.main-page {
  background: url('./../assets/images/pozadi-main.jpg');
  background-size: cover;
  width: 100%;
  height: 100vh;
}

.main-page-button {
  width: 180px;
  min-height: 40px;
}
</style>