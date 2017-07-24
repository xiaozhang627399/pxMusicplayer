<template>
    <div class="album-wrapper">
        <div class="album-info-wrapper">
            <img class="info-background" v-if="albumInfo.album" :src="albumInfo.album.picUrl">
            <div class="info-wrapper">
                <div class="info-cover-wrapper">
                    <img v-if="albumInfo.album" :src="albumInfo.album.picUrl">
                </div>
                <div class="info-name-wrapper">
                    <p v-if="albumInfo.album">{{albumInfo.album.name}}</p>
                    <div>
                        <p v-if="albumInfo.album.artist">歌手: {{albumInfo.album.artist.name}}</p>
                        <p v-if="creatTime">发行时间: {{creatTime}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="albumList-wrapper">
            <div class="playAll-btn" v-if="albumInfo.album">
                <img src="./../../../static/play.png">
                <p>播放全部</p>
                <p>(共{{albumInfo.album.size}}首)</p>
            </div>
            <div class="albumList-content" v-if="albumInfo.songs" v-for="(song, index) in albumInfo.songs" :key="index" @click="playThisSong(index)">
                <p class="songIndex">{{index + 1}}</p>
                <div class="songName">
                    <p>{{song.name}}</p>
                    <div>
                        <img src="./../../../static/sq.png" v-if="song.h">
                        <p>
                            <span v-if="song.ar" v-for="(name, index) in song.ar" :key="index">{{name.name}}
                                <span v-if="index != song.ar.length - 1">/</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <musicTray ref="musicTray"></musicTray>
    </div>
</template>

<script>
import musicTray from './../../components/musicTray'
export default {
    name: 'album',
    created() {
    },
    data() {
        return {
            creatTime: ''
        }
    },
    methods: {
        playThisSong(index) {
            let _song = this.albumInfo.songs[index]
            var _singer = ''
            _song.ar.forEach(function (element) {
                _singer = _singer + element.name + '/'
            })
            _singer = _singer.substring(0, _singer.length - 1)
            var newSong = {
                name: _song.name,
                singer: _singer,
                album: _song.al.name,
                url: "http://link.hhtjim.com/163/" + _song.id + ".mp3",
                cover: _song.al.picUrl
            }
            this.$store.commit('creatAudio')
            this.$store.commit('addSong', newSong)
            this.$refs.musicTray.playThisSong()
        }
    },
    computed: {
        albumInfo() {
            let _publishTime = this.$store.state.albumInfo.album.publishTime
            let _creatTime = new Date(_publishTime)
            let _creatMonth = _creatTime.getMonth() + 1
            this.creatTime = _creatTime.getFullYear() + '.' + _creatMonth + '.' + _creatTime.getDate()
            return this.$store.state.albumInfo
        }
    },
    components: { musicTray }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.album-wrapper
    width 100%
    background #fafafa
    .album-info-wrapper
        position relative
        overflow hidden
        .info-background
            position absolute
            top 50px 
            left 0
            width 100%
            height 150px
            filter blur(50px) saturate(2) grayscale(0.2)
            opacity 0.5
            z-index 1    
        .info-wrapper
            display flex
            flex-wrap nowrap
            align-items center
            width 90%
            height 130px
            margin 0 auto
            overflow hidden
            .info-cover-wrapper
                width 30%
                height 90px
                z-index 10
                img
                    width 90px
                    height 90px
            .info-name-wrapper
                width 70%
                height 90px
                p
                    margin 0
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
                div
                    width 100%
                    margin-top 5px
                    p
                        margin 5px 0 0 0
                        font-size 12px
                        color #616161
                        overflow: hidden
                        white-space: nowrap
                        text-overflow: ellipsis
    .playAll-btn
        display flex
        justify-content flex-start
        align-items center
        flex-wrap nowrap
        img
            width 25px
            height 25px
            margin-left 10px
        p
            margin-left 10px    
            colro #424242
    .albumList-content
        display flex
        justify-content flex-start
        align-items center
        flex-wrap nowrap
        width 100%
        height 60px
        border-bottom 1px solid #e0e0e0
        .songIndex
            display flex
            justify-content center
            align-items center
            width 50px
            color #616161
        .songName
            display flex
            justify-content flex-start
            align-items center
            flex-wrap wrap
            width 100%
            height 40px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            p
                width 100%
                margin 0
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
            div
                display flex
                justify-content flex-start
                align-items center
                flex-wrap nowrap
                width 100%
                img
                    width 20px
                    height 17px
                    margin-right 5px
                p
                    width 100%
                    margin 0
                    color #757575
                    font-size 12px
                    line-height 17px    
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
</style>