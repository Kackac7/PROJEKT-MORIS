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

             <v-list>
              <v-list-item
                v-for="(navigator, id) in menuNavigators"
                :key="id"
                @click=""
              >
                <v-list-item-title>{{ navigator.label }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          
          
        </div>
      </v-app-bar>

  </div>
    </div>
    
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data (){
    return {
      menu: false,
      menuNavigators: [
        { id: 1, label: "Moje recepty", ikona: "mdi-home" },
        { id: 2, label: "Moje seznamy", ikona: "mdi-account" },
        { id: 3, label: "Profil", ikona: "mdi-cellphone-android" },
        { id: 4, label: "Odhlásit", ikona: "mdi-image-multiple" }
      ]
    }
  },

 
};
</script>

<style>

.wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
