import Vue from 'vue'
import Router from 'vue-router'
import BowlingCalculator from './views/BowlingCalculator.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'BowlingCalculator',
      component: BowlingCalculator
    }
  ]
})
