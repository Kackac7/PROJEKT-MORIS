<template>
  <v-container>
    <v-card color="white" class="my-6 pa-5">
      <v-row justify="center">
        <v-card-title class="recipe-name">{{recipe.name}}</v-card-title>
      </v-row>
      <v-row class="mx-5">
        <v-col>
          <v-list>
            <v-list-item v-for="(ingredient, id) in ingredientList" v-bind:key="id">
              <span>{{ingredient.amount}} {{ingredient.unit}} {{ingredient.name}}</span>
            </v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <v-img
            class="recipe-card-image ma-5"
            src="./../assets/images/cupcakes.jpg"
            alt="Cupcakes"
            :aspect-ratio="4/3"
          ></v-img>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
      <v-row class="mx-5">
        <v-card-subtitle class="recipe-subtitles">Postup</v-card-subtitle>
      </v-row>
      <v-row class="mx-5">
        <v-card-text class="recipe-method-text">{{recipe.method}}</v-card-text>
      </v-row>
      <v-spacer></v-spacer>
      <v-row class="ma-5">
        <v-col>
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
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import App from "./../App.vue";
import Bus from "./../assets/bus.js";

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
    findRecipe() {
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
    },
    addRecipe(id) {
      Bus.$emit('receptPridan', id);
    },
    
    removeRecipe(id) {
      Bus.$emit('receptOdebran', id);
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
            if (resource === "recipes") {
              return data.recipes;
            } else if (resource === "ingredients") {
              return data.ingredients;
            } else {
              throw Error("Unknown resource");
            }
          } else {
            throw Error("Databáze " + resource + " neexistuje, ty kokos!");
          }
        })
        .then(data => {
          if (resource === "recipes") {
            this.recipes = data;
            this.findRecipe();
          } else if (resource === "ingredients") {
            this.ingredients = data;
            this.resolveIngredients();
          } else {
            throw Error("Unknown resource");
          }
        });
    }
  },
  created() {
    this.fetchData("recipes");
    this.fetchData("ingredients");
  }
};
</script>

<style>
.recipe-name {
  font-size: 20px;
  font-weight: 700;
}

.recipe-subtitles {
  font-size: 16px;
  font-weight: 700;
}

.recipe-method-text {
  font-size: 16px;
}

.recipe-card-image {
  max-width: 300px;
}
</style>