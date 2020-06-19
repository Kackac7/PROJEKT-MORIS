<template>
  <v-container>
    <v-card color="white" class="my-lists ma-10 py-5 px-10">
      <v-card-title class="headline">Vytvor si seznam</v-card-title>

     <makelist />
     

      <v-row class="py-5">
        <router-link to="/">
          <v-btn>Zpet</v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import MakeList from "./../components/MakeList.vue";

export default {
  components: {
    makelist: MakeList
  }
};
</script>

<style>
.headline {
    justify-content: center;

}
</style>