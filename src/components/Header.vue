<template>
  <div class="header">
    <div to="/" class="header-logo" @click="$router.push('/')">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="header-down" @click="$router.push('/')">下载酷狗</div>
    <div to="/search" class="header-search" @click="toggleSearch()">
      <img src="../assets/img/search.png" alt="">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isSearch: false
    };
  },
  methods: {
    toggleSearch() {
      if (this.$store.state.isSearch) {
        this.$store.commit("toggleSearch", false);
      } else {
        this.$store.commit("toggleSearch", true);
        this.$store.commit("setDetailPlayer", false);
      }
    }
  }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 3.2143rem;
  background: #2ca2f9;
  padding-top: 0.0357rem;
  justify-content: space-between;
  .header-logo {
    width: 7.286rem;
    height: 1.7143rem;
    position: absolute;
    left: 0.7143rem;
    top: 50%;
    transform: translateY(-50%);
    img {
      width: 100%;
    }
  }
  .header-down {
    position: absolute;
    width: 5.7143rem;
    height: 1.7143rem;
    line-height:1.7743rem;
    text-align: center;
    color: #fff;
    background: #259ef7;
    font-size: 1rem;
    border-radius: 5px;
    left: 8.286rem;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #fff;
    border-radius: 0.3571rem;
  }
  .header-search {
    width: 1.2143rem;
    height: 1.2143rem;
    position: absolute;
    right: 0.7143rem;
    position: absolute;
    top: 50%; //参考容器
    transform: translateY(-50%); //平移，参考自身
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
