<template>
  <v-app>
    <div>
      <v-app-bar color="white" height="60">
        <div class="wrapper">
          <div>Logo</div>

          <div>Title</div>

          <v-menu bottom left offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon x-large v-bind="attrs" v-on="on">
                <v-icon x-large color="black">mdi-account-circle</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </div>
      </v-app-bar>

    

      <v-navigation-drawer permanent app right color="black" class="list">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-footer
      absolute
      class="font-weight-medium"
      inset
      >
        <v-col
          class="text-center"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Receptar</strong>
        </v-col>
      </v-footer>
    </div>


  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data() {
    return {
      menu: false,
      menuNavigators: [
        { id: 1, label: "Moje recepty", ikona: "mdi-home" },
        { id: 2, label: "Moje seznamy", ikona: "mdi-account" },
        { id: 3, label: "Profil", ikona: "mdi-cellphone-android" },
        { id: 4, label: "Odhlásit", ikona: "mdi-image-multiple" }
      ],

      drawer: null,
      items: [
        { title: "Home", icon: "dashboard" },
        { title: "About", icon: "question_answer" }
      ]
    };
  }
};
</script>

<style>
.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list {
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
