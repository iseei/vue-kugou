<template>
    <div class="singer">
        <ul class="singer-list">
            <li @click="goRouter(88)">热门歌手<i></i></li>
        </ul>
        <ul class="singer-list">
            <li @click="goRouter(1)">华语男歌手<i></i></li>
            <li @click="goRouter(2)">华语女歌手<i></i></li>
            <li @click="goRouter(3)">华语组合<i></i></li>
        </ul>
        <ul class="singer-list">
            <li @click="goRouter(4)">日韩男歌手<i></i></li>
            <li @click="goRouter(5)">日韩女歌手<i></i></li>
            <li @click="goRouter(6)">日韩组合<i></i></li>
        </ul>
        <ul class="singer-list">
            <li @click="goRouter(7)">欧美男歌手<i></i></li>
            <li @click="goRouter(8)">欧美女歌手<i></i></li>
            <li @click="goRouter(9)">欧美组合<i></i></li>
        </ul>
    </div>
</template>
<script>
export default {
  methods: {
    goRouter(id) {
      //   this.$router.push({ path: `/singer/list/${id}` });
    }
  }
};
</script>

<style lang="scss">
.singer {
  padding: 0 10px;
  overflow: hidden;
  .singer-list {
    margin: 15px 0;
    padding: 0 1rem;
    border: 1px solid #e4e4e4;
    border-radius: 5px;
    background-color: #fbfbfb;
    li {
      padding: 12px 0;
      font-size: 1rem;
      border-bottom: 1px solid #e4e4e4;
      position: relative;
      cursor: pointer;
      &:last-of-type {
        border: none;
      }
      i{
        float: right;
        width: 0.57143rem;
        height: 1rem;
        margin-top: .2rem;
        background: url("../assets/img/arrow_icon.png") no-repeat center/100%;
      }
    }
  }
}
</style>

