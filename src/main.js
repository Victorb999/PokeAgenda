import Vue from 'vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios';
import router from './router'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/index.sass'
import store from './store'
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
      pokebolaLoad : 'https://cdn.dribbble.com/users/1771704/screenshots/6124573/attachments/1313609/pokeball.gif',
      gastlyLoad :'https://37.media.tumblr.com/bc36b8a4eeee5a4b367c5679772f20a5/tumblr_n4cidt3LZn1s19oqso1_500.gif',
      pokebolaRedLoad : 'https://cdn.dribbble.com/users/1663937/screenshots/3598052/pokeball.gif',
      colors:{
            normal: '#d3d3af',
            fighting: '#d56723',
            flying: '#a1d1f8',
            poison: '#7fa8c9',
            ground: '#7c7e29',
            rock: '#a38c21',
            bug: '#729f3f',
            ghost: '#7b62a3',
            steel: '#9eb7b8',
            fire: '#fd7d24',
            water: '#4592c4',
            grass: '#9bcc50',
            electric: '#eed535',
            psychic: '#f366b9',
            ice: '#51c4e7',
            dragon: '#3d167c',
            dark: '#303030',
            fairy: '#fdb9e9',
            unknown: '#000',
            shadow: '#333',
      }

    }
  }
})


Vue.use(VueLodash, { name: 'custom' , lodash: lodash })

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
