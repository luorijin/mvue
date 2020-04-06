import Vue from 'vue'
import dialog from './component' 
const dailogConstructor = Vue.extend(dialog)
Vue.prototype.$dialog = function(options){
    let dialogIns = new dailogConstructor({
        propsData:options
    })
    dialogIns.vm = dialogIns.$mount();
    document.body.appendChild(dialogIns.vm.$el);
    dialogIns.value = true;
    dialogIns.cancel = function(is){
        dialogIns.disabled = false;
        if(is===false) return;
        dialogIns.value = false;
        setTimeout(()=>{
            document.body.removeChild(dialogIns.vm.$el)
            dialogIns.$destroy();
        },400);
    }
}
let install = ()=>{
    Vue.component(dialog.name,dialog)
}
export default {
    install
}