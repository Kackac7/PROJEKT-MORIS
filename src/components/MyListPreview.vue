<template>
  <v-card
    class="list-preview my-6 ma-5 py-5 px-10 pa-5"
    color="white"
    max-width="300px"
    max-height="350px"
  >
    <v-btn fab color="#302F2F" small class="delete-button" v-on:click="deleteDialog = true">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card class="delete-dialog">
        <v-row no-gutters justify="center" class="mt-4">
          <div class="font-weight-medium">Opravdu chcete seznam {{name}} vymazat?</div>
        </v-row>
        <v-row no-gutters justify="center" class="mt-8">
          <v-col cols="2" class="mr-10">
            <v-btn color="#302F2F" v-on:click="deleteList" class="yes-button">Ano</v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn color="#302F2F" v-on:click="deleteDialog = false">Ne</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

    <v-row no gutters justify="center">
      <v-card-title class="list-headline">{{name}}</v-card-title>
    </v-row>

    <v-row no gutters justify="center">
      <v-card-subtitle
        class="list-subtitle"
        v-for="(recipe, id) in recipes"
        v-bind:key="id"
      >{{recipe.name}}</v-card-subtitle>
    </v-row>
    <div class="style-list">
        <v-card-text class="list-text">
          <ul class="ingredients-list list-short">
            <li
              v-for="(ingredient, inId) in addedIngredients"
              v-bind:key="inId"
            >{{ingredient.amount}} {{ingredient.basicUnit}} {{ingredient.name}}</li>
          </ul>
        </v-card-text>
      <div class="gradient"></div>
    </div>

    
      <v-dialog v-model="dialog" width="600px" class="open-dialog">
        <template v-slot:activator="{ on, attrs }">
          <div class="button-read-list"><v-btn color="#232222" v-bind="attrs" v-on="on">
            <div class="text-btn-list">Zobrazit celý seznam</div>
          </v-btn>
          </div>
        </template>
        <v-card class="pa-5">
          <div id="printMe">
            <v-card-title>
              <span class="dialog-list">{{name}}</span>
            </v-card-title>
            <v-card-text>
              <ul class="ingredients-list">
                <li
                  v-for="(ingredient, inId) in addedIngredients"
                  v-bind:key="inId"
                >{{ingredient.amount}} {{ingredient.basicUnit}} {{ingredient.name}}</li>
              </ul>
            </v-card-text>
          </div>
          <v-card-actions>
            <v-btn
              class="dialog-btn"
              color="#302F2F"
              @click="dialog = false"
              v-on:click="print"
            >Vytisknout</v-btn>
            <v-btn class="dialog-btn" color="#302F2F" v-on:click="restoreList">Použít znovu</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import Bus from "./../assets/bus.js";
import VueHtmlToPaper from "vue-html-to-paper";

export default {
  props: {
    id: String,
    name: String,
    recipes: Array,
    userId: String,
    addedRecipes: Array
  },

  data() {
    return {
      addedIngredients: [],
      dialog: false,
      output: null,
      deleteDialog: false
    };
  },

  methods: {
    restoreList() {
      Bus.$emit("listRestored", this.addedRecipes);
      this.dialog = false;
    },

    deleteList() {
      Bus.$emit("listSmazan", this.id);
      this.deleteDialog = false;
    },

    print() {
      this.$htmlToPaper("printMe");
    },

    resolveIngredients() {
      for (let recipe of this.recipes) {
        for (let ingredient of recipe.ingredients) {
          this.addIngredient(ingredient, recipe.amount);
        }
      }
    },

    addIngredient(ingredient, count) {
      for (let addedIngredient of this.addedIngredients) {
        if (addedIngredient.id === ingredient.id) {
          let previousCount = addedIngredient.amount / ingredient.amount;
          addedIngredient.amount = (previousCount + count) * ingredient.amount;
          addedIngredient.amount = Math.round(addedIngredient.amount);
          return;
        }
      }

      let addedIngredient = {
        id: ingredient.id,
        name: ingredient.name,
        amount: Math.round(count * ingredient.amount),
        basicUnit: ingredient.basicUnit
      };
      this.addedIngredients.push(addedIngredient);
    }
  },
  created() {
    this.resolveIngredients();
  }
};
</script>

<style>
.open-dialog {
  display: flex;
  justify-content: center;
}

.dialog-bnt {
  max-height: 40px;
}

.delete-button {
  position: absolute;
  top: -15px;
  right: -15px;
}

.delete-dialog {
  height: 180px;
  padding: 25px;
}

.style-list {
  max-height: 150px;
  position: relative;
  overflow: hidden;
}

.gradient {
  height: 150px;
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(to bottom, transparent, 50%, white);
}

.button-read-list {
  position: absolute;
  bottom: 15px;

}
</style>