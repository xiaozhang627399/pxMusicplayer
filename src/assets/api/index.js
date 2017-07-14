const _baseUrl = 'http://127.0.0.1:3000/'
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
    }
}