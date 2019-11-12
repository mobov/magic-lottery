<template>
    <div class="prize-item" :class="classes">
        <div class="prize-img">
            <img :src="value.cover" :alt="value.prize" />
        </div>
        <div class="prize-text">
            <h5 class="prize-title">{{value.name}} {{value.prize}}</h5>
            <div class="prize-count">
                <div class="progress">
                    <div class="progress-bar progress-bar-danger progress-bar-striped active"
                         :style="{width: percent}">
                    </div>
                </div>
                <div class="prize-count-left">
                    {{count}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PrizeItem extends Vue {
    @Prop({ type: Object })
    value!: any

    // @Prop({ type: Boolean, default: false })
    // active!: boolean
    //
    // @Prop({ type: String, default: 'normal' })
    // status!: 'normal' | 'done' | 'active'

    get activeGame () {
      return this.$store.getters.activeGame
    }

    get status (): 'normal' | 'done' | 'active' {
      if (this.value.luckyDogs.length === this.value.total) {
        return 'done'
      } else if (this.activeGame.name === this.value.name) {
        return 'active'
      } else {
        return 'normal'
      }
    }

    get classes () {
      return {
        [`--${this.status}`]: true
      }
    }

    get count () {
      return `${this.value.total - this.value.luckyDogs.length} / ${this.value.total}`
    }

    get percent () {
      return `${((this.value.total - this.value.luckyDogs.length) / this.value.total) * 100}%`
    }
}
</script>
<style lang="scss">
  .prize-item {
    padding: 9px;
    margin: 6px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    flex-wrap: nowrap;
    /*background-color: rgba(0, 127, 127, 0.37);*/
    border: 1px solid rgba(127, 255, 255, 0.25);
    color: rgba(127, 255, 255, 0.75);
    width: 30vh;
    height: 10vh;
    box-sizing: border-box;
    transition: transform 1s ease-in;
  }

  .prize-count-left {
    position: absolute;
    color: #fff;
    right: 9px;
    font-size: 1.8vh;
    line-height: 1.6vh;
    top: 50%;
    transform: translateY(-50%);
  }

  .prize-item .prize-img {
    width: 8vh;
    height: 8vh;
    margin-right: 1.2vh;
    border-radius: 50%;
    background-color: #fff;
    text-shadow: 0 0 1vh rgba(0, 255, 255, 0.95);
    overflow: hidden;
  }

  .prize-img img {
    width: 100%;
    height: 100%;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .prize-text {
    flex: 1;
  }

  .prize-title {
    margin: 4px 0;
    font-size: 16px;
  }

  .prize-count {
    padding: 4px 0;
    position: relative;
  }

  .prize-count .progress {
    height: 1.8vh;
    background: rgba(0, 0, 0, .5);
    padding: 1px;
    overflow: visible;
    border-radius: 1vh;
  }

  .progress .progress-bar {
    /*border-radius: 16px;*/
    position: relative;
    animation: animate-positive 2s;
    background-color: #009688;
    height: 18px;
    -webkit-transition: width .6s ease;
    -o-transition: width .6s ease;
    transition: width .6s ease;
  }

  .progress-bar.active {
    animation: reverse progress-bar-stripes 0.40s linear infinite, animate-positive 2s;
  }

  .progress-bar-striped {
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    -webkit-background-size: 8px 8px;
    background-size: 8px 8px;
  }
  .prize-item {
    position: relative;
    &.--active {
      /*background-color: rgba(253, 105, 0, 0.85) !important;*/
      /*box-shadow: 0 0 12px rgba(253, 105, 0, 0.95);*/
      /*color: rgba(253, 105, 0, 0.95)*/
      /*transform: scale3d(1.1, 1.1, 0);*/
      /*width: 33vh;*/
    }
    &.--active:before,
    &.--active:after {
      color: var(--color-prize);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
      content: '';
      z-index: 1;
      margin: 0;
      box-shadow: inset 0 0 0 2px;
      /*color: #ffc000;*/
      border-radius: 4px;
      animation: clipMe 8s linear infinite;
    }

    &.--active:before {
      animation-delay: -4s;
    }
  }
  @keyframes clipMe {

    0%,
    100% {
      clip: rect(0, 30vh, 1px, 0);
    }

    25% {
      clip: rect(0, 1px, 10vh, 0);
    }

    50% {
      clip: rect(9.9vh, 30vh, 10vh, 0);
    }

    75% {
      clip: rect(0, 30vh, 10vh, 29.9vh);
    }
  }

</style>
