<template>
  <v-container>
    <v-card color="#F0EC92" class="card-makelist ma-12 py-6 px-12">
      <v-row>
        <v-form>
          <v-text-field v-model="name" :rules="nameRules" label="Název seznamu*" required outlined width="150px"></v-text-field>

          <v-row>
            <v-col cols="6">
              <v-autocomplete label="Surovina" outlined v-model="ingredient"></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
            </v-col>
            <v-col cols="3">
               <v-autocomplete label="Jednotka" outlined v-model="units"></v-autocomplete>
            </v-col>
            <v-col cols="1">
            
               <v-btn icon><v-icon color="black">mdi-trash-can-outline</v-icon></v-btn>
            
            </v-col>
          </v-row>

           <v-row>
            <v-col cols="6">
              <v-autocomplete label="Surovina" outlined v-model="ingredient"></v-autocomplete>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="quantity" label="Množství" outlined></v-text-field>
            </v-col>
            <v-col cols="3">
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
          <v-btn color="black"><div class="txt-btn-makelist">Uložit</div></v-btn>
         </v-row>
        </v-form>
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
.txt-btn-makelist {
  color: white;
}
</style>