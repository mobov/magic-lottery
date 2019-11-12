# magic-lottery
> 通过excel可配置的抽奖平台

###  使用说明
 - 通过导出配置获取配置表，并自行改动
 - 然后再导入配置进行抽奖
 - 点击导出结果获取获奖信息
 
###  excel配置说明

#### 游戏表(game)
> 配置游戏轮数和游戏信息

| 字段 | 类型 | 默认值 | 说明 | 
| :--- | :--- |:---|:---|
| name | string | - | 奖项名字|
| prize | string | - | 奖品名字|
| total | int | - | 奖项总数 |
| number | int | - | 每次抽奖的数目(必须是奖项总数的约数)|
| joinNext | 0 / 1 | 0 | 当前的中奖人员是否参与到下一轮抽奖, 0表示不参加下一轮抽奖|
| cover | url | - | 奖品封面，url或者base64 |

#### 人员表(member)
> 配置游戏参与人员

| 字段 | 类型 | 默认值 | 说明 | 
| :--- | :--- |:---|:---|
| id | string | - | 参与人员的工号或者唯一标识符 |
| name | string | - | 人员名字 |
| note | int | - | 备注 |

#### 配置表(setting)
> 项目信息配置

| 字段 | 类型 | 默认值 | 说明 | 
| :--- | :--- |:---|:---|
| mirror | 0 / 1 | 0 | 镜像排版， 0关闭，1打开|
| duration | int | - | 抽奖转动的持续时间 |

#### 文案表(text)
> 文案配置

| 字段 | 类型 | 默认值 | 说明 | 
| :--- | :--- |:---|:---|
| title | string | '抽奖活动' | 抽奖活动 |
| draw | string | '抽奖活动' | 抽奖活动 |
| drawing | string | '抽奖活动' | 抽奖活动 |
| end | string | '抽奖活动' | 抽奖活动 |
| drawTitle | string | '抽奖活动' | 抽奖活动 |
| import | string | '导入配置' | 导入配置 |
| export | string | '导出配置' | 导出配置 |
| result | string | '导出结果' | 导出结果 |
| readme | string | '使用说明' | 使用说明 |

###  项目安装
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```
