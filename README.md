# magic-lottery
> 通过excel可配置的抽奖平台

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
| name | string | - | 抽奖标题 |
| duration | int | - | 抽奖转动的持续时间 |


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
