<template>
    <div class="musicTray-wrapper">
        <div class="info-wrapper">
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
            <div class="playList-btn">
                <img src="./../../static/playlist.png">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'musicTray',
    data() {
        return {
            playIndex: 0,
            audio: '',
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
        playThisSong() {
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
    computed: {
        isAudio () {
            return this.$store.state.isAudio
        },
        isPlaying () {
            return this.$store.state.isPlaying
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>