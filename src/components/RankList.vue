<template>

  <div class="ranklist">
    <div class="rank-title">
      <i class="back" @click="$router.go(-1)"></i>
      <span>{{title}}</span>
    </div>

    <div class="rank-banner" :style="imgBackground">
      <div class="time">上次更新时间：{{ nowTime()}}</div>
    </div>

    <ul class="rank-list">
      <li v-for="(item,index) in playList" @click="playAudio(index)">
        <div class="num">
          <span>{{index+1}}</span>
        </div>
        <div class="content">
          <span>{{item.filename}}</span>
        </div>
        <i></i>
      </li>
    </ul>

  </div>
</template>
<script>
import rank666 from "../json/rank666.json";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      title: "",
      imgurl: "",
      playList: [],
      updateTime: "xxx"
    };
  },
  computed: {
    imgBackground() {
      return {
        background: `url(${this.imgurl.replace(
          "{size}",
          "400"
        )}) no-repeat center/cover`
      };
    }
  },
  mounted() {
    this.getPlayList();
  },
  methods: {
    getPlayList() {
      Indicator.open("加载中...");
      var infoID = this.$route.params.id;
      this.$http
        .get(
          `http://39.107.79.182:3389/mkugou/rank/info/?rankid=${infoID}&page=1&json=true`
        )
        .then(({ data }) => {
          this.title = data.info.rankname;
          this.imgurl = data.info.imgurl;
          this.playList = data.songs.list;
          this.$store.commit("setPlayList", this.playList);
          Indicator.close();
        })
        .catch(e => {
          this.title = rank666.info.rankname;
          this.imgurl = rank666.info.imgurl;
          this.playList = rank666.songs.list;
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
      this.$parent.eventBus.$emit("liClickEvent", index);
    },
    nowTime() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1;
      month = month > 10 ? month : "0" + month;
      var date = nowDate.getDate();
      return year + "-" + month + "-" + date;
    }
  }
};
</script>
<style lang="scss" scoped>
.ranklist {
  position: relative;
  margin-top: -3.2143rem;
  background: #fff;
  z-index: 8;
  .rank-title {
    position: fixed;
    width: 100%;
    height: 3.2143rem;
    background: linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    line-height: 3.2143rem;
    z-index: 11;
    .back {
      display: block;
      float: left;
      width: 3.2143rem*24/40;
      height: 100%;
      background: url("../assets/img/goback_icon.png") no-repeat center;
      background-size: 60% 60%;
      position: absolute;
      left: 5px;
      top: 0;
    }
  }
  .rank-banner {
    position: relative;
    margin-top: -3.2143rem;
    width: 100&;
    height: 50vw;
    .time {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-size: 0.8rem;
      color: #fff;
    }
  }
  .rank-list {
    margin: 0;
    padding: 4px 10px;
    li {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      padding: 1rem 0;
      font-size: 1rem;
      line-height: 1rem;
      cursor: pointer;
      .num {
        position: absolute;
        left: 0.2rem;
        height: 1rem;
        width: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8rem;
        color: #999;
        span {
          padding: 0 0.4rem;
          border-radius: 0.5rem;
        }
      }
      &:nth-child(1) {
        .num span {
          color: white !important;
          background: #e80000;
        }
      }
      &:nth-child(2) {
        .num span {
          color: white !important;
          background: #ff7200;
        }
      }
      &:nth-child(3) {
        .num span {
          color: white !important;
          background: #f8b300;
        }
      }
      .content {
        margin: 0 2rem;
        line-height: 1.5;
      }
      i {
        position: absolute;
        right: 0.5rem;
        height: 1rem;
        width: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: url(../assets/img/download_icon_2.png) no-repeat
          center/cover;
      }
    }
  }
}
</style>

