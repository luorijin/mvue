# Button 按钮


### 引入

``` javascript
import Vue from 'vue';
import { Dialog } from 'mvue';

Vue.use(Dialog);
```


## 代码演示

### api调用


```html
<mv-button @click="showdialog(true)">确认弹窗</mv-button>
<mv-button @click="showdialog(false)">提示弹窗</mv-button>
```

```js
    export default{
        data(){
            return {
                show:false
            }
        },
        methods:{
            showdialog(is){
                this.$dialog({
                    title:"我是谁",
                    content:"我是api调用",
                    showCancel:is,
                    before(done){
                        setTimeout(function(){
                            console.log(22)
                            done(true);
                        },2000)
                    }
                })
            }
        }
    } 
```

### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式

```html
<mv-dialog v-model="show" :before="before" title="组件调用">
        组件弹窗内容
</mv-dialog>
<mv-button @click="show=true" >弹窗</mv-button>
```

```js
    export default{
        data(){
            return {
                show:false
            }
        },
        methods:{
            before(done){
                setTimeout(function(){
                    console.log(22)
                    done(false);
                },2000)
            }
        }
    }  
```

## API

### props

| 参数 | 说明 | 类型 | 默认值
| ---  | --- | --- | --- |
v-model | 当前组件是否显示 | `Boolean` | `false`
title | 显示标题 | `String` | `null`
before | 关闭前的回调函数<br>调用 done() 后关闭弹窗<br>调用 done(false) 阻止弹窗关闭 | `Function` | `null`
content | 弹窗内容,如果content不存在;会取组件分发slot的内容 | `String` | `null`
showCancel | 是否显示取消按钮 | `Boolean` | `true`