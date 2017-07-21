import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        songListInfo: [],
        isAudio: 0,
        audio: '',
        songList: [
            {
                name: "无法长大",
                singer: "赵雷",
                album: "无法长大",
                url: "http://link.hhtjim.com/163/437608773.mp3",
                cover: "http://p1.music.126.net/zy9EZ2dcsofYlVAn-nb-wA==/3412884129074161.jpg"
            }
        ],
        songIndex: '0',
        isPlaying: 'play',
        playProgress: 0
    },
    mutations: {
        getSongListInfo(state, source) {
            state.songListInfo = source
        },
        creatAudio(state) {
            state.isAudio = 1
        },
        audio(state, source) {
            state.audio = source
        },
        addSong (state, source) {
            state.songList.push(source)
            state.songIndex = state.songList.length - 1
        },
        isPlaying (state, source) {
            state.isPlaying = source
        },
        changeSongIndex(state, source){
            state.songIndex = source
        },
        changeProgress(state, source){
            state.playProgress = source
        }
    }
})

export default store

