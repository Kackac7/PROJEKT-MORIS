<template>
  <div class="recipe-preview">
    <v-card color="white" class="recipe-card my-5 d-flex">
      <v-container fluid class="ma-0">
        <v-row no-gutters justify="center">
          <router-link v-bind:to="`/recept/${id}`">
            <v-card-title class="recipe-headline">{{name}}</v-card-title>
          </router-link>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="5">
            <router-link v-bind:to="`/recept/${id}`">
              <v-row no-gutters>
                <v-img
                  class="recipe-img ma-5 rounded"
                  v-bind:src="require(`./../assets/images/${id}.jpg`)"
                  alt="Cupcakes"
                  :aspect-ratio="4/3"
                ></v-img>
              </v-row>
            </router-link>
          </v-col>

          <v-col cols="7">
            <router-link v-bind:to="`/recept/${id}`">
              <v-row no-gutters justify="center">
                <v-card-text class="recipe-text">{{method | truncate(600)}}</v-card-text>
              </v-row>
            </router-link>

            <v-row no-gutters justify="end" align="center" class="mx-10 my-5">
              <span class="amount-recipe mr-10">Přidat na seznam</span>

              <v-col cols="1" class="pr-3">
                <v-btn
                  color="#302F2F"
                  class="button-remove-recipe"
                  fab
                  x-small
                  v-on:click="removeRecipe(id)"
                >
                  <v-icon class="icon-add-recipe">mdi-minus</v-icon>
                </v-btn>
              </v-col>

              <v-col cols="1" class="pl-3">
                <v-btn
                  color="#302F2F"
                  class="button-add-recipe"
                  fab
                  x-small
                  v-on:click="addRecipe(id)"
                >
                  <v-icon class="icon-add-recipe">mdi-plus</v-icon>
                </v-btn>
              </v-col>

            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import Bus from "./../assets/bus.js";

export default {
  props: ["id", "name", "method"],

  data() {
    return {
      portion: 1
    };
  },

  methods: {
    addRecipe(id) {
      Bus.$emit("receptPridan", id);
    },

    removeRecipe(id) {
      Bus.$emit("receptOdebran", id);
    }
  }
};
</script>

<style>
.recipe-headline {
  color: black;
  text-transform: uppercase;
}
.recipe-preview {
  padding: 10px;
}
.recipe-text {
  text-align: justify;
  color: black;
}

.button-text {
  font-size: 16px;
}
</style>