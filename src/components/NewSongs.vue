<template>
  <div class="newsongs">

    <mt-swipe :auto="5000">
			<mt-swipe-item v-for="(img, index) in banners" :key="index">
				<a href="javascrpit:;">
					<img :src="img.imgurl" :title="img.title">
				</a>
			</mt-swipe-item>
		</mt-swipe>
    <!-- <img v-for="(img,index) in banners" :src="img.imgurl" alt="" :title="img.title" :index="index"> -->
    <ul>
      <li v-for="(song,index) in songList" @click="playAudio(index)" class="palyaudio">
        <div class="songlist-item">
          <span>{{song.filename}}</span>
        </div>
        <div class="down">
          <div class="down-ico">
            <img src="../assets/img/download_icon_2.png" alt="">
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["songList", "banners"])
  },
  created() {
    this.$store.dispatch("getSongList");
  },
  methods: {
    playAudio(index) {
      // li点击只需传递hash、index
      console.log(index)
      var hash = this.songList[index].hash;
      this.$store.commit("setSongIndex", index);
      this.$store.dispatch("getSong", hash);
      // 兄弟组件传递自定义事件
      this.$parent.eventBus.$emit('liClikEvent',index)
    }
  }
};
</script>

<style lang="scss">
.mint-swipe {
  height: 39vw !important;
}

.mint-swipe-indicator {
  width: 12px !important;
  height: 12px !important;
}

.mint-swipe-indicators {
  bottom: 5px !important;
}

.newsongs {
  position: relative;
  width: 100%;
  img {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }
  ul {
    padding: 0 10px;
    margin: 0;
    li {
      width: 100%;
      height: 4.0714rem;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      .songlist-item {
        float: left;
        width: 100%;
        height: 4.0714rem;
        padding-right: 2.657rem;
        line-height: 4.0714rem;
        display: table-cell;
        vertical-align: middle;
        padding-left: 0.3571rem;
        cursor: pointer;
        font-size: 1rem;
        box-sizing: border-box;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .down {
        position: absolute;
        right: 0;
        height: 4.0714rem;
        width: 1.4rem;
        background: #fff;
        .down-ico {
          margin-top: 1.5714rem;
          height: 1rem;
          width: 1rem;
          cursor: pointer;
          img {
            width: 1rem;
            height: 1rem;
          }
        }
      }
    }
  }
}
</style>
