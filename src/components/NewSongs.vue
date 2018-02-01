<template>
  <div class="newsongs">

    <mt-swipe :auto="5000">
      <mt-swipe-item v-for="(img, index) in banner" :key="index">
        <a href="javascrpit:;">
          <img :src="img.imgurl" :title="img.title" alt="轮播图">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <ul>
      <li v-for="(song,index) in playList" @click="playAudio(index)" class="palyaudio">
        <div class="playList-item">
          <span>{{song.filename}}</span>
        </div>
        <div class="down">
          <div class="down-ico">
            <img src="../assets/img/download_icon_2.png" alt="">
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import jsonsong from "../json/jsonsong.json"; //本地json数据
import axios from "axios";
import { Indicator } from "mint-ui";
// import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      banner: [],
      playList: []
    };
  },
  computed: {},
  created() {
    this.getPlayList();
  },
  methods: {
    getPlayList() {
      this.$http
        .get("http://39.107.79.182:3389/mkugou/?json=true")
        .then(({ data }) => {
          // 解构出response.data
          this.banner = data.banner;
          this.playList = data.data;
          this.$store.commit("setPlayList", this.playList);//初始化播放列表，否则只有点击li才更新播放列表
          Indicator.close();
        })
        .catch(e => {
          // console.log(e)
          this.banner = jsonsong.banner;
          this.playList = jsonsong.data;
          this.$store.commit("setPlayList", this.playList);  
          Indicator.close();
        });
    },
    playAudio(index) {
      // console.log(index);
      var hash = this.playList[index].hash;
      this.$store.commit("setPlayList", this.playList);
      this.$store.commit("setPlayIndex", index);
      this.$store.dispatch("getSong", hash);
      // 兄弟组件传递自定义事件
      this.$parent.eventBus.$emit("liClickEvent", index);
    }
  }
};
</script>

<style lang="scss">
.mint-swipe {
  height: 39vw;
}
.mint-swipe-indicator {
  width: 12px !important;
  height: 12px !important;
}
.mint-swipe-indicators {
  bottom: 5px !important;
}
.newsongs {
  position: relative;
  width: 100%;
  img {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  ul {
    padding: 0 10px;
    margin: 0;
    li {
      width: 100%;
      height: 4.0714rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      .playList-item {
        float: left;
        width: 100%;
        height: 4.0714rem;
        padding-right: 2.657rem;
        line-height: 4.0714rem;
        display: table-cell;
        vertical-align: middle;
        padding-left: 0.3571rem;
        cursor: pointer;
        font-size: 1rem;
        box-sizing: border-box;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .down {
        position: absolute;
        right: 0;
        height: 4.0714rem;
        width: 1.4rem;
        background: #fff;
        .down-ico {
          margin-top: 1.5714rem;
          height: 1rem;
          width: 1rem;
          cursor: pointer;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>
