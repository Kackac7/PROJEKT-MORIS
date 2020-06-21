<template>
  <div class="recipe-preview">
    <v-card color="white" class="recipe-card my-5 d-flex">
      <v-container fluid class="odsazeni-od-appbar ma-0">
        <v-row no-gutters justify="center">
          <router-link v-bind:to="`/recept/${id}`">
          <v-card-title class="recipe-headline">{{name}}</v-card-title>
          </router-link>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="5">
            <v-row no-gutters>
              <v-img
                class="recipe-img ma-5"
                src="./../assets/images/cupcakes.jpg"
                alt="Cupcakes"
                :aspect-ratio="4/3"
              ></v-img>
              
            </v-row>
          </v-col>

          <v-col cols="7">
            <v-row no-gutters justify="center">
              <v-card-text class="recipe-text">{{method}}</v-card-text>
            </v-row>

            <v-row no-gutters justify="center">
              <div>
                <v-col cols="4">
                  <v-btn color="black" class="button-add-recipe" min-width="auto" v-on:click="addRecipe(id)">
                    <div>
                      <span class="button-text">+</span>
                    </div>
                  </v-btn>
                  <v-btn color="black" class="button-remove-recipe" min-width="auto" v-on:click="removeRecipe(id)">
                    <div>
                      <span class="button-text">-</span>
                    </div>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Pocet porci"
                    type="number"
                    v-model="portion"
                    outlined
                    class="shrink"
                  ></v-text-field>
                </v-col>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
  </template>
</template>

<script>
//import Data from "./../assets/Data.js";

import Bus from "./../assets/bus.js";

export default {

  props: ['id', 'name', 'method'],

  data() {
    return {
      //recipes: Data.recipes,
      portion: 1
    };
  },

  methods: {
    increase() {
      this.portion = this.portion++;
    },

    decrease() {
      this.portion = this.portion--;
    },

    addRecipe(id) {
      Bus.$emit('receptPridan', id);
    },
    
    removeRecipe(id) {
      Bus.$emit('receptOdebran', id);
    }
  }
};
</script>

<style>
.recipe-preview {
  padding: 10px;
}
.recipe-text {
  text-align: center;
}
</style>