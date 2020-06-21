<template>

<div >
  <v-container class="odsazeni-od-appbar">
    <v-card color="#232222" class="my-recipes ma-10 py-5 px-10">
      <v-card-title class="headline">Moje Recepty</v-card-title>

      <recipePreview 
        v-for="recipe in recipes"
        v-bind:key="recipe.id"
        v-bind:id="recipe.id"
        v-bind:name="recipe.name"
        v-bind:method="recipe.method"
        />
      

      <v-row class="py-5">
        <router-link to="/">
          <v-btn color="black">Zpět</v-btn>
        </router-link>
      </v-row>
    </v-card>

    
  </v-container>
    
</div>
</template>

<script>
import RecipePreview from "./../components/RecipePreview.vue";
import App from "./../App.vue";
import Vue from 'vue';



export default {
  components: {
    recipePreview: RecipePreview,
    
  },

  data() {
    return {
      recipes: []
    }
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
            this.recipes = data;
          } else if (resource === 'ingredients') {
            this.ingredients = data;
          } else {
            throw Error('Unknown resource');
          }
        }); 
    }
  },
  created() {
    this.fetchData('recipes');
  }

  
};
</script>

<style>

</style>