<template>
  <div id="app">
    <v-app class="application">
      <span class="bg"></span>
      
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

import Data from "./assets/Data.js";

import List from "./components/List.vue"


export default {
  name: "App",

  components: {
    appBar: Appbar,

    foot: Footer,

    list: List
  },

  data() {
    return {
      

    };
  },

  methods: {
    fetchData(resource) {
      fetch("https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/" + resource)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Ooops, něco je špatně");
          }
        })
        .then(data => {
          if (data.length > 0) {
            //console.log(data[0]);
            return data[0];
          }
        })
        .then(data => {
          if (data !== undefined) {
            if (resource === 'recipes') {
              return data.recipes;
            } else if (resource === 'ingredients') {
              return data.ingredients;
            } else {
              throw Error('Unknown resource')
            } 
          } else {
            throw Error("Databáze " + resource + " neexistuje, ty kokos!");
          }
        })
        .then(data => {
          if (resource === 'recipes') {
            Data.recipes = data;
            this.$emit('noveRecepty');
            //console.log(resource + ":");
            //console.log(Data.recipes);
          } else if (resource === 'ingredients') {
            Data.ingredients = data;
            this.$emit('noveIngredience');
            //console.log(resource + ":");
            //console.log(Data.ingredients);
          } else {
            throw Error('Unknown resource');
          }
        }); 
    }
  },
  created() {
    this.fetchData('ingredients');
    this.fetchData('recipes');
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
  background-size: cover;
  background-repeat: no-repeat;
}

</style>
