import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLoading: false,
        banners: [],
        commends: [],
        newSongs: [],
        songListInfo: [],
        albumInfo: [],
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
        searchName: ''
    },
    mutations: {
        isLoading (state) {
            state.isLoading = !state.isLoading
        },
        getBanners (state, source) {
            state.banners = source
        },
        getCommends (state, source) {
            state.commends = source
        },
        getNewSongs (state, source) {
            state.newSongs = source
        },
        getSongListInfo(state, source) {
            state.songListInfo = source
        },
        getAlbumInfo(state, source) {
            state.albumInfo = source
            console.log(state.albumInfo)
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
        changeSearchName(state, source){
            state.searchName = source
        }
    }
})

export default store

