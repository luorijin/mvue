# Toast 轻提示


### 引入

``` javascript
import Vue from 'vue';
import { Toast } from 'mvue';

Vue.use(Toast);
```


## 代码演示

### 文字提示


```html
<mv-button @click="taost1">文字提示</mv-button>
```

```js
    export default{
        methods:{
            taost1(){
                this.$toast("默认文字提示")
            }
        }
    }
```

### 加载提示

```html
<mv-button @click="taost2">文字提示</mv-button>
```

```js
    export default{
        methods:{
            taost2(){
                let loading = this.$toast.loading("加载中");
                setTimeout(function(){
                    loading.close()
                },2000)
            }
        }
    }
```