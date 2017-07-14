<template>
    <div class="home-wrapper">
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
            <div class="commend" v-if="commends" v-for="(commend, index) in commends" :index="index" :key="commend.id" @click="getSongListIndex(commend.id)">
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
            <div class="newSong" v-if="newSongs" v-for="(newSong, index) in newSongs" :index="index" :key="newSong.id">
                <img class="newSong-img" v-if="newSong.song.album" :src="newSong.song.album.picUrl">
                <p>{{newSong.name}}</p>
                <p v-if="newSong.song.artists">{{newSong.song.artists[0].name}}</p>
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
        if (this.banners.length === 0) {
            this.$http.get(api.banner()).then(response => {
                this.banners = response.data.banners
            }, response => {
                // error callback
            })
        }
        if (this.commends.length === 0) {
            this.$http.get(api.commend()).then(response => {
                this.commends = response.data.playlists
            }, response => {
                // error callback
            })
        }
        if (this.newSongs.length === 0) {
            this.$http.get(api.newSong()).then(response => {
                this.newSongs = response.data.result
            }, response => {
                // error callback
            })
        }
    },
    data() {
        return {
            banners: [],
            commends: [],
            newSongs: [],
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
        getSongListIndex (index) {
            this.$store.commit('getSongListId',index)
        }
    },
    components: { musicTray }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .commend
        width 50%
        height 220px
        overflow hidden
        .commend-img
            width 100%
            padding 10px 10px 0 10px
        p
            margin 0
            padding-left 10px
            font-size 12px
            color rgba(0, 0, 0, 0.87)
.newSong-wrapper
    display flex
    width 100%
    justify-content space-around
    align-items center
    flex-wrap wrap
    .newSong
        width 50%
        height 220px
        overflow hidden
        .newSong-img
            width 100%
            padding 10px 10px 0 10px
        p
            margin 0
            padding-left 10px
            font-size 12px
            color rgba(0, 0, 0, 0.87)
</style>
