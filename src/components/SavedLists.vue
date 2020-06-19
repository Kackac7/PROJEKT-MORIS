@@ -1,68 +0,0 @@
<template>
  <div class="list-card">
    <v-card color="yellow" class="list my-5">
      <v-container fluid>
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
        <v-btn class="button-read-list">Přejdi na celý seznam</v-btn>
      </v-container>
    </v-card>
     <v-card color="yellow" class="list my-5">
      <v-container fluid>
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
        <v-btn class="button-read-list">Přejdi na celý seznam</v-btn>
      </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
    data() {
       listitems: [
           {
               polozkaJedna: 'banán',
           },
           {
                polozkaDva: 'jahudka'
           }
       ]
    },

    methods: {
       
    }
};
</script>

<style>

.list-card {
    margin: 40px;
    padding: 70px 100px;
    display: flex;  
    justify-content: space-between;
    text-align: center;
}

</style>