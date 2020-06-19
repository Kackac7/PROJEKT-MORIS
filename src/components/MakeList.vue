<template>
  <v-container>
    <v-card color="white" class="ma-10 py-5 px-10">
      <v-row>
        <v-form>
          <v-text-field v-model="name" :rules="nameRules" label="Název seznamu*" required outlined width="150px"></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-autocomplete label="Surovina" outlined v-model="ingredient"></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
            </v-col>
            <v-col>
               <v-autocomplete label="Jednotka" outlined v-model="units"></v-autocomplete>
            </v-col>
            <v-col>
               <v-btn icon><v-icon color="black">mdi-trash-can-outline</v-icon></v-btn>
            </v-col>
          </v-row>

           <v-row>
            <v-col cols="6">
              <v-autocomplete label="Surovina" outlined v-model="ingredient"></v-autocomplete>
            </v-col>
            <v-col>
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
            </v-col>
            <v-col>
               <v-autocomplete label="Jednotka" outlined v-model="units"></v-autocomplete>
            </v-col>
            <v-col>
               <v-btn icon><v-icon color="black">mdi-trash-can-outline</v-icon></v-btn>
            </v-col>
          </v-row>
         <v-row justify="center">
         <v-btn v-on:click="add" icon class="add-item-to-list"><v-icon color="black">mdi-plus-box</v-icon></v-btn>
         </v-row>
         <v-row justify="center">
          <v-btn> Uložit</v-btn>
         </v-row>
        </v-form>
      </v-row>

      <v-row class="py-5">
          <router-link to="/"><v-btn>Zpet</v-btn></router-link>
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
      ingredient: null,
      quantity: null,
      units: [],
      method: null
    };
  },

  methods: {
      add: function() {

      }
  }
};
</script>

<style>

</style>