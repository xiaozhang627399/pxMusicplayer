<template>
    <div class="songList-wrapper">
    </div>
</template>

<script>
export default {
    name: 'songList',
    created () {
        console.log(this.$store.state.songListId)
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>