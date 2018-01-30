<template>
  <div v-show="isDetailPlay" class="detailplayer">
    <!--毛玻璃背景图  -->
    <div class="dp-bg" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <!--  -->
    <div class="dp-content">
      <!-- title -->
      <div class="dp-title">
        <i class="dp-back" @click="$store.commit('setDetailPlayer', false)"></i>
        <span>{{audio.songname}}</span>
      </div>
      <!-- img -->
      <div class="dp-img">
        <img :src="audio.imgUrl">
      </div>
      <div class="dp-lrc">
        <div class="lrc-content" :style="{marginTop: lrcOffset }">
          <p v-for="(item,index) in songLrc" :class="{isCurrentLrc: index==currentLrcNum}">{{item.lrcContent}}</p>
        </div>
      </div>
      <!-- 进度 -->
      <div class="dp-range">
      </div>
      <mt-range v-model="audio.currentLength" :min="0" :max="audio.songLength" :bar-height="2" @click.native="rangeChange($event)">
        <div slot="start" style="margin-right:0.5rem">{{audio.currentLength | time}}</div>
        <div slot="end" style="margin-left:0.5rem">{{audio.songLength | time}}</div>
      </mt-range>
      <!-- 按钮 -->
      <div class="dp-control">
        <i class="play-prev" @click="$store.dispatch('prev')"></i>
        <i class="play-play" :class="{'play-pause':isPlay}" @click="toggleStatus()"></i>
        <i class="play-next" @click="$store.dispatch('next')"></i>
      </div>
      <div class="download-box">
        <i></i>下载这首歌
      </div>
    </div>
  </div>
</template>

<script type="es6">
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      rangeValue: 0
    };
  },
  filters: {
    time(value) {
      var length = Math.floor(parseInt(value));
      var minute = Math.floor(value / 60);
      if (minute < 10) {
        minute = "0" + minute;
      }
      var second = length % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    }
  },
  computed: {
    ...mapGetters(["audio", "isDetailPlay", "isPlay"]),
    songLrc() {
      if (this.audio.lrc) {     
        var temp = this.audio.lrc.split("\r\n");
        var temp = temp.splice(0, temp.length - 1);        //最后一组“” 
        temp = temp.map(value => {        
          var time = value.substr(1, 8).split(/\:|\./);    //["00", "03", "06"]
          var seconds = parseInt(time[0]) * 60 + parseInt(time[1])+ parseInt(time[2])/100  ; //换算成秒
          // console.log(seconds)
          var lrcContent = value.substr(10);
          return {
            seconds,
            lrcContent
          };
        });
        return temp;    //[{,},{}....]
      }
    },
    lrcOffset() {
      if (this.currentLrcNum) {         
          var cc = -(this.currentLrcNum - 1)*1.6 + "rem"
          return this.currentLrcNum >= 2 ? cc : 0
      }
    },
    currentLrcNum(){
      if(this.songLrc){
        for(var i=0 ; i <= this.songLrc.length-1 ; i++){
          if(this.songLrc[i].seconds<=this.audio.currentLength && this.songLrc[i+1].seconds>this.audio.currentLength){
              return i
          }else if(this.songLrc[this.songLrc.length-1].seconds<=this.audio.currentLength){
              return i
          }
       }
      }

    }
  },
  methods: {
    rangeChange(event) {
      var offset = event.offsetX;
      var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20;
      var clickLength = Math.floor(offset * this.audio.songLength / rangeWidth);
      if (offset < rangeWidth) {
        this.$store.commit("setAudioTime", clickLength);
        this.$store.commit("setCurrent", true);
      }
    },
    toggleStatus() {
      if (this.isPlay) {
        document.getElementById("audioPlay").pause();
      } else {
        document.getElementById("audioPlay").play();
      }
      this.$store.commit("setIsPlay", !this.isPlay);
    }
  }
};
</script>

<style lang="scss">
.detailplayer {
  background: rgb(0, 0, 0);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 8;
}
.dp-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(15px); //滤镜：模糊
  -webkit-filter: blur(15px); /* Chrome, Safari, Opera */
  // filter: grayscale(100%);         //滤镜：黑白
  // -webkit-filter: grayscale(100%);
}
.dp-content {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  .dp-title {
    position: relative;
    width: 100%;
    height: 3.2143rem;
    margin-top: 3.2143rem;
    background: linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
    background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6), transparent);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    line-height: 3.2143rem;
    .dp-back {
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
  .dp-img {
    width: 50%;
    margin: 5% auto;
    img {
      width: 100%;
    }
  }
  .dp-lrc {
    width: 100%;
    height: 5.0rem;
    overflow: hidden;
    margin-bottom: 10px;
    text-align: center;
    color: #fff;
    .lrc-content {
      transition: all 0.5s;
      transform: translateZ(0);
      color: #afabac;
      p{
        margin: 0;
        padding: 0;
        height: 1.6rem;
        line-height: 1.6rem;
        font-size: 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.isCurrentLrc{
          color: #d1c90e;
          font-size: 1.2rem;
        }
      }

    }
  }
  .mt-range {
    // mt-range-content margin-right: 30px;勿width:100%与边距同用position: relative;
    // mt-range-runway  right:30px
    // mt-range-thumb 恰好可移除
    // 子元素皆为height=30px,start end受font-size影响
    color: #fff;
    padding: 0 1rem;
    .mt-range-content {
      margin-right: 14px;
      .mt-range-runway {
        right: -16px;
      }
      .mt-range-progress {
        // background: red;
      }
      .mt-range-thumb {
        width: 16px; //range-thumb由30px变为16px,  注意修改runway和progress
        height: 16px;
        top: 7px;
      }
    }
  }
  .download-box {
    position: relative;
    width: 56.25%;
    height: 2.5rem;
    line-height: 2.5rem;
    margin: 1.0714rem auto 0;
    text-align: center;
    color: #fff;
    background: #259ef7;
    font-size: 1rem;
    border-radius: 5px;
    i {
      width: 1.6rem;
      height: 1.6rem;
      display: inline-block;
      vertical-align: middle;
      background: url(../assets/img/download_icon.png) no-repeat;
      background-size: 100%;
    }
  }
}

.dp-control {
  padding:0 20%;
  &::after{
    display: block;
    content: "";
    height: 0;
    visibility: hidden;
    clear: both;
  }
  i {
    display: block;
    width: 33.3%;
    padding-top: 33.3%;   //padding：% 参考width,长宽固定比
    float: left;
    background: blue;
  }
  .play-prev {
    background: url("../assets/img/play_prev.png") no-repeat;
    background-size: 60% auto;
    background-position: center;
  }
  .play-play {
    background: url("../assets/img/play_play.png") no-repeat;
    background-size: 80% auto;
    background-position: center;
  }
  .play-pause {
    background: url("../assets/img/play_pause.png") no-repeat;
    background-size: 80% auto;
    background-position: center;
  }
  .play-next {
    background: url("../assets/img/play_next.png") no-repeat;
    background-size: 60% auto;
    background-position: center;
  }
}
</style>

