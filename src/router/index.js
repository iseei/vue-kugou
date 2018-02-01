import Vue from 'vue'
import Router from 'vue-router'

import Header from "../components/Header";
import TopNav from "../components/TopNav";
import NewSongs from "../components/NewSongs";
import FtPlay from "../components/FtPlay";
import DetailPlayer from "../components/DetailPlayer";
import Rank from "../components/Rank";
import Plist from "../components/Plist";
import Singer from "../components/Singer";
import Search from "../components/Search";
import RankList from "../components/RankList";
import PlistList from "../components/PlistList";

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: NewSongs
  }, {
    path: '/rank',
    component: Rank
  }, {
    path: '/plist',
    component: Plist
  }, {
    path: '/singer',
    component: Singer
  },{
    path: '/rank/info/:id',
    component: RankList
  },{
    path: '/plist/list/:id',
    component: PlistList
  }]
})
