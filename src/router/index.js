import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Tipo from '@/components/Types/Tipo.vue'
import Geracao from '@/components/Generation/Geracao.vue'
import PokeAgenda from '@/components/PokeAgenda.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tipo',
    name: 'Tipo',
    component: Tipo
  },
  {
    path: '/tipo/:id',
    name: 'Tipo pokemon',
    component: Tipo
  },
  {
    path: '/geracao',
    name: 'Geracao',
    component: Geracao
  },
  {
    path: '/geracao/:id',    
    name: 'Geracao pokemon',
    component: Geracao
  },
  {
    path: '/pokemon/:id',
    name: 'PokeAgenda',
    component: PokeAgenda
  }


];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
