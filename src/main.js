import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueHtmlToPaper from 'vue-html-to-paper';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false

Vue.use(VueHtmlToPaper);
Vue.use(VueCookie);

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')