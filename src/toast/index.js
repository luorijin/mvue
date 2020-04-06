import Vue from "vue";
import toast from './component'

const parseOptions = tip => (typeof tip ==='string' ?{ tip } : tip );
const toastContructor = Vue.extend(toast)
let instance;
const Toast = function(options){
    if(instance){
        document.body.removeChild(instance.vm.$el);
        instance.$destroy();
    }
    let opt = parseOptions(options);
    instance = new toastContructor({
        data:opt
    })
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.visible = true;
    return {
        close:function(){
            instance.visible = false; 
        }
    }
}
const createMethod = type => options => {
    let opt = Object.assign({type},parseOptions(options));
    return Toast(opt);
};
['loading', 'success', 'fail'].forEach(method => {
    Toast[method] = createMethod(method);
});
Vue.prototype.$toast = Toast;

let install = ()=>{
    Vue.component(toast.name,toast)
}
export default {
    install
}