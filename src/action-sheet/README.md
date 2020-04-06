# ActionSheet 上拉菜单


### 引入

``` javascript
import Vue from 'vue';
import { ActionSheet } from 'mvue';

Vue.use(ActionSheet);
```

## 代码演示

### 基本使用

`v-model`绑定是否显示;`actions`数组来定义展示的选项，数组的每一项是一个对象;对象`disabled`设置禁用状态

```html
<mv-action-sheet v-model="show" :actions="actions" @select="select" @cancel="cancel" />
```

```js
<script>
    export default{
        data(){
            return {
                show:false,
                    actions: [
                    { name: '选项' },
                    { name: '选项'},
                    { name: '禁用选项', disabled: true }
                ]
            }
        },
        methods:{
            select(item){
                alert(item.name);
                this.show = false;
            },
            cancel(action){
                alert("退出")
            }
        }
    }
</script>
```

### props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| actions | `actions`数组来定义展示的选项，数组的每一项是一个对象 | `Array` | []|

### event

| 事件 | 说明 | 类型 | 
|------|------|------|
| select | 选择后返回数据项(对象) | `Function` |
| cancel | 选择后返回actionSheet组件对象 | `Function` |


