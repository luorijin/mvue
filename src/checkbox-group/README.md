# checkbox 按钮


### 引入

``` javascript
import Vue from 'vue';
import { Checkbox,Checkbox-group } from 'mvue';

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
```

## 代码演示

### 基本用法

通过`v-model`绑定复选框的勾选状态

```html
<van-checkbox v-model="checked">复选框</van-checkbox>
```

```js
export default {
  data() {
    return {
      checked: true
    }
  }
}
```

### 禁用状态

```html
<van-checkbox v-model="checked" disabled>复选框</van-checkbox>
```

### 复选框组

```html
<mv-checkbox-grounp v-model="grounp">
    <mv-checkbox  value="值1">
        我是谁我是谁我
    </mv-checkbox>
    <mv-checkbox value="值2">
        我是谁我是谁我
    </mv-checkbox>
    <mv-checkbox value="值3">
        我是谁3
    </mv-checkbox>
</mv-checkbox-grounp>
```
```js
export default {
  data() {
    return {
      grounp:['值1']
    }
  }
}
```
