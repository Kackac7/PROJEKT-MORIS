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
import Data from "./../assets/Data.js"



export default {
  components: {
    recipePreview: RecipePreview,
    
  },

  data() {
    return {
      recipes: Data.recipes
    }
  }
};
</script>

<style>

</style>