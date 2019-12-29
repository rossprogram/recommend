import Vue from 'vue';
import moment from 'vue-moment';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.use(moment);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
