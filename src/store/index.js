import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    // 播放列表
    playList: [],
    playIndex: 0,
    // 当前播放
    audio: {
      songUrl: '',
      imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      songname: 'xxx',
      singer: 'xxx',
      lrc: '',
      songLength: 0,
      currentLength: 0, 	//当前进度,秒
      currentFlag: false 	//
    },
    // 其他状态
    isPlay: false,
    isDetailPlay: false,
    isShowPlayer:false,
    isSearch: false,
  },
  getters: {
    audio: state => state.audio,
    isDetailPlay: state => state.isDetailPlay,
    isPlay: state => state.isPlay,
  },
  mutations: {
    setPlayList(state, playList) {
      state.playList = playList
    },
    setPlayIndex(state, index) {
      state.playIndex = index
    },
    setAudio(state, audio) {
      state.audio = { ...(state.audio),
        ...audio
      }
    },
    setIsPlay: (state, boolean) => {
      state.isPlay = boolean
    },
    toggleSearch(state, boolean) {
      state.isSearch = boolean
    },
    setDetailPlayer: (state, boolean) => {
      state.isDetailPlay = boolean
    },
    setIsShowPlayer:(state,boolean) => {
      state.isShowPlayer = boolean
    },
    setAudioTime(state, time) {
      state.audio.currentLength = time
    },
    setCurrent(state, flag) {
      state.audio.currentFlag = flag
    },
    setLrc: (state, lrc) => {
      state.audio = { ...(state.audio),  lrc }
    },
  },
  actions: {
    //获得对应hash的歌曲信息，并更新store,更新audio会自动播放，@ended="...next"会循环播放 
    getSong({ commit, state }, hash) {
      axios.get(`http://39.107.79.182:3389/wwwkugou/yy/index.php?r=play/getdata&hash=${hash}`).then(({
        data
      }) => {
        // pc端   http://www.kugou.com/yy/index.php?r=play/getdata&hash=ED1AA2BD97FCDEE5F5993AAFB72370D0
        // 移动端 http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=ED1AA2BD97FCDEE5F5993AAFB72370D0
        const songUrl = data.data.play_url
        const imgUrl = data.data.img
        const songname = data.data.song_name
        const singer = data.data.author_name
        const lrc = data.data.lyrics
        const songLength = data.data.timelength / 1000
        const currentLength = 0; //当前进度置0
        const audio = {
          songUrl,
          imgUrl,
          songname,
          singer,
          lrc,
          songLength,
          currentLength
        }
        commit('setIsShowPlayer',true)
        commit('setAudio', audio)
        commit('setIsPlay', true)
        // commit('setLrc', lrc)
      })
    },
    prev({ dispatch,state }) {
      if (state.playIndex == 0) {
        state.playIndex = state.playList.length - 1
      } else {
        state.playIndex--
      }
      var hash = state.playList[state.playIndex].hash
      store.commit('setIsPlay', true)
      dispatch('getSong', hash)
      // dispatch('getLrc', hash)
    },
    next({ dispatch, state }) {
      if (state.playIndex == state.playList.length - 1) {
        state.playIndex = 0
      } else {
        state.playIndex++
	  }
	  console.log
      var hash = state.playList[state.playIndex].hash
      store.commit('setIsPlay', true)
      dispatch('getSong', hash)
      // dispatch('getLrc', hash)
    }
  }
})

export default store
