<template>
  <v-container>
    <v-card color="#232222" class="my-recipes ma-10 py-5 px-10">
      <v-card-title class="headline">Moje Recepty</v-card-title>

      <recipePreview />
      <recipePreview />
      <recipePreview />

      <v-row class="py-5">
        <router-link to="/">
          <v-btn color="black">Zpět</v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import RecipePreview from "./../components/RecipePreview.vue";

export default {
  components: {
    recipePreview: RecipePreview
  }
};
</script>

<style>

</style>