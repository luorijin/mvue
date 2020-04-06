<template>
    <mv-popup  class="mv-action-sheet" :value="value" @input="change">
        <div :class="['action-item',{disabled:item.disabled}]" @click="action(item)" v-for="(item,index) in actions" :key="index">
            {{item.name}}
        </div>
        <div class="cancel" @click="cancel">取消</div>
    </mv-popup>
</template>

<script>
import mvPopup from "../popup/index"
export default {
    name:"mv-action-sheet",
    props:{
        'value':{
			type: Boolean,
			default: false
        },
        'actions':{
            type:Array,
            default:()=>{
                return [];
            }
        }
    },
    methods:{
        action(item){
            if(item.disabled) return;
            this.$emit("select",item);
        },
        cancel(){
            this.$emit("input",false);
            this.$emit("cancel",this);
        },
        change(val){
            this.$emit("input",val);
        }
    },
    components:{
        mvPopup
    }
}
</script>

<style lang="less">
    @import '../style/var.less';
    .mv-action-sheet{
        .action-item,.cancel{
            position: relative;
            padding: 0.5rem 0;
            text-align: center;
            background: #fff;
            &:active::before{
                opacity: 0.1;
            }
            .border-bottom();
            &:before{
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                z-index: 1;
                background: #000;
                opacity: 0;
            }
        }
        .action-item.disabled{
            color: #c8c9cc;
        }
        .cancel{
            margin-top: 0.5rem;
        }
        .pop-content{
            background: #f4f4f4;
        }
    }
</style>

