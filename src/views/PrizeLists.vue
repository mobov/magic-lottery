<template>
  <div class="prize-lists">
    <div class="list-title">
      {{title}} - <span class="list-title-prize">{{Game.prize}}</span>
    </div>
    <div class="list-box">
      <prize-item :key="item.name" :value="item" v-for="item in Prizes" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PrizeItem from '@/components/PrizeItem.vue'

@Component({
  components: { PrizeItem }
})
export default class PrizeLists extends Vue {
  get title () {
    return this.$store.state.Text.drawTitle
  }
  get Game () {
    return this.$store.getters.activeGame
  }
  get Prizes () {
    return this.$store.state.Games
  }
}
</script>
<style lang="scss">
.prize-lists {
  position: fixed;
  left: 10px;
  top: 0;
  color: white;
  .list-title  {
    font-size: 20px;
    margin: 20px 0;
    .list-title-prize {
      text-shadow: 0 0 5px orange, 1px 1px 5px orange, 2px 2px 5px orange, -1px -1px 5px orange, -2px -2px 5px orange;
    }
  }
}
  .--mirror {
    .prize-lists {
      left: unset;
      right: 10px;
    }
  }
</style>
