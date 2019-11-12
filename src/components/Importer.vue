<template>
    <div class="importer button">
      <slot>{{textImport}}</slot>
      <input class="uploader"
             title=""
             alt=""
             @change="handleValueChange"
             type="file">
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import xlsx from 'xlsx'

@Component
export default class Importer extends Vue {
  get textImport () {
    return this.$store.state.Text.import
  }

  handleValueChange (e: any) {
    const file = e.target.files[0]
    let reader: any = new FileReader()
    const onLoad = async () => {
      const XLSData = xlsx.read(reader.result, {
        type: 'array',
        cellHTML: false
      })
      const Games: any = xlsx.utils.sheet_to_json(XLSData.Sheets['game'])
      const Members: any = xlsx.utils.sheet_to_json(XLSData.Sheets['member'])
      const Setting: any = xlsx.utils.sheet_to_json(XLSData.Sheets['setting'])
      console.log(XLSData)
      await this.$store.dispatch('initGame', {
        Setting: Setting[0],
        Members,
        Games: Games.map((data: any) => ({
          ...data,
          luckyDogs: []
        }))
      })
      this.$emit('import')
      reader.removeEventListener('load', onLoad)
      reader = null
      e.target.value = ''
    }
    reader.addEventListener('load', onLoad, false)

    if (file) {
      reader.readAsArrayBuffer(file)
    }
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
