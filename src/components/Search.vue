<template>
    <div class="search" v-show="$store.state.isSearch">
        <div class="search-title">
            <i @click="$store.commit('toggleSearch', false)"></i>
            <span>搜索</span>
        </div>
        <div class="search-form">
            <form name="searchForm" id="searchForm">
                <i class="search-icon"></i>
                <input type="text" placeholder="歌手/歌名/拼音" name="keyword" value="" id="keyword" class="search-keyword">
                <input type="submit" value="搜索" class="search-btn  search-disabled-btn" id="searchBtn" disabled="disabled">
            </form>
        </div>

        <div class="hot-search">
            <div class="hot-search-hd">
                最近热门
            </div>
            <ul class="hot-search-list">
                <li> 洗脑电音 </li>
                <li> 儿歌大全 </li>
                <li> 无损音质 </li>
                <li> 古风好歌 </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      searchTitle: "最近热门",
      searchCont: "",
      hotSeen: true,
      searchSeen: false
    };
  },
  methods: {
    historyGo() {
      window.history.go(-1);
    },
    searchS(key) {
      if (key) {
        this.searchCont = key;
      }
      this.hotSeen = false;
      this.searchSeen = true;
      var that = this;
      var cont = this.searchCont;
      var page = 1;
      this.$http
        .get(
          "http://39.107.79.182:3389/mobilecdn/api/v3/search/song?keyword=" +
            cont +
            "&page=" +
            page +
            "&pagesize=100&showtype=1",
          {}
        )
        .then(function(response) {
          that.searchTitle = "总共" + response.data.data.total + "条结果";
          that.$store.state.searchList = response.data.data;
        });
    },
    searchGetUrl(e) {
      //歌曲信息
      this.$store.state.getMusic.hash = e.target.getAttribute("hash");
      this.$store.state.getMusic.name = e.target.innerHTML.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.$store.commit("getApi");
      this.$store.state.next.hash = e.target.nextSibling.getAttribute("hash");
      this.$store.state.next.name = e.target.nextSibling.innerHTML;
    }
  },
  mounted() {
    var that = this;
    this.$http
      .get("http://39.107.79.182:3389/mobilecdn/api/v3/search/hot?plat=0&count=30", {})
      .then(function(response) {
        that.$store.state.searchList = response.data.data;
      });
  }
};
</script>

<style lang="scss">
.search {
  position: fixed;
  margin-top: 3.2143rem;
  top: 0;
  width: 100%;
  z-index: 10;
  background: #fff;
  height: 100%;
  .search-title {
    position: relative;
    width: 100%;
    height: 3.2143rem;
    margin-top: 3.2143rem;
    background: #fff;
    color: #fff;
    font-size: 1rem;
    text-align: center;
    line-height: 3.2143rem;
    i {
      display: block;
      float: left;
      width: 3.2143rem*24/40;
      height: 100%;
      background: url("../assets/img/goback.png") no-repeat center;
      background-size: 60% 60%;
      position: absolute;
      left: 5px;
      top: 0;
    }
  }
  .search-form {
    padding: 20px 15px;
    background: #fbfbfb;
    position: relative;
    // margin-top: 6.4286rem;
    form {
      position: relative;
      .search-icon {
        position: absolute;
        top: 1px;
        vertical-align: middle;
        margin: 0;
        display: inline-block;
        height: 1.9rem;
        width: 1.9rem;
        background: url(../assets/img/search_icon.png) no-repeat (50% 80%)/80%;
      }
      .search-keyword {
        padding-left: 2.2rem;
        width: 75%;
        height: 2rem;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        font-size: 1rem;
        box-sizing: border-box;
      }
      .search-btn {
        position: absolute;
        right: 0;
        width: 17.25%;
        border: none;
        border-radius: 5px;
        text-align: center;
        background: #2ba2fa;
        color: #fff;
        height: 2rem;
        line-height: 2rem;
        vertical-align: middle;
        font-size: 1rem;
      }
      .search-disabled-btn {
        color: #959595;
        background: #e5e5e5;
      }
    }
  }
}
.hot-search {
  .hot-search-hd {
    height: 2.8571rem;
    line-height: 2.8571rem;
    padding-left: 0.8929rem;
    border-bottom: 1px solid #ccc;
    font-size: 0.8571rem;
    color: #2ca3f5;
  }
  .hot-search-list {
    padding: 0;
    li {
      padding-left: 20px;
      height: 3.5714rem;
      line-height: 3.5714rem;
      border-bottom: 1px solid #e5e5e5;
      display: block;
      color: #333;
      font-size: 1.1429rem;
      text-indent: 0.1786rem;
      position: relative;
      cursor:pointer;
    }
  }
}
</style>
