<template>
  <div id="app">
    <mu-appbar title="PXmusicPlayer">
      <mu-icon-button icon="menu" slot="left" @click="open('left')" />
    </mu-appbar>
    <mu-popup position="left" popupClass="popup-left" :open="leftPopup" @close="close('left')">
    </mu-popup>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="home" title="推荐" />
      <mu-tab value="rank" title="排行榜" />
      <mu-tab value="search" title="搜索" />
    </mu-tabs>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      leftPopup: false,
      activeTab: 'home'
    }
  },
  methods: {
    open(position) {
      this[position + 'Popup'] = true
    },
    close(position) {
      this[position + 'Popup'] = false
    },
    handleTabChange(val) {
      this.activeTab = val
      var _path = val
      this.$router.push({path: _path})
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.mu-appbar
    background white
    color #757575
.mu-tabs
    background white
.mu-tab-link
    color #757575
.mu-tab-link-highlight
    background #424242
    height 1px
.popup-left
    display flex
    width 50%
    max-width 375px
    height 100%
    align-items center
    padding 24px
</style>
