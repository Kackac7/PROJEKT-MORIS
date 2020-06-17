<template>
  <v-app>

    <sideMenu />
       
    <v-app-bar color="white" max-height="60px" class="app-bar">
      <div class="wrapper">
        <div>Logo</div>

        <div>Title</div>

        <v-menu bottom left offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-large v-bind="attrs" v-on="on">
              <v-icon x-large color="black">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(navigator, id) in menuNavigators" v-bind:key="id">
              <v-btn block depressed color="white" x-large class="my-2">
                <div class="navigator-button">
                  <v-icon color="black">{{ navigator.icon }}</v-icon>
                  <span class="navigator-button-text">{{ navigator.label }}</span>
                </div>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
           
    <v-main>

      <v-container fluid fill-height class="bg">
        <v-layout justify-center align-center>
          <v-flex text-xs-center>
            <my-recipes />
          </v-flex>
        </v-layout>
      </v-container> 
        

      

     
    </v-main>

       
  </v-app>
</template>

<script>
import SideMenu from './components/SideMenu.vue';
import MyRecipes from './components/MyRecipes.vue';

export default {
  name: "App",

  components: {
    sideMenu: SideMenu,
    myRecipes: MyRecipes
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

.bg{
  background: url("./assets/images/pozadi1.jpg");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

.app-bar {
  box-shadow: 1px 20px 125px -25px rgba;
}



</style>
