# Button 按钮


### 引入

``` javascript
import Vue from 'vue';
import { Button } from 'mvue';

Vue.use(Button);
```

## 代码演示

### 按钮类型

支持`default`、`primary`、`info`、`warning`、`danger`五种类型，默认为`default`

```html
<mv-button type="default">默认按钮</mv-button>
<mv-button type="primary">主要按钮</mv-button>
<mv-button type="info">信息按钮</mv-button>
<mv-button type="warning">警告按钮</mv-button>
<mv-button type="danger">危险按钮</mv-button>
```

### 其它设置

`round`设置按钮形状,`disabled`设置禁用状态,`harline`设置0.5px边框,`plain`设置朴素按钮

```html
<mv-button  plain type="primary">朴素按钮</mv-button>
<mv-button round type="primary">圆角按钮</mv-button>
<mv-button plain harline  type="primary">harline按钮</mv-button>
<mv-button disabled type="primary">禁用按钮</mv-button>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| type | 类型，可选值为 `primary` `info` `warning` `danger` | *string* | `default` |
| plain | 是否为朴素按钮 | *boolean* | `false` |
| square | 是否为方形按钮 | *boolean* | `false` |
| round | 是否为圆形按钮 | *boolean* | `false` |
| disabled | 是否禁用按钮 | *boolean* | `false` |
| hairline | 是否使用 0.5px 边框 | *boolean* | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| click | 点击按钮，且按钮状态不为加载或禁用时触发 | *event: Event* |
