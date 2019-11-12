<template>
    <div class="exporter button" @click="handleExport">
      <slot>{{textExport}}</slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import xlsx from 'xlsx'
import XLSData from '@/assets/setting.xlsx'

@Component
export default class Exporter extends Vue {
  get textExport () {
    return this.$store.state.Text.export
  }

  handleExport () {
    xlsx.writeFile(XLSData, 'game.xlsx')
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
