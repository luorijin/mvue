# DatetimePicker 时间选择

### 介绍

时间选择器，支持日期、年月、时分等维度,通过`v-model`或者`value`绑定默认值,确定时会触发`input`和`comfrim`事件

### 引入

```js
import Vue from 'vue';
import { Picker,DatetimePicker } from 'mvue';

Vue.use(Picker);
Vue.use(DatetimePicker);
```

## 代码演示

### 选择完整时间

```html
<div @click="showpicker">{{time}}</div>
<mv-datatime-picker :min-date="minDate" v-model="current"  :max-date="maxDate"   ref="picker" title="选择完整时间" />
```

```js
export default {
  data() {
    return {
      time:'',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      current: new Date()
    };
  },
  mounted(){
    this.showtime()
  },
  watch:{
      current(){
        this.showtime()
      }
  },
  methods:{
      showtime(){
        let arr = this.$refs.picker.getShowColumn(this.current)
        this.time = arr.slice(0,3).join("-")+" "+arr.slice(3).join(":")
      },
      showpicker(){
          this.$refs.picker.show()
      }
  }
};
```

### 选择日期（年月日）

通过传入`formatter`函数，可以对选项文字进行格式化处理

```html
<mv-datatime-picker :min-date="minDate" v-model="current2" :formatter="formatter" type="date"  :max-date="maxDate"   title="选择日期" />
/>
```

```js
export default {
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      current2: new Date()
    };
  },
  methods:{
      formatter(type, val) {
        if (type === 'year') {
            return `${val}年`;
        } else if (type === 'month') {
            return `${val}月`
        }
        return `${val}日`;
    }
  }
};
```

### 选择时间

```html
<mv-datatime-picker  v-model="current3"  type="time"  title="选择时间" />
```

```js
export default {
  data() {
    return {
      current3:'12:09',
    };
  }
};
```

### API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| type | 类型，可选值为 `date` <br> `time` `year-month` | `String` | `datetime` 
| min-date | 可选的最小时间，精确到分钟 | `Date` | 十年前 |
| max-date | 可选的最大时间，精确到分钟 | `Date` | 十年后 | 
| min-hour | 可选的最小小时，针对 time 类型 | `Number` | `0` | 
| max-hour | 可选的最大小时，针对 time 类型 | `Number` | `23` | 
| min-minute | 可选的最小分钟，针对 time 类型 | `Number` | `0` | 
| max-minute | 可选的最大分钟，针对 time 类型 | `Number` | `59` |
| formatter | 选项格式化函数 | `(type, value) => value` | - | 
| title | 顶部栏标题 | `String` | `''` | 1.0.4 |


### Events

当选择器有多列时，事件回调参数会返回数组

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击完成按钮时触发 | 单列：选中值为`Object`<br>多列：选择值为数组 |
| cancel | 点击取消按钮时触发 | |
| change | 选项改变时触发 | 单列：选中值为`Object`<br>多列：选择值为数组  |

### 方法

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| getShowColumn | 参数为`Date`格式,返回格式化数组 | - |
