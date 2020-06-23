<template>
  <v-app-bar color="white" max-height="60px" elevation="24dp" fixed>
    <div class="wrapper">
      <div>
        <router-link to="/">Logo</router-link>
      </div>

      <div>MORIS</div>

      
      <div class="user-jmeno" v-if="userLoggedIn">{{username}}</div>
      <v-menu class="user-menu" bottom left offset-y v-bind:close-on-content-click="false" v-model="menu"> 
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-large v-bind="attrs" v-on="on">
            <v-icon x-large color="black">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <template v-if="!userLoggedIn">
          <v-form ref="form" class="white pa-5">
            <span class="red--text" v-if="validationError">Chybné údaje</span>
            <v-text-field v-model="username" label="Přihlašovací jméno" required v-on:keyup.enter="login"></v-text-field>
            <v-text-field :type="'password'" v-model="password" label="Heslo" required v-on:keyup.enter="login"></v-text-field>

            <v-btn color=#302F2F class="mr-4" v-on:click="login">Přihlásit</v-btn>
          </v-form>
        </template>

        <template v-if="userLoggedIn">
          <v-list>
            <v-list-item>
              <v-btn block depressed color="#302F2F" x-large class="my-2">
                <div class="navigator-button">
                  <router-link to="/recepty"><span class="navigator-button-text">Recepty</span></router-link>
                </div>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block depressed color="#302F2F" x-large class="my-2">
                <div class="navigator-button">
                  <router-link to="/mojeseznamy"><span class="navigator-button-text">Moje seznamy</span></router-link>
                </div>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn block depressed color="#302F2F" x-large class="my-2" v-on:click="logout">
                <div class="navigator-button">
                  <span class="navigator-button-text">Odhlásit</span>
                </div>
              </v-btn>
            </v-list-item>
          </v-list>
        </template>
      </v-menu>
    </div>
  </v-app-bar>
</template>
<script>
import userStore from "./../assets/user.js";
import Bus from "./../assets/bus.js";
import App from "./../App.vue";

export default {
  data() {
    return {
      menu: false,

      username: "",
      password: "",

      validationError: false,

      userLoggedIn: false,
      user: null
    };
  },

  methods: {

    logout() {
      userStore.store().user = null;
      Bus.$emit('userLoggedOut');

      this.userLoggedIn = false;
      this.user = null;

      this.menu = false;

      Bus.$emit('showSnackbar', {
          text: 'Odhlášení úspěšné', 
          timeout: 3000
        })
    },

    login() {
      const getUsers = async () => {
        const response = await fetch(
          "https://crudcrud.com/api/e262c0cbc45743039a2870e26c04d0fe/users"
        );
        const json = await response.json();
        if (json.length > 0) {
          if(json[0] !== undefined) {
            return json[0].users;
          };
        }
      };

      getUsers().then(users => {
        this.validateUser(users);  
      });
    },

    validateUser(users) {
      let filteredUsers = users.filter(user => {
          return user.username === this.username && user.password === this.password;
      });
      if (filteredUsers.length === 1) {
        userStore.store().user = filteredUsers[0];
        Bus.$emit('userLoggedIn');

        this.user = filteredUsers[0];
        this.userLoggedIn = true;

        this.validationError = false;
        this.menu= false;
      } else {
        this.validationError = true;
      }
    }
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

</style>