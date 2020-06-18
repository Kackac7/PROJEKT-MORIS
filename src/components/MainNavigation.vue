<template>
  <v-container fill-height fluid>
    <v-row no-gutters align="center" justify="center">
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <router-link to="/mojerecepty"><v-btn fab x-large min-height="220px" min-width="220px">Moje recepty</v-btn></router-link>
            </v-row >
            
            <v-row justify="center" class="my-10">
                <router-link to="/pridatrecept"><v-btn fab x-large min-height="220px" min-width="220px">Přidat recept</v-btn></router-link>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <v-btn fab x-large min-height="220px" min-width="220px">Moje seznamy</v-btn>
            </v-row>
            <v-row justify="center" class="my-10">
                <v-btn fab x-large min-height="220px" min-width="220px">Přidat seznam</v-btn>
            </v-row>
        </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>