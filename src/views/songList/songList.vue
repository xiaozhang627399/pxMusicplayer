<template>
    <div class="songList-wrapper">
        <div class="songList-info-wrapper">
            <img class="info-background" :src="songListInfo.coverImgUrl">
            <div class="info-wrapper">
                <div class="info-cover-wrapper">
                    <img class="info-cover-img" :src="songListInfo.coverImgUrl" cross-origin="anonymous">
                </div>
                <div class="info-name-wrapper">
                    <p>{{songListInfo.name}}</p>
                    <div class="info-name-creator">
                        <img v-if="songListInfo.creator" :src="songListInfo.creator.avatarUrl">
                        <p v-if="songListInfo.creator">{{songListInfo.creator.nickname}}</p>
                    </div>
                </div>
            </div>
            <div class="info-btn-wrapper">
                <div>
                    <img src="./../../../static/add.png">
                    <p>{{songListInfo.subscribedCount}}</p>
                </div>
                <div>
                    <img src="./../../../static/comments_tool.png">
                    <p>{{songListInfo.commentCount}}</p>
                </div>
                <div>
                    <img src="./../../../static/share.png">
                    <p>{{songListInfo.shareCount}}</p>
                </div>
                <div>
                    <img src="./../../../static/download.png">
                    <p>下载</p>
                </div>
            </div>
        </div>
        <div class="playAll-btn">
            <img src="./../../../static/play.png">
            <p>播放全部</p>
            <p>(共{{songListInfo.trackCount}}首)</p>
        </div>
        <div class="songList-content" v-if="songListInfo.tracks" v-for="(song, index) in songListInfo.tracks" :key="song.id" @click="playThisSong(index)">
            <div class="songIndex">
                <p>{{index + 1}}</p>
            </div>
            <div class="songName">
                <p>{{song.name}}</p>
                <div class="singerName">
                    <img v-if="song.h" src="./../../../static/sq.png">
                    <p v-if="song.ar && song.al">{{song.ar[0].name}}-{{song.al.name}}</p>
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
    name: 'songList',
    created() {
    },
    data() {
        return {
            songLists: []
        }
    },
    methods: {
        playThisSong(index) {
            let _song = this.songListInfo.tracks[index]
            var _singer = ''
            _song.ar.forEach(function(element) {
                _singer = _singer + element.name + '/'   
            })
            _singer = _singer.substring(0,_singer.length-1)
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
        songListInfo() {
            return this.$store.state.songListInfo
        }
    },
    components: {
        musicTray
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.material-icons.md-18
    font-size 24px
.songList-wrapper
    position relative
    width 100%
    background #fafafa
    .songList-info-wrapper
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
                float left
                height 90px
                width 60%
                margin-left 20px
                p
                    margin 0
                    width 100%
                    font-size 14px
                .info-name-creator
                    display flex
                    justify-content flex-start
                    align-items center
                    margin-top 10px
                    img
                        float left
                        width 30px
                        height 30px
                        border-radius 50%
                        margin-right 20px
                    p
                        width 70%    
        .info-btn-wrapper
            display flex
            justify-content space-around
            align-items center
            flex-wrap nowrap
            div
                display flex
                justify-content center
                align-items center
                flex-wrap wrap
                width 25%
                img
                    width 20px
                    height 20px
                p
                    width 100%
                    text-align center
                    font-size 12px
                    color #757575
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
    .songList-content
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