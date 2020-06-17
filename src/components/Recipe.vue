<template>
  <div class="recipe-card">
    <v-card color="teal" class="recept my-5">
      <v-container fluid>
        <v-row>
          <v-col>
            <v-row no-gutters>
              <v-img
                class="recipe-img ma-5"
                src="./../assets/images/cupcakes.jpg"
                alt="Cupcakes"
                :aspect-ratio="4/3"
                max-width="200px"
              ></v-img>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row no-gutters justify="center">
              <v-card-title class="recipe-headline">Kakaove cupcakes</v-card-title>
            </v-row>
            <v-row no-gutters justify="center">
              <v-card-text class="recipe-text">Recept je pro 12 ks dortíků.</v-card-text>
            </v-row>
            <v-row no-gutters justify="center">
              <v-btn class="button-add-recipe">Pridej na nakupni seznam</v-btn>
            </v-row>
            <v-row no-gutters>
              <v-text-field label="Pocet porci" type="number" v-model="portion">
                <v-icon slot="append" color="red">mdi-plus</v-icon>
                <v-icon slot="prepend" color="green">mdi-minus</v-icon>
              </v-text-field>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            portion: 1
        }
    },

    methods: {
        increase() {
            this.portion = this.portion ++;
        },

        decrease() {
            this.portion = this.portion --;
        }
    }
};
</script>

<style>
.recipe-text {
  text-align: center;
}

.button-add-recipe {
  background-color: white;
}
</style>