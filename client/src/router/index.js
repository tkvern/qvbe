import Vue from 'vue'
import Router from 'vue-router'
import MarketPrice from '@/components/MarketPrice'
import Exchange from '@/components/Exchange'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MarketPrice
    },
    {
      path: '/price',
      name: 'MarketPrice',
      component: MarketPrice
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    }
  ]
})
