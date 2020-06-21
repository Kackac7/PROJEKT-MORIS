<template>
  <v-container fill-height fluid color="transparent" class="odsazeni-od-appbar">
  
    <v-row no-gutters align="center" justify="center">
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <router-link to="/mojerecepty"><v-btn v-bind:min-width="sirkaTlacitka" v-bind:min-height="vyskaTlacitka" fab color="teal"><div class="text-btn-menu">Recepty</div></v-btn></router-link>
            </v-row >
            
            <v-row justify="center" class="my-10">
                <router-link to="/pridatrecept"><v-btn v-bind:min-width="sirkaTlacitka" v-bind:min-height="vyskaTlacitka"  fab  color="#E8E544" ><div class="text-btn-menu">Přidat recept</div></v-btn></router-link>
            </v-row>
        </v-col>
        <v-col cols="3">
            <v-row justify="center" class="my-10">
                <router-link to="/mojeseznamy"><v-btn v-bind:min-width="sirkaTlacitka" v-bind:min-height="vyskaTlacitka"  fab  color="#F89D79"><div class="text-btn-menu">Moje seznamy</div></v-btn></router-link>
            </v-row>
            <v-row justify="center" class="my-10">
                <router-link to="/vytvorseznam"><v-btn v-bind:min-width="sirkaTlacitka" v-bind:min-height="vyskaTlacitka" fab color="#232222" v-bind="btnSize"><div class="text-btn-menu">Přidat seznam</div></v-btn></router-link>
            </v-row>
        </v-col>
      
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "App",
  computed: {
    sirkaTlacitka() {
      return {
        "x-small": this.$vuetify.breakpoint.xsOnly,
        small: this.$vuetify.breakpoint.smOnly,
        large: this.$vuetify.breakpoint.lgOnly,
        "x-large": this.$vuetify.breakpoint.xlOnly
      };
    },
    sirkaTlacitka() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "50px";
        case "sm":
          return "120px";
        case "md":
          return "220px";
        case "lg":
          return "220px";
        case "xl":
          return "220px";
      }
    },
    vyskaTlacitka() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "50px";
        case "sm":
          return "120px";
        case "md":
          return "220px";
        case "lg":
          return "220px";
        case "xl":
          return "220px";
      }
    }
  }
};
</script>

<style>
.v-btn__content {
  color: white;}
  
.text-btn-menu {
    color: white;
}
a {
  text-decoration: none;
}
</style>