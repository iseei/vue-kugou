import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jsonsong from '../json/jsonsong.json'  //本地json数据

Vue.use(Vuex)

var store = new Vuex.Store({
	state: {
		songList:[],			//播放列表（新歌list、排行list、歌单list)（详细filename、hash...）
		songIndex:0,				
		banners:[],				//轮播图	4 items
		audio: {				// ftPlay
			songUrl: '',
			imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
			songname: 'xxx',
			singer: 'xxx',
			lrc: '',
			songLength: 0,
			currentLength: 0,		//当前进度,秒
			currentFlag: false		//
		},

		isPlay: false,
		isDetailPlay: false,
		isSearch:false,

		head: {
			toggle: false,
			title: '',
			style: {'background': 'rgba(43,162,251,0)'}
		},
		headNav: 'head-nav1',
		audioLoadding: false,

		showPlayer: false,
		listenCount: 0,
	},
	getters: {
		headNav: state => state.headNav,
		audio: state => state.audio,
		head: state => state.head,
		audioLoadding: state => state.audioLoadding,
		isDetailPlay: state => state.isDetailPlay,
		showPlayer: state => state.showPlayer,
		isPlay: state => state.isPlay
	},
	mutations: {
		setAudio(state, audio){
			state.audio = {...(state.audio), ...audio}
		},
		setSongIndex(state,index){
			state.songIndex = index;
		},
		setDetailPlayer: (state, boolean) => {
			state.isDetailPlay = boolean
		},
		toggleSearch(state, boolean){
			state.isSearch = boolean
		},


		setAudioTime(state, time){
			state.audio.currentLength = time
		},
		setCurrent(state, flag){
			state.audio.currentFlag = flag
		},

		toggleAudioLoadding: (state, flag) => {
			state.audioLoadding = flag
		},

		showPlayer: (state, flag) => {
			state.showPlayer = flag
		},
		setIsPlay: (state, boolean) => {
			state.isPlay = boolean
		},
		setLrc: (state, lrc) => {
			state.audio = {...(state.audio), lrc}
		},
		setListInfo: (state, {list, index}) => {
			state.songList = list
			state.songIndex = index
		}
	},
	actions: {
		// 仅获得列表
		getSongList({dispatch, state}){
			axios.get('http://39.107.79.182:3389/mkugou/?json=true').then(({data}) => { // 解构出response.data
	  			var newsong = data.data? data :jsonsong   //判断是否网络获取列表，否则使用本地json列表
				state.banners = newsong.banner            //[] 4 items  轮播图
				state.songList = newsong.data             //[] 15 items  newsongs列表(详细)
			}).catch( () => {
				var newsong = jsonsong  
				state.banners = newsong.banner            
				state.songList = newsong.data             
			});
		  },
		//获得对应hash的歌曲信息，并更新store,更新audio会自动播放，@ended="...next"会循环播放 
		getSong({commit, state}, hash){
			// commit('toggleAudioLoadding', true)
			axios.get(`http://39.107.79.182:3389/wwwkugou/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
				// pc端   http://www.kugou.com/yy/index.php?r=play/getdata&hash=ED1AA2BD97FCDEE5F5993AAFB72370D0
				// 移动端 http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=ED1AA2BD97FCDEE5F5993AAFB72370D0
				const songUrl = data.data.play_url
				const imgUrl = data.data.img
				const songname = data.data.song_name
				const singer = data.data.author_name
				const lrc = data.data.lyrics
				const songLength = data.data.timelength / 1000
				const currentLength = 0;		//当前进度置0
				const audio = {songUrl, imgUrl, songname, singer, lrc, songLength, currentLength}
				commit('setAudio', audio)
				commit('setIsPlay',true)
				// commit('setLrc', lrc)
				// commit('toggleAudioLoadding', false)	//关闭正在载入...
			})
		},
		prev({dispatch, state}){
			if (state.songIndex == 0) {
				state.songIndex = state.songList.length - 1
			} else {
				state.songIndex--
			}
			var hash = state.songList[state.songIndex].hash
			store.commit('setIsPlay',true)
			dispatch('getSong', hash)
			// dispatch('getLrc', hash)
		},
		next({dispatch, state}){
			if (state.songIndex == state.songList.length - 1) {
				state.songIndex = 0
			} else {
				state.songIndex++
			}
			var hash = state.songList[state.songIndex].hash
			store.commit('setIsPlay',true)
			dispatch('getSong', hash)
			// dispatch('getLrc', hash)
		}
	}
})

export default store
