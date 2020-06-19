@@ -1,68 +0,0 @@
<template>
  <div class="recipe-preview">
    <v-card color="white" class="recipe-card my-5 d-flex">
      <v-container fluid class="ma-0">
        <v-row no-gutters justify="center">
          <router-link to="/recept">
          <v-card-title class="recipe-headline">Kakaove cupcakes</v-card-title>
          </router-link>
        </v-row>

        <v-row no-gutters justify="center">
          <v-col cols="5">
            <v-row no-gutters>
              <v-img
                class="recipe-img ma-5"
                src="./../assets/images/cupcakes.jpg"
                alt="Cupcakes"
                :aspect-ratio="4/3"
              ></v-img>
              
            </v-row>
          </v-col>

          <v-col cols="7">
            <v-row no-gutters justify="center">
              <v-card-text class="recipe-text">Recept je pro 12 ks dortíků.</v-card-text>
            </v-row>

            <v-row no-gutters justify="center">
              <div>
                <v-col cols="4">
                  <v-btn color="black" class="button-add-recipe" min-width="auto">
                    <div>
                      <span class="button-text">Přidej na nákupní seznam</span>
                    </div>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Pocet porci"
                    type="number"
                    v-model="portion"
                    outlined
                    class="shrink"
                  ></v-text-field>
                </v-col>
              </div>
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
    };
  },

  methods: {
    increase() {
      this.portion = this.portion++;
    },

    decrease() {
      this.portion = this.portion--;
    }
  }
};
</script>

<style>
.recipe-preview {
  padding: 10px;
}
.recipe-text {
  text-align: center;
}
</style>