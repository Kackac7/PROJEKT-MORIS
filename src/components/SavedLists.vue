@@ -1,68 +0,0 @@
<template>
  <div class="list-card">
    <v-card color="yellow" class="list my-6">
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
     <v-card color="#F89D79" class="list my-6">
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
    margin: 70px 50px;
    padding: 70px 70px;
    display: flex;  
    justify-content: space-between;
    
}
.container.container--fluid {
    margin: 50px 30px;
    
}
.list-headline {
    text-align: center;
}

</style>