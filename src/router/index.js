import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MyRecipes from '../views/MyRecipes.vue';
import AddRecipe from '../views/AddRecipe.vue';
import MyLists from "../views/MyLists.vue";
import AddList from '../views/AddList.vue';
import Recipe from '../views/Recipe.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/recepty',
        name: 'Recepty',
        component: MyRecipes
    },
    {
        path: '/pridatrecept',
        name: 'Pridat recept',
        component: AddRecipe
    },
    {
        path: '/mojeseznamy',
        name: 'Moje seznamy',
        component: MyLists
    },
    {
        path: '/vytvorseznam',
        name: 'Vytvor seznam',
        component: AddList
    },
    {
        path: '/recept/:id',
        name: 'Recept',
        component: Recipe,
        props: true
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router