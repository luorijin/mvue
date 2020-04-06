# Picker 选择器


### 引入

``` javascript
import Vue from 'vue';
import { Picker } from 'mvue';

Vue.use(Picker);
```

## 代码演示

### 单列选择

Picker通过`columns`配置数据,每一列是包含`text`、`value`属性对象,属性`disabled`禁用选项;`v-model`绑定默认值

```html
<div class="select">{{showText}}</div>
<mv-picker  v-model="sval1" :columns="data0"  title="单列选择" />
```
```js
 let data0 = [
        {
        disabled: true,
        text: '剧毒',
        value: 1
        }, {
        text: '蚂蚁',
        value: 2
        },
        {
        text: '幽鬼',
        value: 3
        },
        {
        text: '主宰',
        value: 4
        },
        {
        text: '卡尔',
        value: 5
        },
        {
        disabled: true,
        text: '宙斯',
        value: 6
        },
        {
        disabled: true,
        text: '巫医',
        value: 7
        }, {
        disabled: true,
        text: '巫妖',
        value: 8
        },
        {
        disabled: true,
        text: '神谕者',
        value: 9
        },
        {
        text: '撼地神牛',
        value: 10
        },
        {
        text: '蓝胖子',
        value: 11
        }
    ];
    export default{
        data(){
            return {
                sval1:{},
                data0:data0  
            }
        },
        computed:{
            showText(){
                return this.sval1.text || '单列选择'
            }
        }
    }
```

### 多列选择

当`columns`为多维数组,`v-model`绑定默认选择为数组,例如

```js
    [{
        text: '剧毒',
        value: 1
        }, {
        text: '蚂蚁',
        value: 2
    }]
```

```html
<div class="select">{{showText}}</div>
<mv-picker v-model="sval2" :columns="data"  title="多列选择" />
```

```js
 let data0 = [
        {
        text: '剧毒',
        value: 1
        }, {
        text: '蚂蚁',
        value: 2
        },
        {
        text: '幽鬼',
        value: 3
        },
        {
        text: '主宰',
        value: 4
        }
    ];
    export default{
        data(){
            return {
                sval2:[],
                data:[data0.slice(),data0.slice()]  
            }
        },
         computed:{
            showText(){
                let arr = this.sval2.map((cval)=>{
                    return cval.text;
                })
                return arr.join("|")
            }
        }
    }
```

### 级联选择

使用`columns`的`children`字段可以实现选项级联的效果

```html
<div class="select">{{showText}}</div>
<mv-picker v-model="sval3" :columns="data"  title="多列选择" />
```
```js
let data3 = [
    {
      text: '北京市',
      value: '110000',
      children: [
        {
          text: "北京市",
          value: '110100'
        }
      ]
    },
    {
      text: '天津市',
      value: '120000',
      children: [
        {
          text: "天津市",
          value: '120000'
        }
      ]
    },
    {
      text: '河北省',
      value: '130000',
      children: [
        {
          text: '石家庄市',
          value: '130100'
        },
        {
          text: '唐山市',
          value: '130200'
        },
        {
          text: '秦皇岛市',
          value: '130300'
        },
        {
          text: '邯郸市',
          value: '130400'
        },
        {
          text: '邢台市',
          value: '130500'
        },
        {
          text: '保定市',
          value: '130600'
        },
        {
          text: '张家口市',
          value: '130700'
        },
        {
          text: '承德市',
          value: '130800'
        }
      ]
    },
    {
      text: '山西省',
      value: '140000',
      children: [
        {
          text: '太原市',
          value: '140100'
        },
        {
          text: '大同市',
          value: '140200'
        },
        {
          text: '阳泉市',
          value: '140300'
        },
        {
          text: '长治市',
          value: '140400'
        },
        {
          text: '晋城市',
          value: '140500'
        },
        {
          text: '朔州市',
          value: '140600'
        },
        {
          text: '晋中市',
          value: '140700'
        }
      ]
    }]
export default{
    data(){
        return {
            data3,
            sval3
        }
    },
     computed:{
       showText(){
            let arr = this.sval2.map((cval)=>{
                return cval.text;
            })
            return arr.join("|")
        }
    }
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| title | 选择器的标题| *string* | `default` |
| columns | 选择器的数据 | *Array* | `[]` |
| v-model | 初始默认值 | *Array or Object* | `[]` |
| cancelText | '取消'文字 | *String* | `取消` |
| confirmText | '确定'文字 | *String* | `确定` |

### Events

当选择器有多列时，事件回调参数会返回数组

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| confirm | 点击完成按钮时触发 | 单列：选中值为`Object`<br>多列：选择值为数组 |
| cancel | 点击取消按钮时触发 | |
| change | 选项改变时触发 | 单列：选中值为`Object`<br>多列：选择值为数组  |
