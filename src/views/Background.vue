<template>
  <canvas class="background">
  </canvas>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Background extends Vue {
  draw () {
    const canvas: HTMLCanvasElement = this.$el as HTMLCanvasElement
    const c: any = canvas.getContext('2d')

    let numStars = 1500
    let radius = '0.' + Math.floor(Math.random() * 9) + 1
    let focalLength = canvas.width * 2
    let warp = 0
    let centerX = 0
    let centerY = 0
    let stars: any[] = []
    let star: any = null
    let i = 0
    let animate = true

    initializeStars()

    function executeFrame () {
      if (animate) {
        requestAnimationFrame(executeFrame)
      }
      moveStars()
      drawStars()
    }

    function initializeStars () {
      centerX = canvas.width / 2
      centerY = canvas.height / 2

      stars = []
      for (i = 0; i < numStars; i++) {
        star = {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * canvas.width,
          o: '0.' + Math.floor(Math.random() * 99) + 1
        }
        stars.push(star)
      }
    }

    function moveStars () {
      for (i = 0; i < numStars; i++) {
        star = stars[i]
        star.z--

        if (star.z <= 0) {
          star.z = canvas.width
        }
      }
    }

    function drawStars () {
      var pixelX, pixelY, pixelRadius

      // Resize to the screen
      if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        initializeStars()
      }
      if (warp === 0) {
        c.fillStyle = 'rgba(0,10,20,1)'
        c.fillRect(0, 0, canvas.width, canvas.height)
      }
      c.fillStyle = 'rgba(209, 255, 255, ' + radius + ')'
      for (i = 0; i < numStars; i++) {
        star = stars[i]

        pixelX = (star.x - centerX) * (focalLength / star.z)
        pixelX += centerX
        pixelY = (star.y - centerY) * (focalLength / star.z)
        pixelY += centerY
        pixelRadius = Number(focalLength / star.z)

        c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius)
        c.fillStyle = 'rgba(209, 255, 255, ' + star.o + ')'
      }
    }
    executeFrame()
  }
  mounted () {
    this.draw()
  }
}
</script>
<style lang="scss">
.background {
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  /*background: black;*/
}
</style>
