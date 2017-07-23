<template>
    <div class="loading-wrapper" v-if="isLoading">
        <div class="loading">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <P>正在全力加载</P>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading
        }
    }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.loading-wrapper
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background white
    z-index 1999
    p
        width 100%
        text-align center
        font-size 13px
    .loading
        width 100px
        height 20px
        margin 0 auto
        margin-top 100px
        text-align center
        span
            display inline-block;
            width 10px
            height 100%
            border-radius 4px
            background #212121
            -webkit-animation load 0.7s ease infinite
        @-webkit-keyframes load
            0%,100%
                height 20px
                background #212121
            
            50%
                height 30px
                margin -5px 0
                background #757575
    .loading span:nth-child(2)
        -webkit-animation-delay:0.1s
    .loading span:nth-child(3)
        -webkit-animation-delay:0.2s
    .loading span:nth-child(4)
        -webkit-animation-delay:0.3s
    .loading span:nth-child(5)
        -webkit-animation-delay:0.4s
    .loading span:nth-child(5)
        -webkit-animation-delay:0.5s
    .loading span:nth-child(5)
        -webkit-animation-delay:0.6s
</style>