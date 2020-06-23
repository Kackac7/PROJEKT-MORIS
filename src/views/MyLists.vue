<template>
  <v-container class="odsazeni-od-appbar" v-if="recipes.length > 0 && ingredients.length > 0 && lists.length > 0">
    <v-card color="#9DDDD1" class="my-6 ma-10 py-5 px-10 pa-5"> 
      <v-card-title class="headline">Moje seznamy</v-card-title>
     <div class="cards">
     
     <v-row><mylistpreview 
        v-for="myList in myLists"
        v-bind:key="myList.id"
        v-bind:id="myList.id"
        v-bind:userId="myList.userId"
        v-bind:name="myList.name"
        v-bind:recipes="myList.recipes"
     /></v-row>    
     </div>

      <v-row class="py-5">
        <router-link to="/">
          <v-btn color="#302F2F"><div class="btn-back">Zpět</div></v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import MyListPreview from "./../components/MyListPreview.vue";

import userStore from "./../assets/user.js";

import Bus from "./../assets/bus.js";

export default {

  components: {
    mylistpreview: MyListPreview
  },

  data() {
    return {
      userLoggedIn: false,
      user: null,

      recipes: [],
      ingredients: [],
      lists: [],
      myLists: [],
    }
  },

  watch: {
    recipes: {
      deep: true,
      handler() {
        this.renderLists();
      }
    },
    ingredients: {
      deep: true,
      handler() {
        this.renderLists();
      }
    },
    lists: {
      deep: true,
      handler() {
        this.renderLists();
      }
    },
    userLoggedIn: function() {
      if (this.userLoggedIn){
        this.renderLists();
      }
    }
  },

  methods: {
    renderLists(){
       if (!this.userLoggedIn || this.recipes.length < 1 || this.ingredients.length < 1 || this.lists.length < 1) {
          return;
        }
        this.myLists = [];
        let userLists = this.lists.filter(list => list.userId === this.user.id);
        for (let list of userLists) {
          let myListId = list.id;
          let myListUserId = list.userId;
          let myListName = list.name;
          let myListRecipes = this.resolveRecipes(list.addedRecipes);

          let myList = {
            id: myListId,
            userId: myListUserId,
            name: myListName,
            recipes: myListRecipes
          }
          this.myLists.push(myList);
        }
    },

    resolveRecipes(addedRecipes) {
      let myListRecipes = [];
      for (let addedRecipe of addedRecipes) {
        let existingRecipe = this.findRecipe(addedRecipe.id);
        let myRecipe = {
          id: existingRecipe.id,
          name: existingRecipe.name,
          amount: addedRecipe.amount,
          ingredients: this.resolveIngredients(existingRecipe.ingredients)
        }
        myListRecipes.push(myRecipe);
      }
      return myListRecipes;
    },

    resolveIngredients(ingredientReferences) {
      let ingredients = [];
      for (let ingredientReference of ingredientReferences) {
        let existingIngredient = this.findIngredient(ingredientReference.id);
        let ingredient = {
          id: existingIngredient.id,
          name: existingIngredient.name,
          amount: ingredientReference.amount * existingIngredient.minQuantity, // opravit undefined zde
          basicUnit: existingIngredient.basicUnit
        }
        ingredients.push(ingredient);
      }
      return ingredients;
    },

    findRecipe(id) {
      return this.recipes.filter(recipe => recipe.id === id)[0];
    },

    findIngredient(id) {
      return this.ingredients.filter(ingredient => ingredient.id === id)[0];
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
        });
    }
  },

  created() {
    this.userLoggedIn = userStore.store().user !== null;
    this.user = userStore.store().user;
    Bus.$on("userLoggedIn", () => {
      this.userLoggedIn = true;
      this.user = userStore.store().user;
    });
    Bus.$on("userLoggedOut", () => {
      this.userLoggedIn = false;
      this.user = null;
    });

    this.fetchData('recipes');
    this.fetchData('ingredients');
    this.fetchData('lists');
  }
};
</script>


<style>
.headline {
    justify-content: center;
}
.cards {
    display: flex;
     
}

</style>