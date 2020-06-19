<template>
  <v-container>
    <v-card color="white" class="ma-10 py-5 px-10">
      <v-row>
        <v-form>
          <span class="recipe-name">Nazev receptu</span>
          <v-text-field v-model="name" :rules="nameRules" placeholder="Zadej nazev receptu" required outlined></v-text-field>

          <v-spacer></v-spacer>

          <span class="recipe-subtitles">Ingredience</span>

          <v-row id="ingredient-row" v-for="(ing, index) in ingredientList" v-bind:key="index">
            <v-col>
              <v-autocomplete
                label="Surovina"
                outlined
                v-model="ingredientList[index]"
                :items="ingredient"
                v-on:change="sayHello()"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
            </v-col>
            <v-col>
              <v-autocomplete label="Jednotka" outlined v-model="units"></v-autocomplete>
            </v-col>
            <v-col>
              <v-btn icon>
                <v-icon color="black">mdi-trash-can-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
             <span class="recipe-subtitles">Postup</span>
          </v-row>
          <v-row>
            <v-textarea outlined name="method" placeholder="Napis postup receptu"></v-textarea>
          </v-row>
          <v-row>
            <span class="recipe-subtitles">Foto</span>
          </v-row>
          <v-row>
            <v-file-input label="Pridej foto" outlined append-icon="mdi-camera"></v-file-input>
          </v-row>
          <v-row justify="center">
            <v-btn color="black">Uložit</v-btn>
          </v-row>
        </v-form>
      </v-row>

      <v-row class="py-5">
        <router-link to="/">
          <v-btn width="90px" color="black">Zpět</v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      nameRules: [v => !!v || "Name is required"],
      model: [null],
      ingredient: ["kokos", "losos", "meloun"],
      quantity: null,
      units: [],
      method: null,
      ingredientList: [null]
    };
  },

  methods: {
    sayHello() {
      console.log("Hello");
      this.ingredientList.push(null);
      console.log(this.ingredientList);
    }
  }
};
</script>

<style>

</style>