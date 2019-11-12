<template>
  <div class="result button" @click="handleExport">
    <slot>{{textResult}}</slot>
  </div>
</template>

<script lang="ts">
import XLSData from '@/assets/setting.xlsx'
import { Component, Vue, Prop } from 'vue-property-decorator'
import xlsx from 'xlsx'
import deepCopy from '@mobov/es-helper/deepCopy'

@Component
export default class Exporter extends Vue {
  get textResult () {
    return this.$store.state.Text.result
  }

  handleExport () {
    // console.log(XLSData)
    // console.log(deepCopy(this.$store.state.Games))
    // console.log(this.$store.state.Games)
    const json = this.$store.state.Games.map((data: any) => {
      return {
        '奖项': data.name,
        '奖品': data.prize,
        '中奖名单': data.luckyDogs.map((dog: any) => {
          return `[${dog.id}:${dog.name}]`
        }).join(',')
      }
    })
    const ws = xlsx.utils.json_to_sheet(deepCopy(json))
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, 'nocoolyoyo')
    xlsx.writeFile(wb, 'result.xlsx')
  }
}
</script>
<style lang="scss">
  .importer {
    cursor: pointer;
    overflow: hidden;
    position: relative;
    .uploader {
      font-size: 0;
      cursor: pointer;
      opacity: 0;
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: transparent;
      color: transparent;
    }
  }
</style>
