import Vue from 'vue';
import app from '@/app';
import store from '@/store';
import router from '@/router';

Vue.config.devtools = process.env.NODE_ENV !== 'production'
console.log(Vue.config)

import component from './components';
component(Vue);

new Vue({
  el: '#app',
  router: router,
  store: store,
  // i18n: i18n,
  render: h => h(app),
});

