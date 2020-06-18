import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MyRecipes from '../views/MyRecipes.vue';
import AddRecipe from '../views/AddRecipe.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mojerecepty',
    name: 'Moje recepty',
    component: MyRecipes
  },
  {
    path: '/pridatrecept',
    name: 'Pridat recept',
    component: AddRecipe
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
