import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios';
import router from './router'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/index.sass'

import App from './App.vue'

// Install BootstrapVue
Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false

Vue.mixin({
  data: function() {
    return {
      pikachuLoad : 'http://a.top4top.net/p_1990j031.gif',
      pokebolaLoad : 'https://cdn.dribbble.com/users/1771704/screenshots/6124573/attachments/1313609/pokeball.gif'
    }
  }
})


Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
