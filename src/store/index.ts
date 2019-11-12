import Vue from 'vue'
import Vuex from 'vuex'
import { getGame, drawResult } from '@/api'
import deepCopy from '@mobov/es-helper/deepCopy'
Vue.use(Vuex)

interface Game {
  name: string,
  prize: string,
  cover: string,
  total: number,
  number: number,
  joinNext: 0 | 1,
  luckyDogs: any []
}

interface State {
  excludeMembersIds: any[]
  currentLuckyDogs: any[]
  Members: any[]
  Games: Game[]
  Setting: {
    title: string
    duration: number
    logo: string
    mirror: number
  },
  Text: {
    drawTitle: string
    title: string
    draw: string
    drawing: string
    end: string
    import: string
    export: string
    result: string
    readme: string
  }
}

// 全局状态管理
export default new Vuex.Store({
  state: <State>{
    excludeMembersIds: [],
    currentLuckyDogs: [],
    Members: [],
    Games: [],
    Setting: {
      title: 'XXX抽奖活动',
      duration: 5000,
      mirror: 0,
      logo: ''
    },
    Text: {
      drawTitle: '正在抽取',
      title: '抽奖活动',
      draw: '抽奖',
      drawing: '抽奖中',
      end: '结束',
      import: '导入配置',
      export: '导出配置',
      result: '导出结果',
      readme: '使用说明'
    }
  },
  getters: {
    activeGame (state): Game {
      const game = state.Games.find((game: Game) => game.total > game.luckyDogs.length)
      return game || state.Games[state.Games.length - 1]
    },
    activeMembers (state) {
      return state.Members.filter(member => !state.excludeMembersIds.includes(member.id))
    },
    isEnd (state): boolean {
      const lastGame = state.Games[state.Games.length - 1]
      return lastGame.luckyDogs.length === lastGame.total
    }
  },
  mutations: {
    EXCLUDE_LUCKY_DOGS (state, val) {
      const excludes = val.map((_: any) => _.id)
      if (excludes.length) {
        state.excludeMembersIds = state.excludeMembersIds.concat(excludes)
      }
    },
    WRITE_RESULT (state, val) {
      const game = state.Games.find((game: Game) => game.name === val)
      // @ts-ignore
      game.luckyDogs = game.luckyDogs.concat(deepCopy(state.currentLuckyDogs))
    }
  },
  actions: {
    async initGame ({ state }, data) {
      if (!data) {
        data = await getGame()
      }
      state.Games = data.Games
      state.Members = data.Members
      Vue.set(state, 'Setting', data.Setting)
      state.excludeMembersIds = []
      state.currentLuckyDogs = []
    },
    async writeResult ({ state, getters, commit }) {
      if (state.currentLuckyDogs.length) {
        // 写入结果
        if (!getters.activeGame.joinNext) {
          commit('EXCLUDE_LUCKY_DOGS', state.currentLuckyDogs)
        }
        getters.activeGame.luckyDogs = getters.activeGame.luckyDogs.concat(state.currentLuckyDogs)
        // state.currentLuckyDogs = []
      }
    },
    async drawGame ({ state, getters, commit, dispatch }) {
      // 写入上一轮结果
      state.currentLuckyDogs = await drawResult(getters.activeGame.number, getters.activeMembers)
      if (!getters.activeGame.joinNext) {
        commit('EXCLUDE_LUCKY_DOGS', deepCopy(state.currentLuckyDogs))
      }
      commit('WRITE_RESULT', getters.activeGame.name)
    },
    async reDrawGame () {

    }
  },
  modules: {
  }
})
