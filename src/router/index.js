import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
// import Header from "@/components/Header";
// import TopNav from "@/components/TopNav";
import NewSongs from "@/components/NewSongs";
import Rank from "@/components/Rank";
import Plist from "@/components/Plist";
import Singer from "@/components/Singer";
// import FtPlay from "@/components/FtPlay";
// import DetailPlayer from "@/components/DetailPlayer";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: NewSongs
    },{
      path: '/rank',
      component: Rank
    },    {
      path: '/plist',
      component: Plist
    },{
      path: '/singer',
      component: Singer
    }
  ]
})
