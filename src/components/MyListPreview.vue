<template>
    <v-card
      class="my-6 ma-10 py-5 px-10 pa-5 "
      color="white">

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
      <v-row no gutters justify="center">
        <v-card-text class="list-text">
          <ul class="ingredients-list">
            <div v-for="(recipe,id) in recipes" v-bind:key="id">
              <li v-for="(ingredient, inId) in recipe.ingredients" v-bind:key="inId">{{ingredient.amount}} {{ingredient.basicUnit}} {{ingredient.name}}</li>
            </div>           
          </ul>
        </v-card-text>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" width="600px" class="open-dialog">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="button-read-list" color="#232222" v-bind="attrs" v-on="on">
              <div class="text-btn-list">Přejdi na celý seznam</div>
            </v-btn>
          </template>
          <v-card justify="center">
            <div id="printMe">
            <v-card-title>
              <span class="dialog-list">{{name}}</span>
            </v-card-title>
            <v-card-text>
              <ul class="ingredients-list">
                <div v-for="(recipe,id) in recipes" v-bind:key="id">
                  <li v-for="(ingredient, inId) in recipe.ingredients" v-bind:key="inId">{{ingredient.amount}} {{ingredient.basicUnit}} {{ingredient.name}}</li>
                </div>
              </ul>
            </v-card-text>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="dialog-btn" color="#302F2F" @click="dialog = false" v-on:click="print">Vytisknout</v-btn>
              <v-btn class="dialog-btn"  color="#302F2F" @click="dialog = false">Použít znovu</v-btn>
            </v-card-actions>
            
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
</template>

<script>
import Bus from "./../assets/bus.js";
import VueHtmlToPaper from 'vue-html-to-paper';



export default {
  props: {
    id: String,
    name: String,
    recipes: Array,
    userId: String
  },

  data() {
    return {
      dialog: false,

      output: null
    };
  },

  methods: {
    print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
  }
}
}
</script>

<style>
.open-dialog {
  display: flex;
  justify-content: center;
}

.dialog-bnt{
  max-height: 40px;
}
</style>