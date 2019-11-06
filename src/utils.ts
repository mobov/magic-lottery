import { createDecorator } from 'vue-class-component'

export const NoCache = createDecorator((options, key) => {
  // @ts-ignore
  options.computed[key].cache = false
})

export function createElement (css: string = '', text: string = ''): any {
  let dom = document.createElement('div')
  dom.className = css
  dom.innerHTML = text
  return dom
}

// 生成范围内随机1个数字
export function getRandom (min: number, max: number): number {
  return Math.floor(Math.random() * max + min)
}
// 生成范围内随机1组数字
export function getRandomGroup (min: number, max: number, count: number): number[] {
  const result = []
  while (result.length < count) {
    var temp = Math.floor(Math.random() * max + min)
    if (result.indexOf(temp) === -1) {
      result.push(temp)
    }
  }
  return result
}
