<template>
  <v-container class="odsazeni-od-appbar">
    <v-card color="#9DDDD1" class="ma-10 py-5 px-10 my-6 pa-5">
      <v-card-text style="position: relative">
        <router-link to="/pridatrecept">
          <v-btn fab absolute right color="#302F2F" class="btn-add-rec" title="Přidat nový recept">
            <v-icon class="icon-add-recipe">mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-card-text>

      <v-row justify="center">
        <v-card-title class="headline">Moje Recepty</v-card-title>
      </v-row>

      <recipePreview
        v-for="recipe in recipes"
        v-bind:key="recipe.id"
        v-bind:id="recipe.id"
        v-bind:name="recipe.name"
        v-bind:method="recipe.method"
      />

      <v-row no-gutters class="py-5 recipe-preview">
        <router-link to="/">
          <v-btn color="#302F2F">
            <div class="btn-back">Zpět</div>
          </v-btn>
        </router-link>
      </v-row>  
    </v-card>
    
  </v-container>
</template>

<script>
import RecipePreview from "./../components/RecipePreview.vue";
import App from "./../App.vue";
import userStore from "./../assets/user.js";

export default {
  components: {
    recipePreview: RecipePreview
  },

  data() {
    return {
      recipes: []
    };
  },

  methods: {
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
        });
    }
  },
  created() {
    this.fetchData("recipes");
  }
};
</script>

<style>
.headline {
  color: black;
  text-transform: uppercase;
}
.btn-back {
  color: white;
}

.text-add-recipe {
  color: white;
}
</style>