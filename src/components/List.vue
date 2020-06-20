<template>
  <v-navigation-drawer v-model="drawer" app right class="pa-5">
    <span>Ingredience</span>

    <v-list>
      <v-list-item
        v-for="(addedIngredient, id) in addedIngredients"
        v-bind:key="id"
      >{{addedIngredient.amount}} {{addedIngredient.unit}} {{addedIngredient.name}}</v-list-item>
    </v-list>

    <v-divider></v-divider>

    <span>Pouzite recepty</span>

    <v-list>
      <v-list-item v-for="(addedRecipe, id) in addedRecipes" v-bind:key="id">
        <v-btn
          color="black"
          class="button-add-recipe"
          min-width="auto"
          v-on:click="receptPridan(addedRecipe.id)"
        >
          <div>
            <span class="button-text">+</span>
          </div>
        </v-btn>
        {{addedRecipe.name}} {{addedRecipe.amount}}x
        <v-btn
          color="black"
          class="button-remove-recipe"
          min-width="auto"
          v-on:click="receptOdebran(addedRecipe.id)"
        >
          <div>
            <span class="button-text">-</span>
          </div>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Bus from "./../assets/bus.js";

export default {
  data() {
    return {
      drawer: null,
      recipes: [],
      ingredients: [],
      addedRecipes: [],
      addedIngredients: []
    };
  },
  watch: {
    addedRecipes: {
      deep: true,
      handler() {
        this.addedIngredients = [];
        for (let addedRecipe of this.addedRecipes) {
          let recipe = null;
          for (let recipe of this.recipes) {
            if (recipe.id === addedRecipe.id) {
              for (let ingredient of recipe.ingredients) {
                this.addIngredient(ingredient, addedRecipe.amount);
              }
            }
          }
        }
      }
    }
  },
  methods: {
    addIngredient(ingredient, count) {
      for (let addedIngredient of this.addedIngredients) {
        if (addedIngredient.id === ingredient.id) {
          let previousCount = addedIngredient.amount / ingredient.amount;
          addedIngredient.amount = (previousCount + count) * ingredient.amount;
          addedIngredient.amount = Math.round(addedIngredient.amount);
          return;
        }
      }
      let ingredientName = null;
      let ingredientBasicUnit = null;
      for (let existingIngredient of this.ingredients) {
        if (existingIngredient.id === ingredient.id) {
          ingredientName = existingIngredient.name,
          ingredientBasicUnit = existingIngredient.basicUnit;
        }
      }
      let addedIngredient = {
        id: ingredient.id,
        name: ingredientName,
        amount: Math.round(count * ingredient.amount),
        unit: ingredientBasicUnit
      };
      this.addedIngredients.push(addedIngredient);
    },
    receptPridan(pridavaneId) {
      for (let recipe of this.addedRecipes) {
        if (recipe.id === pridavaneId) {
          recipe.amount++;
          return;
        }
      }
      let recipeName = null;
      for (let recipe of this.recipes) {
        if (recipe.id === pridavaneId) {
          recipeName = recipe.name;
        }
      }
      let addedRecipe = {
        id: pridavaneId,
        amount: 1,
        name: recipeName
      };
      console.log(addedRecipe);
      this.addedRecipes.push(addedRecipe);
    },
    receptOdebran(odebiraneId) {
      for (let recipe of this.addedRecipes) {
        if (recipe.id === odebiraneId) {
          recipe.amount--;
        }
      }
      this.addedRecipes = this.addedRecipes.filter(function(item) {
        return item.amount > 0;
      });
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
            //console.log(data[0]);
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
            //console.log(resource + ":");
            //console.log(Data.recipes);
          } else if (resource === "ingredients") {
            this.ingredients = data;
            //console.log(resource + ":");
            //console.log(Data.ingredients);
          } else {
            throw Error("Unknown resource");
          }
        });
    }
  },

  created() {
    this.fetchData("recipes");
    this.fetchData("ingredients");
    Bus.$on("receptPridan", id => {
      this.receptPridan(id);
    });
    Bus.$on("receptOdebran", id => {
      this.receptOdebran(id);
    });
  }
};
</script>

<style>
</style>