  
    <sideMenu />
       
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
           
    <v-main>

      <v-container fluid>
        <my-recipes />

      </v-container>

     
    </v-main>




     let isDuplicate = false;
      for (let i = 0; i < this.ingredientList.length - 1; i++) {
        if (this.ingredientList[i] === this.ingredientList[this.ingredientList.length-1]) {
          isDuplicate = true;
          break;
        }
      }
      if (isDuplicate) {
        alert(this.ingredientList[this.ingredientList.length-1]);
        this.ingredientList[this.ingredientList.length-1] = null;
      } else {
        this.ingredientList.push(null);
        console.log(this.ingredientList);
      }
    }