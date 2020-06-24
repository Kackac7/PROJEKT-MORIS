<template>
  <v-container class="odsazeni-od-appbar">
    <v-card color="white" class="ma-10 py-5 px-10 my-6 pa-5">
      <v-row>
        <v-form>
          <span class="recipe-name">Nazev receptu</span>
          <v-text-field v-model="name" :rules="nameRules" placeholder="Zadej nazev receptu" required outlined></v-text-field>

          <v-spacer></v-spacer>

          <span class="recipe-subtitles">Ingredience</span>

          <v-row id="ingredient-row" v-for="(ing, index) in ingredientList" v-bind:key="index">
            <v-col>
              <v-autocomplete
                class="ingredient-autocomplete"
                label="Ingredience"
                outlined
                v-model="ingredientList[index]"
                :items="getIngredientName"
                v-on:change="addLine()"
              ></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
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
      ingredients: [],
      quantity: null,
      units: [],
      method: null,
      ingredientList: [null]
    };
  },

  computed: {
    getIngredientName() {
      let ingredientNames = [];
      for (let ingredient of this.ingredients) {
        ingredientNames.push(ingredient.name + ' (' + ingredient.basicUnit + ')');
      } return ingredientNames;
    },
  },

  methods: {
    addLine() {
      
    let isDuplicate = false;
      for (let i = 0; i < this.ingredientList.length - 1; i++) {
        if (this.ingredientList[i] === this.ingredientList[this.ingredientList.length-1]) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate) {
        alert('Položka ' + this.ingredientList[this.ingredientList.length-1] + ' už je přidána.');
        this.ingredientList[this.ingredientList.length-1] = null;
      } else if(this.ingredientList[this.ingredientList.length-1] === null) {
      }
      else {
        this.ingredientList.push(null);
      }
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
    this.fetchData("ingredients");
  }
};
</script>

<style>
.ingredient-autocomplete {
  width: 250px;
}

</style>