#  SwipeTab 滑动标签


### 引入

``` javascript
import Vue from 'vue';
import { Swipe,SwipeItem,SwipeTab,SwipeTabItem } from 'mvue';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(SwipeTab);
Vue.use(SwipeTabItem);
```

`SwipeTab`依赖`Swipe`组件

## 代码演示

### 基本使用

`v-model`初始页;`mv-tab`的`label`标签名字,可通过slot自定义标签内容

```html
    <mv-swipe-tab v-model="active" class="flex">
        <mv-tab>
            <div slot="label">{{labe}}</div>
            你是谁2222
        </mv-tab>
        <mv-tab :label="mm">tab第二页</mv-tab>
        <mv-tab label="哈哈哈">tab第三页</mv-tab>
        <mv-tab label="tab4">tab第四页</mv-tab>
    </mv-swipe-tab>
    <mv-button @click="ev">to第三页</mv-button>
```

```js
<script>
    export default {
        data(){
            return {
                mm:"我是分发",
                labe:"slot",
                active:2
            }
        },
        methods:{
            ev(){
                this.active = 3;
            }
        }
    }
</script>
```
