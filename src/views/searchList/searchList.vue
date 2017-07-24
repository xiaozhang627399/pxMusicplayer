<template>
    <div class="searchList-wrapper">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="songs" title="歌曲" />
            <mu-tab value="albums" title="专辑" />
            <mu-tab value="singers" title="歌手" />
            <mu-tab value="songLists" title="歌单" />
        </mu-tabs>
        <div v-if="activeTab === 'songs'">
            <div class="song-wrapper">
                <div class="song-content" v-for="(song, index) in songs" :key="index" @click="playThisSong(index)">
                    <div class="song-name">
                        <p>{{song.name}}</p>
                        <img v-if="song.mvid" src="./../../../static/mv.png">
                    </div>
                    <div class="song-info">
                        <img v-if="song.hMusic" src="./../../../static/sq.png">
                        <p>{{song.artists[0].name}}-{{song.album.name}}</p>
                    </div>
                    <div v-if="song.alias.length" class="song-alias">
                        <p>{{song.alias[0]}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="activeTab === 'songLists'">
            <div class="songList-wrapper">
                <div class="songList-content" v-for="(songList, index) in songLists" :key="index" @click="getSongListIndex(index)">
                    <div class="songList-img">
                        <img :src="songList.coverImgUrl">
                    </div>
                    <div class="songList-info-wrapper">
                        <p class="songList-name">{{songList.name}}</p>
                        <p class="songList-info" v-if="songList.creator">{{songList.trackCount}} by {{songList.creator.nickname}}，播放{{songList.playCount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="activeTab === 'albums'">
            <div class="album-wrapper">
                <div class="album-content" v-for="(album, index) in albums" :key="index" @click="getAlbumIndex(index)">
                    <div class="album-img">
                        <img :src="album.picUrl">
                    </div>
                    <div class="album-info-wrapper">
                        <p class="album-name">{{album.name}}</p>
                        <p class="album-info" v-if="album.artist">{{album.artist.name}}</p>
                    </div>
                </div>
            </div>
        </div>
        <musicTray ref="musicTray"></musicTray>
    </div>
</template>

<script>
import api from './../../assets/api/index'
import musicTray from './../../components/musicTray'
export default {
    name: 'searchList',
    created() {
        this._searchName = this.$store.state.searchName
        this.$store.commit('isLoading')
        this.$http.get(api.search(this._searchName, 'songs', this.offset)).then(response => {
            this.songs = response.data.result.songs
            this.$store.commit('isLoading')
        })
    },
    data() {
        return {
            _searchName: '',
            offset: 0,
            activeTab: 'songs',
            songs: [],
            songLists: [],
            albums: []
        }
    },
    methods: {
        playThisSong(index) {
            let _song = this.songs[index]
            var _singer = ''
            _song.artists.forEach(function (element) {
                _singer = _singer + element.name + '/'
            })
            _singer = _singer.substring(0, _singer.length - 1)
            var newSong = {
                name: _song.name,
                singer: _singer,
                album: _song.album.name,
                url: "http://link.hhtjim.com/163/" + _song.id + ".mp3",
                cover: _song.album.picUrl
            }
            this.$store.commit('creatAudio')
            this.$store.commit('addSong', newSong)
            this.$refs.musicTray.playThisSong()
        },
        getSongListIndex(index) {
            let _id = this.songLists[index].id
            this.$store.commit('isLoading')
            this.$http.get(api.songList() + _id).then(response => {
                let _songListInfo = response.data.playlist
                let songListInfo = []
                songListInfo.id = _songListInfo.id
                songListInfo.trackCount = _songListInfo.trackCount
                songListInfo.subscribedCount = _songListInfo.subscribedCount
                songListInfo.commentCount = _songListInfo.commentCount
                songListInfo.shareCount = _songListInfo.shareCount
                songListInfo.coverImgUrl = _songListInfo.coverImgUrl
                songListInfo.description = _songListInfo.description
                songListInfo.name = _songListInfo.name
                songListInfo.creator = response.data.playlist.creator
                songListInfo.tracks = _songListInfo.tracks
                this.$store.commit('getSongListInfo', songListInfo)
                this.$router.push({ path: 'songList' })
                console.log(songListInfo)
                this.$store.commit('isLoading')
            })
        },
        getAlbumIndex(index) {
            this.$store.commit('isLoading')
            this.$http.get(api.album() + this.albums[index].id).then(response => {
                this.$store.commit('getAlbumInfo', response.data)
                this.$store.commit('isLoading')
                this.$router.push({ path: 'album' })
            })
        },
        handleTabChange(val) {
            this.activeTab = val
            if (val === 'songLists') {
                if (this.songLists.length === 0) {
                    this.$store.commit('isLoading')
                    this.$http.get(api.search(this._searchName, val, this.offset)).then(response => {
                        this.songLists = response.data.result.playlists
                        this.$store.commit('isLoading')
                    })
                }
            }
            else if (val === 'albums') {
                if (this.albums.length === 0) {
                    this.$store.commit('isLoading')
                    this.$http.get(api.search(this._searchName, val, this.offset)).then(response => {
                        this.albums = response.data.result.albums
                        this.$store.commit('isLoading')
                    })
                }
            }
        }
    },
    components: { musicTray }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body 
    background #fafafa
.song-wrapper
    width 100%
    .song-content
        width 100%
        margin 10px 0 0 5px
        padding-bottom 10px
        border-bottom 1px solid #e0e0e0
        .song-name
            display flex
            justify-content flex-start
            align-items center
            flex-wrap nowrap
            width 100%
            img
                width 20px
                height 20px
            p
                margin 0
                font-size 14px
                color black
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
        .song-info
            display flex
            justify-content flex-start
            align-items center
            flex-wrap nowrap
            img
                width 18px
                height 18px
                margin-right 5px
            p
                width 100%
                margin 0
                font-size 12px
                color #424242
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
        .song-alias
            p
                width 100%
                margin 0
                font-size 13px
                color #424242
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
.songList-wrapper
    width 100%
    .songList-content
        width 100%
        height 60px
        margin 10px 0 0 5px
        padding-bottom 10px
        border-bottom 1px solid #e0e0e0
        .songList-img
            display flex
            width 50px
            height 50px
            justify-content center
            align-items center
            float left
            img
                width 50px
                height 50px
        .songList-info-wrapper
            width 100%
            height 50px
            .songList-name
                width 70%
                margin 0
                padding-left 2%
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                font-size 14px
            .songList-info
                width 70%
                margin 10px 0 0 0 
                padding-left 2%
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                font-size 12px
                color #616161
.album-wrapper
    width 100%
    .album-content
        width 100%
        height 60px
        margin 10px 0 0 5px
        padding-bottom 10px
        border-bottom 1px solid #e0e0e0
        .album-img
            display flex
            width 50px
            height 50px
            justify-content center
            align-items center
            float left
            img
                width 50px
                height 50px
        .album-info-wrapper
            width 70%
            height 50px
            .album-name
                width 70%
                margin 0
                padding-left 2%
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                font-size 14px
            .album-info
                width 70%
                margin 10px 0 0 0 
                padding-left 2%
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                font-size 12px
                color #616161
</style>