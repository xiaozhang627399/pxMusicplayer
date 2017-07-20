<template>
    <div class="musicTray-wrapper">
        <div class="info-wrapper" @click="toggleDetail">
            <div class="cover-wrapper">
                <img :src="playList[playIndex].cover">
            </div>
            <div class="name-wrapper">
                <p>{{playList[playIndex].name}}</p>
                <p>{{playList[playIndex].singer}}</p>
            </div>
        </div>
        <div class="control-wrapper">
            <div class="play-btn" @click="play">
                <img :src="'./../../static/' + isPlaying + '.png'">
            </div>
            <div class="playList-btn" @click="toggleMusicList">
                <img src="./../../static/playlist.png">
            </div>
        </div>
        <mu-popup position="bottom" popupClass="popup-bottom" :open="isPlayList" @close="toggleMusicList">
            <div class="playList-wrapper">
                <div class="playList-bar">
                    <div>
                        <img src="./../../static/playlist(1).png">
                        <p>播放列表</p>
                    </div>
                    <div>
                        <img src="./../../static/delete.png">
                        <p>清空</p>
                    </div>
                </div>
                <div class="playList-item" v-for="(song, index) in playList" :key="index" @click="playThisSong(index)">
                    <p>{{song.name}}-
                        <span>{{song.singer}}</span>
                    </p>
                </div>
            </div>
        </mu-popup>
        <mu-popup position="bottom" popupClass="playDetail" :open="isDetail" @close="toggleDetail">
            <div class="detail-wrapper">
                <div class="detailCover-wrapper">
                    <img class="detailClose-btn" @click="toggleDetail" src="./../../static/arrow-down.png">
                    <img class="detailCover" :src="playList[playIndex].cover">
                </div>
                <div class="detailInfo-wrapper">
                    <p>{{playList[playIndex].name}}</p>
                    <p>{{playList[playIndex].singer}}</p>
                </div>
                <div class="detailProcess-wrapper">
                    <div class="detailProcss">
                    </div>
                </div>
                <div class="detailControl-wrapper">
                    <div>
                        <img src="./../../static/like.png">
                    </div>
                    <div>
                        <img src="./../../static/prev.png" @click="prevSong">
                    </div>
                    <div @click="play">
                        <img :src="'./../../static/' + isPlaying + '(1).png'">
                    </div>
                    <div>
                        <img src="./../../static/next.png" @click="nextSong">
                    </div>
                    <div @click="toggleMusicList">
                        <img src="./../../static/playlist.png">
                    </div>
                </div>
            </div>
        </mu-popup>
    </div>
</template>

<script>
export default {
    name: 'musicTray',
    data() {
        return {
            playIndex: 0,
            audio: '',
            isPlayList: false,
            isDetail: false,
            playList: [
                {
                    name: "无法长大",
                    singer: "赵雷",
                    album: "无法长大",
                    url: "http://link.hhtjim.com/163/437608773.mp3",
                    cover: "http://p1.music.126.net/zy9EZ2dcsofYlVAn-nb-wA==/3412884129074161.jpg"
                }
            ]
        }
    },
    created() {
        var that = this
        setInterval(function () {
            if (that.playList[that.playIndex] && that.isAudio === 0) {
                var audio = document.createElement("audio")
                audio.src = that.playList[that.playIndex].url
                that.$store.commit('audio', audio)
                that.$store.commit('creatAudio')
            }
        }, 50)
        if (that.isAudio === 1) {
            this.playList = this.$store.state.songList
            this.playIndex = this.$store.state.songIndex
        }
    },
    methods: {
        play() {
            var audio = this.$store.state.audio
            if (this.isPlaying === 'play') {
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
            else {
                audio.pause()
                this.isPlaying = 'play'
                this.$store.commit('isPlaying', 'play')
            }
        },
        playThisSong(index) {
            if (index != undefined) {
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                this.playIndex = index
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('audio', audio)
                this.$store.commit('changeSongIndex', index)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
                this.toggleMusicList()
            }
            else {
                this.playList = this.$store.state.songList
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                this.playIndex = this.$store.state.songIndex
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('audio', audio)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
        },
        nextSong() {
            if (this.playIndex + 2 <= this.playList.length) {
                this.playIndex = this.playIndex + 1
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('changeSongIndex', this.playIndex)
                this.$store.commit('audio', audio)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
            else {
                this.playIndex = 0
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('changeSongIndex', this.playIndex)
                this.$store.commit('audio', audio)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
        },
        prevSong() {
            if (this.playIndex - 1 >= 0) {
                this.playIndex = this.playIndex - 1
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('changeSongIndex', this.playIndex)
                this.$store.commit('audio', audio)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
            else {
                this.playIndex = this.playList.length - 1
                var audio = this.$store.state.audio
                audio.pause()
                var audio = document.createElement("audio")
                audio.src = this.playList[this.playIndex].url
                this.$store.commit('changeSongIndex', this.playIndex)
                this.$store.commit('audio', audio)
                audio.play()
                this.isPlaying = 'pause'
                this.$store.commit('isPlaying', 'pause')
            }
        },
        toggleMusicList() {
            this.isPlayList = !this.isPlayList
        },
        toggleDetail() {
            this.isDetail = !this.isDetail
        }
    },
    computed: {
        isAudio() {
            return this.$store.state.isAudio
        },
        isPlaying() {
            return this.$store.state.isPlaying
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.playDetail
    height 100%
.musicTray-wrapper
    display flex
    justify-content space-between
    align-items center
    flex-wrap nowrap
    position fixed
    bottom 0
    width 100%
    height 55px
    background white
    .info-wrapper
        display flex
        justify-content flex-start
        align-items center
        width 75%
        height 45px
        margin-left 10px
        .cover-wrapper
            width 40px
            height 40px
            img
                width 100%
                height 100%
        .name-wrapper
            display flex
            justify-content center
            align-items center
            flex-wrap wrap
            margin-left 10px
            width 65%
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            p
                width 100%
                height 19px
                margin 0
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
            p:first-child
                font-size 13px
            p:last-child
                font-size 11px
                color #616161        
    .control-wrapper
        display flex
        justify-content center
        align-items center
        width 25%
        .play-btn
            display flex
            justify-content center
            align-items center
            width 30px
            height 30px
            margin-right 15px
            img
                width 100%
                height 100%
        .playList-btn
            display flex
            justify-content center
            align-items center
            width 25px
            height 25px
            margin-right 10px
            img
                width 100%
                height 100%
.mu-popup
    width 100%
    .playList-wrapper
        width 100%
        max-height 440px
        overflow-y auto
        .playList-bar
            display flex
            justify-content space-between
            align-items center
            flex-wrap nowrap
            width 100%
            height 40px
            border-bottom 1px solid #e0e0e0
            div 
                display flex
                align-items center
                flex-wrap nowrap
                width 100%
                img
                    width 16px
                    height 16px
                p
                    margin 0
                    font-size 13px
                    color black
            div:first-child
                justify-content flex-start
                img
                    margin-left 5px
                p
                    margin-left 5px
            div:last-child
                justify-content flex-end
                img
                    margin-right 5px
                p
                    margin-right 5px
        .playList-item
            display flex
            justify-content space-between
            align-items center
            flex-wrap nowrap
            width 100%
            height 40px
            border-bottom 1px solid #e0e0e0
            p
                width 100%
                margin-left 5px
                font-size 13px
                color black
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
                span
                    font-size 12px
                    color #616161
    .detail-wrapper
        width 100%
        height 100%
        background #fafafa
        .detailCover-wrapper
            display flex
            justify-content center
            align-items center
            flex-wrap nowrap
            width 100%
            height 60%
            img
                width 100%
                height 100%
            .detailClose-btn
                position absolute
                top 5px
                right 5px
                width 30px
                height 30px
        .detailInfo-wrapper
            position absolute
            bottom 150px
            width 100%
            display flex
            justify-content center
            align-items center
            flex-wrap wrap
            p
                width 100%
                margin 0
                text-align center
            p:first-child
                font-size 16px
                color black
            p:last-child
                margin-top 10px
                font-size 15px
        .detailProcess-wrapper
            position absolute
            bottom 100px
            width 100%
            height 3px
            margin-top 10%
            .detailProcss
                width 80%
                height 3px
                margin 0 auto
                background #616161
        .detailControl-wrapper
            display flex
            position absolute
            bottom 20px
            width 100%
            justify-content space-around
            align-items center
            flex-wrap nowrap
            div
                width 25px
                height 25px
                img
                    width 100%
                    height 100%
</style>