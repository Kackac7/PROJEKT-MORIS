<template>
  <v-container>
    <v-card color="white" class="my-recipes ma-10 py-5 px-10">
      <v-card-title class="headline">Recepty</v-card-title>

      <recipe />
      <recipe />
      <recipe />
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