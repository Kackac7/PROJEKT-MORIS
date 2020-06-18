<template>
  <div>
    <v-app-bar color="white" max-height="60px" elevation="24dp">
      <div class="wrapper">
        <div>Logo</div>

        <div>Title</div>

        <v-menu bottom left offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon x-large v-bind="attrs" v-on="on">
              <v-icon x-large color="black">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(navigator, id) in menuNavigators" v-bind:key="id">
              <v-btn block depressed color="white" x-large class="my-2">
                <div class="navigator-button">
                  <v-icon color="black">{{ navigator.icon }}</v-icon>
                  <span class="navigator-button-text">{{ navigator.label }}</span>
                </div>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: false,
      menuNavigators: [
        { id: 1, label: "Moje recepty", icon: "mdi-home" },
        { id: 2, label: "Moje seznamy", icon: "mdi-account" },
        { id: 3, label: "Profil", icon: "mdi-cellphone-android" },
        { id: 4, label: "Odhlásit", icon: "mdi-image-multiple" }
      ]
    };
  }
};
</script>
<style>
</style>