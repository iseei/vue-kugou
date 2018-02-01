<template>
    <div class="plist">
        <div class="plist-title">
            <i class="back" @click="$router.go(-1)"></i>
            <span>{{title}}</span>
        </div>
        <div class="plist-banner" :style="imgBackground">
        </div>
        <ul class="plist-list">
            <li v-for="(item,index) in playList" @click="playAudio(index)">
                <div class="content">
                    <span>{{item.filename}}</span>
                </div>
                <i></i>
            </li>
        </ul>
    </div>
</template>
<script>
import plistlist258144 from "../json/plistlist258144";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      title: "",
      imgurl:"",
      playList: [],
    };
  },
  computed: {
    imgBackground(){
      return{
      background: `url(${this.imgurl.replace("{size}", "400")}) no-repeat center/cover`}
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
        .get(`http://39.107.79.182:3389/mkugou/plist/list/${infoID}?json=true` )
        .then(({ data }) => {
         this.title = data.info.list.specialname;
          this.imgurl = data.info.list.imgurl;
          this.playList = data.list.list.info;
          this.$store.commit("setPlayList", this.playList);
          Indicator.close();
        })
        .catch(e => {
          this.title = plistlist258144.info.list.specialname;
          this.imgurl = plistlist258144.info.list.imgurl;
          this.playList = plistlist258144.list.list.info;
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
    }
  },
};
</script>
<style lang="scss" scoped>
.plist {
  position: relative;
  margin-top: -3.2143rem;
  background: #fff;
  z-index: 8;
  .plist-title {
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
  .plist-banner {
    position: relative;
    margin-top: -3.2143rem;
    width: 100&;
    height: 50vw;
  }
  .plist-list {
    margin: 0;
    padding: 4px 10px;
    li {
      position: relative;
      border-bottom: 1px solid #eeeeee;
      padding: 1rem 0;
      font-size: 1rem;
      line-height: 1rem;
      cursor: pointer;
      .content {
        margin: 0 2rem 0 0.6rem;
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

