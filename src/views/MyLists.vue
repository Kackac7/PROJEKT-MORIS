<template>
  <v-container>
    <v-card color="white" class="my-lists ma-10 py-5 px-10">
      <v-card-title class="headline">Seznamy</v-card-title>

     <savedlists />
     <savedlists />

      <v-row class="py-5">
        <router-link to="/">
          <v-btn>Zpet</v-btn>
        </router-link>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import SavedLists from "./../components/SavedLists.vue";

export default {
  components: {
    savedlists: SavedLists
  }
};
</script>

<style>
.headline {
    justify-content: center;

}
</style>