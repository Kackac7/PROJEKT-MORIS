<template>
  <div fill-height class="main-page odsazeni-od-appbar" style="max-height: 100vh;">
      <div class="main-page-header ma-10">NEJUZASNEJSI APLIKACE</div>

      <div class="main-page-subtitle mx-10 ma-5">Nenos papirky, pouzivej moderni technologie, ty kokos</div>

      <div class="main-page-subtitle mx-10">Nenos papirky, pouzivej moderni technologie, ty kokos</div>

      <mainNavigation />
 

  </div>
</template>

<script>

//import MainPage from "./../components/MainPage.vue";
import MainNavigation from "./../components/MainNavigation.vue"

export default {
  name: 'Home',

  components: {
    //mainpage: MainPage,
    mainNavigation: MainNavigation,
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

</style>