import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store ({
    state: {
        songListId: ''
    },
    mutations: {
        getSongListId(state, index) {
            state.songListId = index
        }
    }
})

export default store

