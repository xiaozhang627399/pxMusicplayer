<template>
    <div class="home-wrapper">
        <mu-tabs :value="activeTab" @change="handleTabChange" style="background:white;color:#757575">
            <mu-tab value="home" title="推荐" style="color:rgb(117, 117, 117)" />
            <mu-tab value="rank" title="排行榜" style="color:rgb(117, 117, 117)" />
            <mu-tab value="search" title="搜索" style="color:rgb(117, 117, 117)" />
        </mu-tabs>
        <swiper :options="swiperOption" class="swiper-box">
            <swiper-slide class="swiper-item" v-if="banners" v-for="(banner, index) in banners" :index="index" :key="banner.targetId">
                <img class="swiper-img" v-if="banner" v-bind:src="banner.pic">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="cate-lable">
            <p>推荐歌单</p>
        </div>
        <div class="commend-wrapper">
            <div class="commend" v-if="commends" v-for="(commend, index) in commends" :index="index" :key="commend.id" @click="getSongListIndex(index)">
                <router-link to='/songList'>
                    <img class="commend-img" v-if="commend" :src="commend.coverImgUrl">
                    <p>{{commend.name}}</p>
                </router-link>
            </div>
        </div>
        <div class="cate-lable">
            <p>最新专辑</p>
        </div>
        <div class="newSong-wrapper">
            <div class="newSong" v-if="newSongs" v-for="(newSong, index) in newSongs" :index="index" :key="newSong.id" @click="getAlbumIndex(index)">
                <router-link to='/album'>
                    <img class="newSong-img" v-if="newSong.song.album" :src="newSong.song.album.picUrl">
                    <p>{{newSong.name}}</p>
                    <p v-if="newSong.song.artists">{{newSong.song.artists[0].name}}</p>
                </router-link>
            </div>
        </div>
        <musicTray></musicTray>
    </div>
</template>

<script>
import api from './../../assets/api/index'
import musicTray from './../../components/musicTray'
export default {
    created() {
        if (this.$store.state.banners.length === 0) {
            this.$store.commit('isLoading')
            this.$http.get(api.banner()).then(response => {
                this.banners = response.data.banners
                this.$store.commit('getBanners', response.data.banners)
                this.$store.commit('isLoading')
            }, response => {
                // error callback
            })
        }
        else {
            this.banners = this.$store.state.banners
        }
        if (this.$store.state.commends.length === 0) {
            this.$store.commit('isLoading')
            this.$http.get(api.commend()).then(response => {
                this.commends = response.data.playlists
                this.$store.commit('getCommends', response.data.playlists)
                this.$store.commit('isLoading')
            }, response => {
                // error callback
            })
        }
        else {
            this.commends = this.$store.state.commends
        }
        if (this.$store.state.newSongs.length === 0) {
            this.$store.commit('isLoading')
            this.$http.get(api.newSong()).then(response => {
                this.newSongs = response.data.result
                this.$store.commit('getNewSongs', response.data.result)
                this.$store.commit('isLoading')
            }, response => {
                // error callback
            })
        }
        else {
            this.newSongs = this.$store.state.newSongs
        }
    },
    data() {
        return {
            banners: [],
            commends: [],
            newSongs: [],
            activeTab: 'home',
            swiperOption: {
                pagination: '.swiper-pagination',
                direction: 'horizontal',
                slidesPerView: 1,
                paginationClickable: true,
                spaceBetween: 30,
                mousewheelControl: true,
                height: 150,
                autoplay: 3000
            }
        }
    },
    methods: {
        getSongListIndex(index) {
            let songListInfo = []
            songListInfo.id = this.commends[index].id
            songListInfo.trackCount = this.commends[index].trackCount
            songListInfo.subscribedCount = this.commends[index].subscribedCount
            songListInfo.commentCount = this.commends[index].commentCount
            songListInfo.shareCount = this.commends[index].shareCount
            songListInfo.coverImgUrl = this.commends[index].coverImgUrl
            songListInfo.description = this.commends[index].description
            songListInfo.name = this.commends[index].name
            this.$store.commit('isLoading')
            this.$http.get(api.songList() + this.commends[index].id).then(response => {
                songListInfo.tracks = response.data.playlist.tracks
                songListInfo.creator = response.data.playlist.creator
                this.$store.commit('getSongListInfo', songListInfo)
                this.$store.commit('isLoading')
            }, response => {
                // error callback
            })
        },
        getAlbumIndex(index) {
            this.$store.commit('isLoading')
            this.$http.get(api.album() + this.newSongs[index].song.album.id).then(response => {
                this.$store.commit('getAlbumInfo', response.data)
                this.$store.commit('isLoading')
            }, response => {
                // error callback
            })
            // let _id = 
        },
        handleTabChange(val) {
            this.activeTab = val
            var _path = val
            this.$router.push({ path: _path })
        }
    },
    components: { musicTray }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body 
    background #fafafa
.swiper-wrapper
    width 100%
    height 150px
.swiper-item
    width 100%
.swiper-img
    width 100%
    height 150px
.cate-lable
    display flex
    width 20%
    height 40px
    float left
    margin 10px 0
    justify-content flex-start
    align-items center
    background #9e9e9e
    border-bottom-right-radius 50%
    box-shadow 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 60px rgba(0, 0, 0, 0.06) inset
    p
        padding-left 8px
        font-size 14px
        color white
.commend-wrapper
    display flex
    width 100%
    justify-content space-around
    align-items center
    flex-wrap wrap
    background #fafafa
    .commend
        width 50%
        height 220px
        overflow hidden
        background #fafafa
        .commend-img
            width 100%
            padding 10px 10px 0 10px
        p
            width 100%
            margin 0
            padding-left 10px
            font-size 12px
            color rgba(0, 0, 0, 0.87)
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
.newSong-wrapper
    display flex
    width 100%
    justify-content space-around
    align-items center
    flex-wrap wrap
    background #fafafa
    .newSong
        width 50%
        height 240px
        overflow hidden
        background #fafafa
        .newSong-img
            width 100%
            padding 10px 10px 0 10px
        p
            width 100%
            margin 0
            padding-left 10px
            font-size 12px
            color rgba(0, 0, 0, 0.87)
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
.mu-tab-link-highlight
    background #757575 !important
</style>
