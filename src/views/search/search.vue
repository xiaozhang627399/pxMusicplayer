<template>
    <div class="search-wrapper">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="home" title="推荐" />
            <mu-tab value="rank" title="排行榜" />
            <mu-tab value="search" title="搜索" />
        </mu-tabs>
        <div class="search-input-wrapper">
            <mu-text-field label="输入歌曲/歌手/专辑" v-model="searchName" @change="search" labelFloat/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {
            activeTab: 'search',
            searchName: ''
        }
    },
    methods: {
        search() {
            if(this.searchName){
            this.$store.commit('changeSearchName', this.searchName)
            this.$router.push({ path: 'searchList' })
            }
            else {
                alert('请输入搜索信息')
            }
        },
        handleTabChange(val) {
            this.activeTab = val
            var _path = val
            this.$router.push({ path: _path })
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
body 
    background #fafafa
.search-wrapper
    width 100%
    .search-input-wrapper
        display flex
        justify-content center
        align-items center
        width 100%
        margin-top 10%
</style>