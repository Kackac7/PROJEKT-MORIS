<template>
  <v-container>
    <v-card color="white" class="my-recipes ma-10 py-5 px-10">
      <v-card-title class="headline">Recepty</v-card-title>

      <recipe />
      <recipe />
      <recipe />

      <v-row class="py-5">
        <router-link to="/">
          <v-btn>Zpet</v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Recipe from "./../components/Recipe.vue";

export default {
  components: {
    recipe: Recipe
  }
};
</script>

<style>
</style>