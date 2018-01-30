<template>
  <div class="ftplay">
    <!-- 隐藏播放 -->
    <div id="player" style="display: none;">
      <audio id="audioPlay" :src="audio.songUrl" autoplay controls="" @timeupdate="change()" @ended="$store.dispatch('next')">
      </audio>
    </div>
    <!-- 隐藏播放 -->
    <a href="javascrpit:" class="ft-left" @click="$store.commit('setDetailPlayer', true)">
      <img :src="audio.imgUrl" class="gs-img" alt="">
      <div class="ft-left-title">
        <p>{{audio.songname}}</p>
        <p>{{audio.singer}}</p>
      </div>
    </a>

    <div class="ft-right">
      <i class="btn-play" @click="toggleStatus()" :class="{'btn-pause':isPlay}"></i>
      <i class="btn-next" @click="$store.dispatch('next')"></i>
      <i class="ico-down"></i>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["audio", "isPlay"]),
  },
  methods: {
    toggleStatus() {
      if (this.isPlay) {
        document.getElementById("audioPlay").pause();
      } else {
        document.getElementById("audioPlay").play();
      }
      this.$store.commit("setIsPlay", !this.isPlay);
    },
    change() {
      var time = document.getElementById("audioPlay").currentTime;  
      //currentTime Audio DOM属性,秒（可读/设小数点后6位）
      if (this.audio.currentFlag) {
        document.getElementById("audioPlay").currentTime = this.audio.currentLength;
        this.$store.commit("setCurrent", false);
      } else {
        this.$store.commit("setAudioTime", time);
      }
    }
  },
  mounted() {
    this.$parent.eventBus.$on("liClikEvent", function(index) {
      let audio = document.getElementById("audioPlay");
      if (audio.src!="") {
        setTimeout(function(){
          audio.play();
        },100)
      }
    });
  },
};
</script>

<style lang="scss">
.ftplay {
  /* display: none; */
  width: 100%;
  height: 4.2143rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  font-size: 0;
  .ft-left {
    width: 65%;
    height: 4.2143rem;
    display: block;
    text-align: left;
    overflow: hidden;
    img {
      position: absolute;
      float: left;
      width: 3.75rem;
      height: 3.75rem;
      border-radius: 4px;
      margin-top: 0.26rem;
      margin-left: 0.1rem;
    }
    .ft-left-title {
      position: relative;
      left: 4.5rem;
      float: left;
      margin-left: 0.2rem;
      height: 4.2143rem;
      width: 70%;
      padding-top: 0.7rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      p {
        vertical-align: middle;
        margin: 0;
        &:first-child {
          width: 100%;
          height: 1.7rem;
          line-height: 1.7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.8571rem;
          color: #fff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:last-child {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.7143rem;
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.ft-right {
  width: 35%;
  min-width: 8rem;
  height: 2.1rem;
  position: absolute;
  top: 1.0714rem;
  right: 0;
  i {
    display: inline-block;
    width: 2.1rem;
    height: 2.1rem;
    margin-left: 0.5rem;
    // border: 1px #fff solid;
    cursor: pointer;
    &:nth-child(2) {
      background: url(../assets/img/next_icon.png) no-repeat center/80%;
    }
    &:last-child {
      background: url(../assets/img/download_icon.png) no-repeat center/80%;
    }
  }
}
.btn-play {
  background: url(../assets/img/play_icon.png) no-repeat center/80%;
}
.btn-pause {
  background: url(../assets/img/pause_icon.png) no-repeat center/80%;
}
</style>
