<template>
  <div class="plist">
    <ul>
      <li v-for="(item) in list" @click="$router.push(`/plist/list/${item.specialid}`)">
        <img :src="item.imgurl.replace('{size}', '400')" class="rank-logo" alt="">
        <div class="rang-title">
          <p class="title">{{item.specialname}}</p>
          <span class="title-sub">
            <i class="icon-music"></i>&nbsp;{{item.playcount}}
          </span>
        </div>
        <img src="../assets/img/arrow_icon.png" alt="" class="rank-next">
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import plistjson from "../json/plist.json";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      Indicator.open({ text: "加载中..." });
      this.$http
        .get("http://39.107.79.182:3389/mkugou/plist/index&json=true")
        .then(({ data }) => {
          this.list = data.plist.list.info;
          Indicator.close();
        })
        .catch(e => {
          // console.log(e);
          this.list = plistjson.plist.list.info;
          Indicator.close();
        });
    },
  }
};
</script>

<style lang="scss">
.plist {
  ul {
    padding: 4px 10px 0px 10px;
    li {
      position: relative;
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      cursor: pointer;
      .rank-logo {
        width: 5.3751rem;
        height: 5.3751rem;
        vertical-align: middle;
      }
      .rang-title {
        position: absolute;
        width: 60%;
        height: 5.3751rem;
        display: inline-block;
        left: 6.3751rem;
        .title {
          display: block;
          position: relative;
          top: 1.2rem;
          height: 3rem;
          margin: 0;
          line-height: 1.5;
          overflow: hidden;
        }
        .title-sub {
          position: absolute;
          height: 1rem;
          bottom: 0;
          font-size: 0.8rem;
          color: #9b9b9b;
          i {
            display: inline-block;
            height: 1rem;
            width: 1rem;
            vertical-align: sub;
            background: url(../assets/img/icon_music.png) no-repeat (50% 35%)/80%;
          }
        }
      }
      .rank-next {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
