<template>
  <v-app-bar color="white" max-height="60px" elevation="24dp" fixed>
    <div class="wrapper">
      <div>
        <router-link to="/">
          <v-img src="./../assets/images/logo3.png" max-height="45px" max-width="45px"></v-img>
        </router-link>
      </div>

      <div>
        <div class="jmeno-uziv" v-if="username!==null">{{username}}</div>
        <v-menu
          bottom
          left
          offset-y
          v-bind:close-on-content-click="false"
          v-model="menu"
          v-if="userLoggedIn"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn block depressed color="transparent" small v-bind="attrs" v-on="on">
              <v-icon x-large class="ikona-user" color="black">mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <template v-if="userLoggedIn">
            <v-list>
              <v-list-item>
                <router-link to="/recepty">
                  <v-btn
                    block
                    depressed
                    color="#302F2F"
                    large
                    max-height="40px"
                    width="160px"
                    class="my-2"
                    v-on:click="menu = false"
                  >
                    <div class="navigator-button">
                      <span class="navigator-button-text">Recepty</span>
                    </div>
                  </v-btn>
                </router-link>
              </v-list-item>
              <v-list-item>
                <router-link to="/mojeseznamy">
                  <v-btn
                    block
                    depressed
                    color="#302F2F"
                    large
                    max-height="40px"
                    class="my-2"
                    v-on:click="menu = false"
                  >
                    <div class="navigator-button">
                      <span class="navigator-button-text">Moje seznamy</span>
                    </div>
                  </v-btn>
                </router-link>
              </v-list-item>
              <v-list-item>
                <v-btn
                  block
                  depressed
                  color="#302F2F"
                  large
                  max-height="40px"
                  class="my-2"
                  v-on:click="logout"
                >
                  <div class="navigator-button">
                    <span class="navigator-button-text">Odhlásit</span>
                  </div>
                </v-btn>
              </v-list-item>
            </v-list>
          </template>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>
<script>
import userStore from "./../assets/user.js"; // UserStore
import Bus from "./../assets/bus.js";
import App from "./../App.vue";

export default {
  data() {
    return {
      menu: false,

      validationError: false,

      userLoggedIn: false,
      user: null
    };
  },
  computed: {
    username: function() {
      if (this.user !== null) {
        return this.user.username;
      }
    }
  },
  methods: {
    logout() {
      userStore.store().user = null;
      Bus.$emit("userLoggedOut");

      this.userLoggedIn = false;
      this.user = null;

      this.menu = false;
      this.$cookie.delete("user"); //melo by byt v Home.vue v created
      Bus.$emit("showSnackbar", {
        text: "Odhlášení úspěšné",
        timeout: 3000
      });
    }
  },

  created() {
    Bus.$on("userLoggedIn", () => {
      this.userLoggedIn = true;
      this.user = userStore.store().user;
    });
    Bus.$on("userLoggedOut", () => {
      this.userLoggedIn = false;
      this.user = null;
    });
    this.userLoggedIn = userStore.store().user !== null;
    this.user = userStore.store().user;
  }
};
</script>
<style>
.hide {
  display: none;
}

.navigator-button-text {
  color: white;
}

.loggin-button-text {
  color: rgba(0, 0, 0, 0.87) !important;
  text-transform: capitalize;
}
.jmeno-uziv {
  display: flex;
  position: absolute;
  right: 80px;
}
.ikona-user {
  margin-top: -5px;
}
</style>