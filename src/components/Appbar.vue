<template>
  <v-app-bar color="white" max-height="60px" elevation="24dp" fixed>
    <div class="wrapper">
      <div>
        <router-link to="/">Logo</router-link>
      </div>

      <div>Receptář</div>

      <v-menu bottom left offset-y v-bind:close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon x-large v-bind="attrs" v-on="on">
            <v-icon x-large color="black">mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <template v-if="user === null">
          <v-form ref="form" class="white pa-5">
            <v-text-field v-model="username" label="Přihlašovací jméno" required></v-text-field>
            <v-text-field v-model="password" label="Heslo" required></v-text-field>

            <v-btn color="success" class="mr-4" v-on:click="login">Přihlásit</v-btn>
          </v-form>
        </template>

        <template v-if="user !== null">
          <v-list>
            <v-list-item
              v-for="(navigator, id) in menuNavigators"
              v-bind:key="id"
              :to="navigator.url"
            >
              <v-btn block depressed color="white" x-large class="my-2">
                <div class="navigator-button">
                  <v-icon color="black">{{ navigator.icon }}</v-icon>
                  <span class="navigator-button-text">{{ navigator.label }}</span>
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

export default {
  data() {
    return {
      menu: false,

      menuNavigators: [
        { id: 1, label: "Recepty", url: "/recepty" },
        { id: 2, label: "Moje seznamy", url: "/mojeseznamy" },
        { id: 3, label: "Odhlásit", url: "/" }
      ],

      username: "",
      password: "",

    };
  },

  computed: {
    user: function() {
      return userStore.store().user;
    }
  },

  methods: {

    login() {
      //let users = async () => this.fetchUsers();
      //console.log(users);
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
      let filteredUsers = users.filter(user => user.username === this.username);
      console.log(filteredUsers);
    }
  }
};
</script>
<style>
</style>