<template>
  <v-container fill-height fluid>
    <v-row no-gutters align="center" justify="center">
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <router-link to="/mojerecepty" class="btn-text"><v-btn fab x-large min-height="220px" min-width="220px" color="teal">Moje recepty</v-btn></router-link>
            </v-row >
            
            <v-row justify="center" class="my-10">
                <router-link to="/pridatrecept" class="btn-text"><v-btn fab x-large min-height="220px" min-width="220px" color="#E8E544">Přidat recept</v-btn></router-link>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <router-link to="/mojeseznamy" class="btn-text"><v-btn fab x-large min-height="220px" min-width="220px" color="#F89D79" >Moje seznamy</v-btn></router-link>
            </v-row>
            <v-row justify="center" class="my-10">
                <router-link to="/vytvorseznam" ><v-btn fab x-large min-height="220px" min-width="220px" color="#232222" class="btn-text">Přidat seznam</v-btn></router-link>
            </v-row>
        </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.v-btn__content {
    color: white;
}
span .v-btn__content {
    text-decoration: none;
}
</style>