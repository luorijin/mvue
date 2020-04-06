# Swipe 轮播滑动


### 引入

``` javascript
import Vue from 'vue';
import { Swipe,Swipe-item } from 'mvue';

Vue.use(Swipe);
Vue.use(Swipe-item);
```

## 代码演示

### 基本使用

`indicator`是否显示指示器

```html
<mv-swipe class="swipe" :indicator="true">
    <mv-swipe-item class="swipe-item">
        第一页
    </mv-swipe-item>
    <mv-swipe-item class="swipe-item">
        第二页
    </mv-swipe-item>
    <mv-swipe-item class="swipe-item">
        第三页
    </mv-swipe-item>
</mv-swipe>
<style>
     div.swipe{
        position: relative;
        width:100%;
        height:300px;
        top:0;
        left:0;
        z-index:1;
    }
</style>
```

## API

### Swipe Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|------|
| autoplay | 自动轮播间隔，单位为 ms | *number \| string* | - |
| initial | 初始位置索引值 | *number \| string* | `0` |
| loop | 是否开启循环播放 | *boolean* | `true` |
| indicator | 是否显示指示器 | *boolean* | `false` |


### Swipe Events

| 事件名 | 说明 | 回调参数 |
|------|------|------|
| change | 每一页轮播结束后触发 | index, 当前页的索引 |
