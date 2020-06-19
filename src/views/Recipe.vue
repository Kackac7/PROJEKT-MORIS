<template>
  <v-container>
    <v-card color="white" class="my-6 pa-5">
      <v-row justify="center">
        <v-card-title class="recipe-name">Nazev receptu</v-card-title>
      </v-row>
      <v-row class="mx-5">
         <v-col>
          <v-list>
            <v-list-item>1 ks kokos</v-list-item>
            <v-list-item>2 kg jahody</v-list-item>
            <v-list-item>1 ks meloun</v-list-item>
            <v-list-item>2 ks kokos</v-list-item>
            <v-list-item>2 ks jahody</v-list-item>
            <v-list-item>1 kg meloun</v-list-item>
          </v-list>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <v-img
            class="recipe-card-image ma-5"
            src="./../assets/images/cupcakes.jpg"
            alt="Cupcakes"
            :aspect-ratio="4/3"
          ></v-img>
        </v-col>
        
       
        
      </v-row>
      <v-divider></v-divider>
      <v-spacer></v-spacer>
      <v-row class="mx-5">
        <v-card-subtitle class="recipe-subtitles">Postup</v-card-subtitle>
      </v-row>
      <v-row class="mx-5">
        <v-card-text class="recipe-method-text">Snez kokos, jahody a meloun. Presne v tomto poradi.</v-card-text>
      </v-row>
      <v-spacer></v-spacer>
      <v-row class="ma-5">
        <v-col>
          <v-btn color="black">Pridat na nakupni seznam</v-btn>
        </v-col>
        <v-col>
          <v-btn color="black">Upravit recept</v-btn>
        </v-col>
        <v-col>
          <v-btn color="black">Vymazat recept</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.recipe-name {
  font-size: 20px;
  font-weight: 700;
}

.recipe-subtitles {
  font-size: 16px;
  font-weight: 700;
}

.recipe-method-text {
  font-size: 16px;
}

.recipe-card-image {
  max-width: 300px;
}
</style>