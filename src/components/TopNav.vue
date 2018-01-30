<template>
  <div class="topnav">
    <ul>
      <li v-for="(item,index) in topnavlist" class="topnav-tab" @click="active(index)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topnavlist: ["新歌", "排行", "歌单", "歌手"]
    };
  },
  methods: {
    active(index) {
      var show = document.querySelectorAll(".topnav-tab");
      show[index].className += " active";
      for (let i = 0; i < show.length; i++) {
        if (i != index) {
          show[i].className = show[i].className.replace("active", "");
        }
      }
      switch (index) {
        case 0:
          this.$router.push({ path: "/" });
          break;
        case 1:
          this.$router.push({ path: "/rank" });
          break;
        case 2:
          this.$router.push({ path: "/plist" });
          break;
        case 3:
          this.$router.push({ path: "/singer" });
          break;
      }
    }
  },
  mounted() {
    document.querySelectorAll(".topnav-tab")[0].className += " active";
  }
};
</script>

<style>
.topnav {
  position: fixed;
  top: 0; /*bug  top:16px 可能是body影响*/
  margin-top: 3.2143rem;
  width: 100%;
  background: #fff;
  height: 3rem;
  line-height: 3rem;
  z-index: 8;
}
.topnav ul {
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0 0.7143rem;
  /* display: -webkit-box; */
  /* display: box; */
  box-sizing: border-box;
}
.topnav li {
  box-sizing: border-box;
  width: 25%;
  text-align: center;
  float: left;
}
.active {
  border-bottom: 0.2143rem solid #33a3f5;
}
</style>

