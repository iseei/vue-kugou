<template>
  <div class="rank">
    <ul>
      <li v-for="(item,index) in list" @click="$router.push(`/rank/info/${item.rankid}`)">
        <img class="rank-logo" alt="" :src="item.imgurl.replace('{size}', '400')">
        <span>{{item.rankname}}</span>
        <img src="../assets/img/arrow_icon.png" alt="" class="rank-next">
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import rankjson from "../json/rank.json";
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
        .get("http://39.107.79.182:3389/mkugou/rank/list&json=true")
        .then(({ data }) => {
          this.list = data.rank.list;
          Indicator.close();
        })
        .catch(e => {
          // console.log(e);
          this.list = rankjson.rank.list;
          Indicator.close();
        });
    }
  }
};
</script>

<style lang="scss">
.rank {
  ul {
    margin: 0;
    padding: 0 10px;
    li {
      width: 100%;
      padding: 10px 0;
      border-bottom: 1px solid #e5e5e5;
      font-family: "Microsoft Yahei";
      position: relative;
      cursor: pointer;
      .rank-logo {
        width: 5.3751rem;
        height: 5.3751rem;
        vertical-align: middle;
      }
      span {
        display: inline-block;
        vertical-align: middle;
        margin-left: 1rem;
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
