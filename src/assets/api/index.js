const _baseUrl = 'http://192.168.1.8:3000/'
import axios from 'axios'

export default {
    banner () {
        return _baseUrl + 'banner'
    },
    commend () {
        return _baseUrl + 'top/playlist?limit=10&order=hot'
    },
    newSong () {
        return _baseUrl + 'personalized/newsong'
    },
    songList () {
        return _baseUrl + 'playlist/detail?id='
    }
}