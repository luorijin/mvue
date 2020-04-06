# Button 按钮


### 引入

``` javascript
import Vue from 'vue';
import { Popup } from 'mvue';

Vue.use(Popup);
```

挂载在`body`元素下

## 代码演示

### 弹窗位置

position设置弹窗方向，默认为`bottom`,可选值为`top`,`bottom`,`left`,`right`

```html
<mv-popup  position="top" v-model='show'>
    <div class="test" >
        内容区域
    </div>
</mv-popup>
```

### 是否显示工具栏

```html
<mv-popup  position="top" v-model='show' toolbar>
    <div class="test" >
        内容区域
    </div>
</mv-popup>
<mv-popup  v-model='pshow3' toolbar>
    <div slot="toolbar">slot分发</div>
    <div class="test">
        显示工具栏
    </div>
</mv-popup>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| title | `开启默认toolbar`的标题| *string* | `default` |
| position | 弹窗动画方向 | *String* | `bottom` |
| toolbar | 是否显示工具栏 | *boolean* | `false` |
| cancelText | `开启默认toolbar`的'取消'文字 | *String* | `取消` |
| confirmText | `开启默认toolbar`的'确定'文字 | *String* | `确定` |
| overlay | 点击遮罩层是否隐藏 | *boolean* | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| cancel | `开启默认toolbar`取消事件触发 | *event: Event* |
| confirm | `开启默认toolbar`确定事件 | *event: Event* |
