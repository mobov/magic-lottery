<template>
  <div id="app">
    <banner v-if="ready"></banner>
    <background />
    <prize-wheel v-if="ready" />
    <prize-lists v-if="ready" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PrizeWheel from '@/views/PrizeWheel.vue'
import Background from '@/views/Background.vue'
import PrizeLists from '@/views/PrizeLists.vue'
import Banner from '@/views/Banner.vue'

@Component({
  components: {
    Banner,
    Background,
    PrizeWheel,
    PrizeLists
  }
})
export default class App extends Vue {
  ready = false
  async created () {
    await this.$store.dispatch('initGame')
    this.ready = true
  }
  readExcel () {

  }
  mounted () {
  }
}
</script>

<style lang="scss">
#app {
  background: black;
}
</style>
