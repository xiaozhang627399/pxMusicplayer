<template>
  <div id="app">
    <mu-appbar title="PXmusicPlayer" style="height:50px;background:white;color:#757575">
      <mu-icon-button icon="menu" slot="left" @click="open('left')" />
    </mu-appbar>
    <mu-popup position="left" popupClass="popup-left" :open="leftPopup" @close="close('left')">
    </mu-popup>
    <router-view></router-view>
    <loading></loading>
  </div>
</template>

<script>
import loading from './components/loading'
export default {
  name: 'app',
  data() {
    return {
      leftPopup: false,
    }
  },
  methods: {
    open(position) {
      this[position + 'Popup'] = true
    },
    close(position) {
      this[position + 'Popup'] = false
    }
  },
  components: { loading }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
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
