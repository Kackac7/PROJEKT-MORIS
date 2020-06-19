<template>
  <v-container>
    <v-card color="white" class="my-6 pa-5">
      <v-row justify="center">
        <v-card-title>Nazev receptu</v-card-title>
      </v-row>
      <v-row class="mx-5">
        <v-list>
          <v-list-item>kokos</v-list-item>
          <v-list-item>jahoda</v-list-item>
          <v-list-item>meloun</v-list-item>
        </v-list>
      </v-row>
      <v-row class="mx-5">
        <v-card-text>Snez kokos, jahodu a meloun. Presne v tomto poradi.</v-card-text>
      </v-row>
      <v-row class="mx-5 pa-5">
        <v-btn color="black">Pridat recept na nakupni seznam</v-btn>
      </v-row>
      <v-row class="mx-5 pa-5">
        <v-btn color="black">Vymazat recept</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>