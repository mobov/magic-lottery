<style lang="scss">
  .prize-wheel {
    position: fixed;
    /*left: 200px;*/
    left: 0;
    top: 0;
    /*width: 80vw;*/
    user-select: none;
    /*.wheel {*/
    /*  width: 100%;*/
    /*  height: 100%;*/
    /*}*/
    .controls {
      position: fixed;
      bottom: 50px;
      right: 50px;
    }
    .member-card {
      /*background: rgba(0, 127, 127, .5);*/
     // element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
      /*width: 150px;*/
      /*height: 150px;*/
      /*box-shadow: 0 0 12px rgba(0, 255, 255, 0.5);*/
      /*border: 1px solid rgba(127, 255, 255, 0.25);*/
      padding: 20px;
      text-align: center;
      cursor: default;
      transition: background-color .3s ease-in;
      color: white;
      &.--lucky-dog {
        transition: background-color 1.5s ease-in .3s;
        /*background-color: rgba(253, 105, 0, 1) !important;*/
        /*box-shadow: 0 0 12px rgba(253, 105, 0, 0.95);*/
        background-color: var(--color-prize) !important;
        box-shadow: 0 0 5px var(--color-prize);
        /*text-shadow: 0 0 5px var(--color-prize);*/

        >* {
          text-shadow: none !important;
          color: white !important;
        }
      }
      &:hover {
        box-shadow: 0 0 12px rgba(0, 255, 255, 0.75);
        border: 1px solid rgba(127, 255, 255, 0.75);
      }
      .number {
        font-size: 20px;
        color: rgba(127, 255, 255, 0.75);
      }
      .name {
        margin-top: 15px;
        font-size: 32px;
        font-weight: bold;
        color: rgba(255, 255, 255, 0.75);
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.95);
      }
      .note {
        margin-top: 15px;
        font-size: 20px;
        color: rgba(127, 255, 255, 0.75);
      }
    }
  }
  .handler-draw {
    width: 120px;
    position: fixed;
    bottom: 50px;
    left: calc(50% - 60px);
    color: white;
  }
  .--mirror {
    .controls {
      left: 50px;
      right: unset;
    }
  }
</style>
<template>
  <div class="prize-wheel">
    <div ref="wheel" class="wheel"></div>
    <div class="controls button-group">
      <importer @import="init"/>
      <exporter />
      <result />
      <a class="button" style="text-decoration: none" href="https://github.com/mobov/magic-lottery#magic-lottery" target="_blank" >{{textReadme}}</a>
<!--      <div class="button" :class="{'&#45;&#45;active': viewType === 'table'}" @click="switchView('table')">表格</div>-->
<!--      <div class="button"  :class="{'&#45;&#45;active': viewType === 'sphere'}" @click="switchView('sphere')">球体</div>-->
    </div>
    <div class="handler">
      <button class="handler-draw button" @click="handleLottery">
        {{buttonText}}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { createElement, NoCache } from '@/utils'
import deepCopy from '@mobov/es-helper/deepCopy'
import { Camera, Scene, PerspectiveCamera, Vector3, Object3D } from 'three'
// @ts-ignore
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'
import { Component, Vue } from 'vue-property-decorator'
import Importer from '@/components/Importer.vue'
import Exporter from '@/components/Exporter.vue'
import Result from '@/components/Result.vue'

let camera!: Camera
let scene!: Scene
let controls!: TrackballControls
let renderer!: CSS3DRenderer
let TABLE_COLS = 15
let targets: any = {
  table: [],
  sphere: [],
  helix: [],
  grid: []
}
let objects: any = []

@Component({
  components: { Importer, Exporter, Result }
})
export default class PrizeWheel extends Vue {
  viewType = 'sphere'

  isLottering = false

  get textReadme () {
    return this.$store.state.Text.readme
  }
  get duration () {
    return this.$store.state.Setting.duration
  }
  get isEnd () {
    return this.$store.getters.isEnd
  }
  get Game () {
    return this.$store.getters.activeGame
  }
  get Members () {
    return this.$store.getters.activeMembers
  }
  get luckyDogs () {
    return this.$store.state.currentLuckyDogs
  }
  @NoCache
  get height () {
    // @ts-ignore
    return window.innerHeight
  }
  @NoCache
  get width () {
    // @ts-ignore
    return window.innerWidth
  }
  get buttonText () {
    let result = this.$store.state.Text.draw
    if (this.isEnd) {
      result = this.$store.state.Text.end
    } else if (this.isLottering) {
      result = this.$store.state.Text.drawing
    }

    return result
  }
  /**
     * 重置抽奖牌内容
     */
  resetCard () {
    let duration = 500
    if (this.luckyDogs.length === 0) {
      return Promise.resolve()
    }
    this.luckyDogs.forEach((data: any) => {
      const index = objects.findIndex((_: any) => Number(_.element.id) === Number(data.id))
      const object = objects[index]
      const target = targets.sphere[index]

      new TWEEN.Tween(object.position)
        .to({
          x: target.position.x,
          y: target.position.y,
          z: target.position.z
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      new TWEEN.Tween(object.rotation)
        .to({
          x: target.rotation.x,
          y: target.rotation.y,
          z: target.rotation.z
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
    })

    return new Promise((resolve, reject) => {
      new TWEEN.Tween(this.resetCard)
        .to({}, duration * 2)
        .onUpdate(this.renderWheel)
        .start()
        .onComplete(() => {
          // selectedCardIndex.forEach((index) => {
          //   let object = threeDCards[index]
          //   object.element.classList.remove('prize')
          // })
          resolve()
        })
    })
  }

  pickLuckyDogs () {
    let duration = 600
    let width = 160
    let tag = -(this.luckyDogs.length - 1) / 2
    this.luckyDogs.forEach((data: any) => {
      const object = objects.find((_: any) => Number(_.element.id) === Number(data.id))
      new TWEEN.Tween(object.position)
        .to({
          x: tag * width,
          y: 50,
          z: 2200
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      new TWEEN.Tween(object.rotation)
        .to({
          x: 0,
          y: 0,
          z: 0
        }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()

      object.element.classList.add('--lucky-dog')
      tag++
    })

    return new Promise((resolve, reject) => {
      new TWEEN.Tween(this.pickLuckyDogs)
        .to({}, duration * 2)
        .onUpdate(this.renderWheel)
        .start()
        .onComplete(() => {
          resolve()
        })
    })
  }

  createCard (data: any): any {
    // console.log(this.Selected)
    const element = document.createElement('div')
    element.className = 'member-card'
    element.id = data.id
    const number = document.createElement('div')
    number.className = 'number'
    number.textContent = data.id
    element.appendChild(number)
    const name = document.createElement('div')
    name.className = 'name'
    name.textContent = data.name
    element.appendChild(name)
    const note = document.createElement('div')
    note.className = 'note'
    if (data.note) {
      note.textContent = data.note
    }
    // details.innerHTML = this.table[ i + 1 ] + '<br>' + this.table[ i + 2 ]
    element.appendChild(note)

    return element
  }

  initTable () {
    for (let i = 0, rowIndex = 1, colIndex = 1; i < this.Members.length; i++) {
      // console.log(this.Members[i])
      let element = this.createCard(this.Members[i])
      let objectCSS3D = new CSS3DObject(element)
      objectCSS3D.position.x = Math.random() * 4000 - 2000
      objectCSS3D.position.y = Math.random() * 4000 - 2000
      objectCSS3D.position.z = Math.random() * 4000 - 2000
      scene.add(objectCSS3D)
      objects.push(objectCSS3D)
      //
      let object = new Object3D()
      // @ts-ignore
      object.position.x = (colIndex * 180) - 1330
      // @ts-ignore
      object.position.y = -(rowIndex * 180) + 1330
      if (i <= (rowIndex * TABLE_COLS - 2)) {
        colIndex++
      } else {
        rowIndex++
        colIndex = 1
      }

      targets.table.push(object)
    }
  }

  initSphere () {
    const vector = new Vector3()
    for (let i = 0, l = objects.length; i < l; i++) {
      const phi = Math.acos(-1 + (2 * i) / l)
      const theta = Math.sqrt(l * Math.PI) * phi
      const object = new Object3D()
      object.position.setFromSphericalCoords(800, phi, theta)
      vector.copy(object.position).multiplyScalar(2)
      object.lookAt(vector)
      targets.sphere.push(object)
    }
  }

  initHelix () {
    const vector = new Vector3()
    for (let i = 0, l = objects.length; i < l; i++) {
      let theta = i * 0.175 + Math.PI
      let y = -(i * 8) + 450
      let object = new Object3D()
      object.position.setFromCylindricalCoords(900, theta, y)
      vector.x = object.position.x * 2
      vector.y = object.position.y
      vector.z = object.position.z * 2
      object.lookAt(vector)
      targets.helix.push(object)
    }
  }

  initGrid () {
    for (let i = 0; i < objects.length; i++) {
      let object = new Object3D()
      object.position.x = ((i % 5) * 400) - 800
      object.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800
      object.position.z = (Math.floor(i / 25)) * 1000 - 2000
      targets.grid.push(object)
    }
  }

  rolling () {
    return new Promise((resolve, reject) => {
      scene.rotation.y = 0
      new TWEEN.Tween(scene.rotation)
        .to({
          y: Math.PI * 8
        }, this.duration)
        .onUpdate(this.renderWheel)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
        .onComplete(() => {
          resolve()
        })
    })
  }

  init () {
    camera = new PerspectiveCamera(45, this.width / this.height, 1, 10000)
    camera.position.z = 3000
    scene = new Scene()
    targets = {
      table: [],
      sphere: [],
      helix: [],
      grid: []
    }
    objects = []
    this.viewType = 'sphere'
    this.isLottering = false
    // const data = this.Members
    // table
    this.initTable()
    this.initSphere()
    this.initHelix()
    this.initGrid()
    // @ts-ignore
    if (this.$refs.wheel.children.length) {
      // @ts-ignore
      this.$refs.wheel.removeChild(renderer.domElement)
    }
    renderer = new CSS3DRenderer()
    renderer.setSize(this.width, this.height)
    // @ts-ignore
    this.$refs.wheel.appendChild(renderer.domElement)

    // controls = new TrackballControls(camera, renderer.domElement)
    // controls.minDistance = 500
    // controls.maxDistance = 6000
    // controls.addEventListener('change', this.renderWheel)

    this.transform(targets[this.viewType], 2000)
  }
  transform (targets: any, duration: number = 2000) {
    TWEEN.removeAll()
    for (let i = 0; i < objects.length; i++) {
      const object = objects[ i ]
      const target = targets[ i ]

      new TWEEN.Tween(object.position)
        .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
      new TWEEN.Tween(object.rotation)
        .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start()
    }
    new TWEEN.Tween(this.transform)
      .to({}, duration * 2)
      .onUpdate(this.renderWheel)
      .start()
  }
  switchView (type: 'table' | 'sphere') {
    this.viewType = type
    this.transform(targets[type], 2000)
  }
  renderWheel () {
    renderer.render(scene, camera)
  }
  onWindowResize () {
    console.log(this.width)
    // @ts-ignore
    camera.aspect = this.width / this.height
    // @ts-ignore
    camera.updateProjectionMatrix()
    renderer.setSize(this.width, this.height)
    this.renderWheel()
  }
  animate () {
    requestAnimationFrame(this.animate)
    TWEEN.update()
    // controls.update()
  }
  handleLottery () {
    this.lottery()
  }
  handleReLottery () {
    this.lottery()
  }
  async lottery () {
    if (this.isLottering) { return }
    if (this.isEnd) {
      await this.resetCard()
      return
    }
    this.isLottering = true
    await this.resetCard()
    await this.rolling()
    await this.$store.dispatch('drawGame')
    // await this.$store.dispatch('writeResult')
    await this.pickLuckyDogs()
    this.isLottering = false
  }

  async mounted () {
    this.init()
    this.animate()
    window.addEventListener('resize', this.onWindowResize)
  }
  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
</script>
