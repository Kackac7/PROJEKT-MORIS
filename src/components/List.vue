<template>
  <v-navigation-drawer v-model="drawer" app right class="pa-5">
    <span>Ingredience</span>

    <v-list>
      <v-list-item>kokos</v-list-item>
    </v-list>

    <v-divider></v-divider>

    <span>Pouzite recepty</span>

    <v-list>
      <v-list-item>Kokosove smoothie</v-list-item>
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
      addedRecipes: []
    };
  },

  methods: {
    receptPridan(id) {
      let alreadyAddedRecipe = null;
      for (let recipe of addedRecipes) {
        if (recipe.id === id) {
          alreadyAddedRecipe = recipe;
        }
      }
      this.addedRecipes.push(id);
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
      console.log(this);
      this.receptPridan(id);
    });
  }
};
</script>

<style>
</style>