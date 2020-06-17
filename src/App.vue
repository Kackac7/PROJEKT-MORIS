<template>
  <div id="app">
  <span class="bg"></span>
  <v-app>
   <appBar />
   <sideMenu />
   <myRecipes style="width: 50%"/>
    
  </v-app>
  </div>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import MyRecipes from './components/MyRecipes.vue';
import Appbar from './components/Appbar.vue';

export default {
  name: "App",

  components: {
    sideMenu: SideMenu,
    myRecipes: MyRecipes,
    appBar: Appbar
  },

  data() {
    return {
      menu: false,
      menuNavigators: [
        { id: 1, label: "Moje recepty", icon: "mdi-home" },
        { id: 2, label: "Moje seznamy", icon: "mdi-account" },
        { id: 3, label: "Profil", icon: "mdi-cellphone-android" },
        { id: 4, label: "Odhlásit", icon: "mdi-image-multiple" }
      ],

      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  },

  methods: {
    app(){
      console.log(this.$vuetify.application.top)}
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
  background-image: url("./assets/images/pozadi1.jpg") ;
  background-size: cover;
  background-repeat: no-repeat;

}

</style>
