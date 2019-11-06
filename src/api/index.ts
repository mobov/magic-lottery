import { getRandom, getRandomGroup } from '@/utils'
import deepCopy from '@mobov/es-helper/deepCopy'
import xlsx from 'xlsx'
import XLSData from '@/assets/setting.xlsx'

// export const getMembers = (): Promise<any[]> => {
//   return new Promise(async (resolve, reject) => {
//     const XLSData = await require('@/assets/member.xlsx')
//     const csvJSON = deepCopy(xlsx.utils.sheet_to_json(XLSData.Sheets['Sheet1']))
//     resolve(csvJSON)
//   })
// }

export const getGame = (): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const gameJSON = deepCopy(xlsx.utils.sheet_to_json(XLSData.Sheets['game']))
    const settingJSON = deepCopy(xlsx.utils.sheet_to_json(XLSData.Sheets['setting']))
    const memberJSON = deepCopy(xlsx.utils.sheet_to_json(XLSData.Sheets['member']))
    const result = {
      Setting: settingJSON[0],
      Members: memberJSON,
      Games: gameJSON.map(data => ({
        ...data,
        luckyDogs: []
      }))
    }
    resolve(result)
  })
}

export const drawResult = (num: number = 1, Members: any[]): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const min = 0
    const max = Members.length - 1
    let result: any = []
    if (num === 1) {
      result = [getRandom(min, max)]
    } else {
      result = getRandomGroup(min, max, num)
    }

    const resultMembers = deepCopy(Members.filter((member, index) => result.includes(index)))
    resolve(resultMembers)
  })
}
