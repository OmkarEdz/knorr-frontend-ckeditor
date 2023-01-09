import Vue from 'vue'
import Router from 'vue-router'
import Certificates from '@/components/Certificates'
// import Service from '@/components/Service'
// import Bootstrap from '@/components/Bootstrap'
// import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Certificates',
      component: Certificates
    },
  ]
})
