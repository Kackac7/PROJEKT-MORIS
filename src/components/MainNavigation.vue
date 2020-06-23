<template>
  <v-container fluid color="transparent" class="odsazeni-od-appbar pa-0 mt-13">
    <v-row no-gutters align="center" class="mx-10">
      <v-col>  
        <v-row class="mx-10 my-10"  v-if="userLoggedIn">
          <router-link to="/recepty">
            <v-btn class="btn-logged-in"
              v-bind:min-width="sirkaTlacitka"
              v-bind:min-height="vyskaTlacitka"
              color="#302F2F"
            >
              <div class="text-btn-menu">Recepty</div>
            </v-btn>
          </router-link>
        </v-row>

        <v-row class="mx-10 my-10" v-if="userLoggedIn">
          <router-link to="/mojeseznamy">
            <v-btn
              class="btn-logged-in"
              v-bind:min-width="sirkaTlacitka"
              v-bind:min-height="vyskaTlacitka"
              color="#302F2F"
            >
              <div class="text-btn-menu">Moje seznamy</div>
            </v-btn>
          </router-link>
        </v-row>

        <v-row class="mx-10 my-10"  v-if="userLoggedIn">
          <router-link to="/pridatrecept">
            <v-btn
              class="btn-logged-in"
              v-bind:min-width="sirkaTlacitka"
              v-bind:min-height="vyskaTlacitka"
              color="#302F2F"
            >
              <div class="text-btn-menu" >Přidat recept</div>
            </v-btn>
          </router-link>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import userStore from "./../assets/user.js";
import Bus from "./../assets/bus.js";

export default {
  name: "App",

  data() {
    return {
      userLoggedIn: false
      //user: null
    };
  },

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
          return "100px";
        case "sm":
          return "120px";
        case "md":
          return "150px";
        case "lg":
          return "150px";
        case "xl":
          return "150px";
      }
    },
    vyskaTlacitka() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "40px";
        case "sm":
          return "40px";
        case "md":
          return "40px";
        case "lg":
          return "40px";
        case "xl":
          return "40px";
      }
    }
  },

  created() {
    Bus.$on("userLoggedIn", () => {
      this.userLoggedIn = true;
    });
    Bus.$on("userLoggedOut", () => {
      this.userLoggedIn = false;
    });
    this.userLoggedIn = userStore.store().user !== null;
  }
};
</script>

<style>
.v-btn__content {
  color: white;
}

.text-btn-menu {
  font-size: 16px;
  color: white;
}
a {
  text-decoration: none;
}
.hlavne-menu {
  margin: 150px auto;
}
.btn-logged-in{
  width: 200px;
  min-height: 40px;
}
</style>