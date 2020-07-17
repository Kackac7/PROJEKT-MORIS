<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    right
    class="seznam-bocni pa-5"
    width="350px"
    color="#FAF9F9"
    scrollable
  >
    <div class="list-headline">
      <span>Nákupní seznam</span>
    </div>
    <v-dialog v-model="dialog" class="save-list-dialog" width="500px" height="300px">
      <v-card class="pa-10">
        <v-text-field label="Název seznamu" v-model="listName"></v-text-field>
        <v-row no-gutters justify="center">
          <v-btn :disabled="dialogSaveButtonDisabled" v-on:click="saveList" color="#302F2F">Uložit</v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <v-divider></v-divider>
    <div class="list-ingredients">Ingredience</div>

    <v-list>
      <v-list-item
        class="list-ing-list"
        v-for="(addedIngredient, id) in addedIngredients"
        v-bind:key="id"
      >{{addedIngredient.amount}} {{addedIngredient.unit}} {{addedIngredient.name}}</v-list-item>
    </v-list>

    <v-divider></v-divider>

    <div class="list-recipes">Použité recepty</div>

    <v-list>
      <div class="vypis-recepty">
        <v-list-item v-for="(addedRecipe, id) in addedRecipes" v-bind:key="id">
          <div class="leva-cast">{{addedRecipe.name | truncate(20)}}</div>

          <div class="prava-cast">
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

            <span class="pocet-porci">{{addedRecipe.amount}}</span>
            <v-btn
              color="#302F2F"
              class="button-add-recipes"
              fab
              x-small
              v-on:click="receptPridan(addedRecipe.id)"
            >
              <v-icon class="icon-add-recipe">mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-list-item>
      </div>
      <div class="save-button">
        <v-btn dark :disabled="saveButtonDisabled" v-on:click="dialog = true" bottom>
          <div color="black">ULOŽIT</div>
        </v-btn>
      </div>
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
      listName: ""
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
      return this.listName === "";
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
      // this.addedRecipes = this.addedRecipes.filter(item => item.amount > 0); stejne jako 177-179
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
              list =>
                list.userId !== novyList.userId || list.name !== novyList.name
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
        this.listName = "";
        this.dialog = false;

        Bus.$emit("showSnackbar", {
          text: "Seznam byl úspěšně uložen",
          timeout: 5000
        });

        this.addedRecipes = [];
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

      fetch("https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
    },

    ulozExistujiciSeznam(_id, data) {
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
      this.addedRecipes = [];
    });
    this.userLoggedIn = userStore.store().user !== null;
    this.user = userStore.store().user;

    Bus.$on("listRestored", (addedRecipes) => {
      this.addedRecipes = addedRecipes;
    })
  }
};
</script>

<style>
.list-headline {
  text-align: center;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
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
  margin-bottom: -17px;
  font-size: 15px;
}
.seznam-bocni {
  top: 60px !important;
  max-height: calc(100% - 100px) !important;
}
.pocet-porci {
  padding: 7px;
  font-size: 18px;
  font-weight: 500;
}

.vypis-recepty {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  flex-basis: 2;
}
.leva-cast {
  position: absolute;
  left: 0px;
}
.prava-cast {
  position: absolute;
  right: 0px;
}
.save-button {
  display: flex;
  font-family: "Quicksand", sans-serif !important;
  justify-content: center;
  padding-top: 20px;
}
</style>