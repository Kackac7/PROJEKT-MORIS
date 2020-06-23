<template>
  <v-container class="odsazeni-od-appbar" v-if="recipe !== null && ingredientList.length > 0">
    <v-card color="white" class="my-5 ma-12 pa-12">
      <v-row justify="center" no-gutters>
        <v-card-title class="recipe-name mb-5">{{recipe.name}}</v-card-title>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-list>
            <v-list-item v-for="(ingredient, id) in ingredientList" v-bind:key="id">
              <span>{{ingredient.amount}} {{ingredient.unit}} {{ingredient.name}}</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col no-gutters align-self="center">
          <v-img
            class="recipe-card-image mx-10 rounded"
            v-bind:src="require(`./../assets/images/${id}.jpg`)"
            alt="Cupcakes"
            :aspect-ratio="4/3"
          ></v-img>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-row no-gutters class="mt-5" justify="center">
        <v-card-subtitle class="recipe-subtitles">Postup</v-card-subtitle>
      </v-row>
      <v-row no-gutters>
        <v-card-text class="recipe-method-text">{{recipe.method}}</v-card-text>
      </v-row>
      <v-spacer></v-spacer>
      <v-row no-gutters justify="end" align="center" class="mx-10 my-5">
        
          <span class="amount-recipe mr-10">Přidat na seznam</span>
        
        <v-col cols="1" class="pr-1">
          <v-btn color="#302F2F" class="button-add-recipe" fab x-small v-on:click="addRecipe(id)">
            <v-icon class="icon-add-recipe">mdi-plus</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="1" class="pl-1">
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
      </v-row>

      <v-row no-gutters class="recipe-preview">
        <router-link to="/recepty">
          <v-btn color="#302F2F"><div class="btn-back">Zpět</div></v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import App from "./../App.vue";
import Bus from "./../assets/bus.js";
import Vue from "vue";

export default {
  props: ["id"],

  data() {
    return {
      recipes: [],
      recipe: null,
      ingredients: [],
      ingredientList: []
    };
  },

  methods: {
    resolveRecipe() {
      for (let recipe of this.recipes) {
        if (recipe.id === this.id) {
          this.recipe = recipe;
          return;
        }
      }
    },

    resolveIngredients() {
      let ingredientList = [];
      for (let recipeIngredient of this.recipe.ingredients) {
        for (let fetchedIngredient of this.ingredients) {
          if (recipeIngredient.id === fetchedIngredient.id) {
            let ingredient = {
              id: fetchedIngredient.id,
              name: fetchedIngredient.name,
              amount: fetchedIngredient.minQuantity * recipeIngredient.amount,
              unit: fetchedIngredient.basicUnit
            };
            ingredientList.push(ingredient);
          }
        }
      }
      this.ingredientList = ingredientList;
      //this.$forceUpdate();
    },
    addRecipe(id) {
      Bus.$emit("receptPridan", id);
    },

    removeRecipe(id) {
      Bus.$emit("receptOdebran", id);
    },

    fetchData(resource) {
      fetch(
        "https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/" + resource
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw Error("Ooops, něco je špatně");
          }
        })
        .then(data => {
          if (data.length > 0) {
            return data[0];
          }
        })
        .then(data => {
          if (data !== undefined) {
            return data[resource];
          } else {
            throw Error("Databáze " + resource + " neexistuje, ty kokos!");
          }
        })
        .then(data => {
          this[resource] = data;
          if (resource === "recipes") {
            this.resolveRecipe();
            this.fetchData("ingredients");
          } else if (resource === "ingredients") {
            this.resolveIngredients();
          } else {
            throw Error("Unknown resource");
          }
        });
    }
  },
  created() {
    this.fetchData("recipes");
  }
};
</script>

<style>
.recipe-name {
  font-size: 20px;
  text-transform: uppercase;
}

.recipe-subtitles {
  font-size: 16px;
  color: black !important;
  text-transform: uppercase;
}

.recipe-method-text {
  font-size: 16px;
  text-align: justify;
}

.recipe-card-image {
  max-width: 300px;
}
.odsazeni-od-appbar {
  padding-top: 85px;
}

.button-text-list {
  font-size: 16px;
}
.button-remove-recipes {
  margin-left: 0px;
}
.amount-recipe {
  font-weight: 600;
}
</style>