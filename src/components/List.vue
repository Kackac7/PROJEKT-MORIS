<template>
  <v-navigation-drawer v-model="drawer" app right class="pa-5">
    
    <span>Ingredience</span>

    <v-list>
      <v-list-item>kokos</v-list-item>
    </v-list>

    <v-divider></v-divider>

    <span>Pouzite recepty</span>

    <v-list>
      <v-list-item>Kokosove smoothie</v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: null
    };
  },

  methods: {
      receptPridan(event) {
          console.log(event);

      }
  }
};
</script>

<style>
</style>