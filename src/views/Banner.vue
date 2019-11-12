<template>
  <div class="banner">
    <div class="title">
      {{title}}
    </div>
    <div>
      <img v-if="logo" class="logo" :src="logo" alt="logo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Banner extends Vue {
  // get content () {
  //   return this.title.split('')
  // }
  get logo () {
    return this.$store.state.Setting.logo
  }

  get title () {
    return this.$store.state.Text.title
  }

  animation () {

  }
}
</script>
<style lang="scss">
  .banner {
    padding-top: 10px;
    width: 60vw;
    min-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    position: fixed;
    left: 20vw;
    top: 0;
    color: var(--color-prize);
    font-size: 30px;
    z-index: 3;
    /*background: black;*/
    .title {
      /*color: red;*/
      color: white;
      text-align: center;
      border-radius: 50%;
      text-shadow: 0 0 5px orange, 1px 1px 5px orange, 2px 2px 5px orange, -1px -1px 5px orange, -2px -2px 5px orange;
      margin-bottom: 10px;
    }
    .logo {
      height: 80px;
      width: auto;
    }
  }
  .glow{
    opacity: 0;
    font-family: 'Arvo', serif;
    font-weight: 300;
    color: orange;
    margin-left: -222.5px;
    font-size: 105px;
    position: absolute;
    top: 200px;
    left: 50%;
  }
</style>
