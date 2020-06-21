@@ -1,68 +0,0 @@
<template>
 
  <v-container fluid class="odsazeni-od-appbar">
    <v-card class="my-6 ma-10 py-5 px-10 pa-5" color="white">
       
       <v-row no gutters justify="center">
        <v-card-title class="list-headline">Muj první seznam</v-card-title>
        </v-row>
        <v-row no gutters justify="center">
        <v-card-subtitle class="list-subtitle">Z receptu kakaové cupcakes</v-card-subtitle>
        </v-row>
        <v-row no gutters justify="center">
        <v-card-text class="list-text">
        <ul class="ingredients-list">
       <li>banán</li>
       <li>jahudka</li>
        </ul>
         </v-card-text>
        </v-row>
     
        <v-row justify="center">
    <v-dialog v-model="dialog" width="600px" class="open-dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="button-read-list" color="#232222" v-bind="attrs" v-on="on"><div class="text-btn-list">Přejdi na celý seznam</div></v-btn>
      </template>
      <v-card justify="center">
        <v-card-title>
       
          <span class="dialog-list">Název seznamu</span>
        </v-card-title>
        <v-card-text> <ul class="ingredients-list">
       <li>banán</li>
       <li>jahudka</li>
        </ul></v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false">Vytisknout</v-btn>
          <v-btn color="black" text @click="dialog = false">Použít znovu</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
 
      
    </v-card>
    </v-container>
  
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
        }
    },


    methods: {
       
    }
};
</script>

<style>

.open-dialog {
    display: flex;
    justify-content: center;
}
</style>