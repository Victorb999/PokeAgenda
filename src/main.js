import Vue from 'vue'

import { BootstrapVue } from 'bootstrap-vue'
import axios from 'axios';
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/index.sass'

import App from './App.vue'

// Install BootstrapVue
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
