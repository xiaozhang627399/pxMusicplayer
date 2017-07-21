<template>
    <div class="search-wrapper">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="home" title="推荐" />
            <mu-tab value="rank" title="排行榜" />
            <mu-tab value="search" title="搜索" />
        </mu-tabs>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            activeTab: 'search  ',
        }
    },
    methods: {
        handleTabChange(val) {
            this.activeTab = val
            var _path = val
            this.$router.push({ path: _path })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mu-tab-link-highlight
    background rgba(0, 0, 0, 0.87)
</style>