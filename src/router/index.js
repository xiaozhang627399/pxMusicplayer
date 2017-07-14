import Vue from 'vue'
import Router from 'vue-router'
import home from './../views/home/home'
import rank from './../views/rank/rank'
import search from './../views/search/search'
import album from './../views/album/album'
import songList from './../views/songList/songList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/album',
      name: 'album',
      component: album
    },
    {
      path: '/songList',
      name: 'songList',
      component: songList
    }
  ]
})

