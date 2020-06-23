<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    class="seznam-bocni pa-5"
    width="350px"
    color="#FAF9F9"
    
  >
    <div class="list-headline">Nákupní seznam</div>
    <v-btn dark :disabled="saveButtonDisabled" v-on:click="dialog = true">
      <v-icon dark>mdi-content-save</v-icon>
    </v-btn>
    <v-dialog v-model="dialog">
      <v-text-field label="Název seznamu" v-model="listName"></v-text-field>
      <v-btn :disabled="dialogSaveButtonDisabled" v-on:click="saveList" >Uložit</v-btn>
    </v-dialog>
    <v-divider></v-divider>
    <div class="list-ingredients">Ingredience</div>

    <v-list>
      <v-list-item
        class="list-ing-list"
        v-for="(addedIngredient, id) in addedIngredients"
        v-bind:key="id"
        scroll
      >{{addedIngredient.amount}} {{addedIngredient.unit}} {{addedIngredient.name}}</v-list-item>
    </v-list>

    <v-divider></v-divider>
    
    <div class="list-recipes">Použité recepty</div>
    
    <v-list>
      <v-list-item v-for="(addedRecipe, id) in addedRecipes" v-bind:key="id">{{addedRecipe.name}}
        <v-btn
          color="#302F2F"
          class="button-add-recipes"
          fab
          x-small
          v-on:click="receptPridan(addedRecipe.id)"
        >
          
            <v-icon class="icon-add-recipe">mdi-plus</v-icon>
        
          
        </v-btn>
        <div class="pocet-porci"> {{addedRecipe.amount}}</div>
        <v-btn
          color="#302F2F"
          class="button-remove-recipes"
          fab
          x-small
          v-on:click="receptOdebran(addedRecipe.id)"
        >
          <div>
            <v-icon class="icon-add-recipe">mdi-minus</v-icon>
          </div>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Bus from "./../assets/bus.js";
import userStore from "./../assets/user.js";

export default {
  data() {
    return {
      recipes: [],
      ingredients: [],
      lists: [],
      addedRecipes: [],
      addedIngredients: [],
      userLoggedIn: false,
      user: null,
      dialog: false,
      listName: ''
    };
  },
  computed: {
     drawer: function() {
      return this.addedRecipes.length > 0;
     },
    saveButtonDisabled: function() {
      return this.addedRecipes.length < 1 || !this.userLoggedIn;
    },

    dialogSaveButtonDisabled: function() {
      return this.listName === '';
    }
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
          (ingredientName = existingIngredient.name),
            (ingredientBasicUnit = existingIngredient.basicUnit);
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

    saveList() {
      const getLists = async () => {
        const response = await fetch(
          "https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/lists"
        );
        const json = await response.json();
        if (json.length > 0) {
          return json[0];
        }
        
      };

      getLists().then(object => {
        let novyList = this.vytvorList();

        // priprava dat
        let _id = null;
        let data = null;
        if (object === undefined) {
          // listy jeste neexistuji
          data = {
            lists: [novyList]
          };
        } else {
          // listy uz existuji
          _id = object._id;
          data = {
            lists: object.lists.filter(
              list => list.userId !== novyList.userId || list.name !== novyList.name
            )
          };
          data.lists.push(novyList);
        }

        // ulozeni seznamu
        if (_id === null) {
          // nove seznamy
          this.ulozNovySeznam(data);
        } else {
          // existujici seznamy
          this.ulozExistujiciSeznam(_id, data);
        }

        // uklid po ulozeni
        this.listName = '';
        this.dialog = false;

        Bus.$emit('showSnackbar', {
          text: 'Seznam byl úspěšně uložen', 
          timeout: 3000
        })
      });
    },

    vytvorList() {
      return {
        id: Date.now().toString(),
        userId: this.user.id,
        name: this.listName,
        addedRecipes: this.addedRecipes
      };
    },

    ulozNovySeznam(data) {
      console.log("ukladam novy seznam");

      fetch("https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    },

    ulozExistujiciSeznam(_id, data) {
      console.log("ukladam existujici seznam");
      fetch(
        "https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/lists/" +
          _id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
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
    this.fetchData("recipes");
    this.fetchData("ingredients");
    Bus.$on("receptPridan", id => {
      this.receptPridan(id);
    });
    Bus.$on("receptOdebran", id => {
      this.receptOdebran(id);
    });

    Bus.$on("userLoggedIn", () => {
      this.userLoggedIn = true;
      this.user = userStore.store().user;
    });
    Bus.$on("userLoggedOut", () => {
      this.userLoggedIn = false;
      this.user = null;
    });
    this.userLoggedIn = userStore.store().user !== null;
  }
};
</script>

<style>
.list-headline {
  text-align: center;
  text-transform: uppercase;
  font-size: 30px;
}
.list-ingredients {
  text-align: center;
  margin-top: 20px;
  text-transform: uppercase;
}
.list-recipes {
  text-transform: uppercase;
  margin-top: 30px;
  text-align: center;
}
.list-ing-list {
  margin-bottom: -10px;
}
.button-add-recipes {
  margin-left: 70px;
}
.button-text-list {
  font-size: 16px;
}
.button-remove-recipes {
  margin-left: 0px;
  position: fixed;
  left: 300px;
}
.seznam-bocni {
  top: 60px !important;
}
.pocet-porci {
 padding: 7px;
 font-size: 18px;
 font-weight: 500;
 
}
</style>