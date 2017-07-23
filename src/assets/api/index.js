const _baseUrl = 'http://192.168.1.7:3000/'
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
    },
    search (source, index, offset) {
        if(index === 'songs') {
            return _baseUrl + 'search?limit=20&offset=' + offset +'&type=1&keywords=' + source
        }
        else if(index === 'albums') {
            return _baseUrl + 'search?limit=20&offset=' + offset +'&type=10&keywords=' + source
        }
        else if (index === 'singers') {
            return _baseUrl + 'search?limit=20&offset=' + offset +'&type=100&keywords=' + source
        }
        else if (index === 'songLists') {
            return _baseUrl + 'search?limit=20&offset=' + offset +'&type=1000&keywords=' + source
        }
    }
}