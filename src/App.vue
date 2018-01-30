<template>
  <div id="app">
    <Header/>
    <!-- <TopNav/> -->
    <!-- <div class="main"> -->
      <!-- <router-view/> -->
      <!-- <NewSongs/> -->
      <!-- <Rank/> -->
      <!-- <Plist/> -->
      <!-- <Singer/> -->
      <RankList/>
    <!-- </div> -->
    <Search/>
    <FtPlay/>
    <DetailPlayer/>
  </div>
</template>

<script>
import Vue from "vue";

import Header from "./components/Header";
import TopNav from "./components/TopNav";
import NewSongs from "./components/NewSongs";
import FtPlay from "./components/FtPlay";
import DetailPlayer from "./components/DetailPlayer";
import Rank from "./components/Rank";
import Plist from "./components/Plist";
import Singer from "./components/Singer";
import Search from "./components/Search";
import RankList from "./components/RankList";

export default {
  components: {
    Header,
    TopNav,
    NewSongs,
    FtPlay,
    DetailPlayer,
    Rank,
    Plist,
    Singer,
    Search,
    RankList
  },
  computed: {
    // 利用空Vue实例解决兄弟组件事件传递，解决移动端禁用音频自动播放
    eventBus: () => {
      var eventBus = new Vue({});
      return eventBus;
    }
  }
};

</script>

<style lang="scss">
html {
  font-size: 100%;
}
body {
  font-size: 1rem;
  background: #fff;
  color: #333;
  position: relative;
  margin: 0;
  /* font-family: Microsoft Yahei; */
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  /* font-size: 20px; */
  position: relative;
  .main {
    position: relative;
    // margin: 0;
    // padding: 0;
    // border: 1px red solid;
    margin-top: 3.2143rem*2;
  }
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: inherit;
}
</style>
