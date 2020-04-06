<template>
    <div class="mv-checkbox-wrap">
        <label :class="{checked:model,disabled:disabled}">
            <div class="checkbox"><input type="checkbox" :checked="model" :value="value" :disabled="disabled" @change="change($event)"></div>
            <span class="label"><slot></slot></span>
        </label>
    </div>
</template>

<script>
import { FindParentMixin } from '../mixins/find-parent';
export default {
    name:"mv-checkbox",
    data(){
        return {
            isChecked:false
        }
    },
    mixins: [FindParentMixin],
    model: {
        prop: 'checked', 
        event: 'change'  //要触发的事件
    },
    props:{
        checked:Boolean,
        value:String,
        disabled:Boolean
    },
    created(){
        this.findParent('mv-checkbox-grounp');
        if(this.parent){
            this.parent.checkboxChild.push(this);
        }
    },
    computed:{
        model(){
            if(!this.parent){
                return this.checked;
            }else{
                return this.isChecked;
            }
        }
    },
    methods:{
        change(e){
            if(!this.parent){
                this.$emit("change",e.target.checked)
            }else{
                this.isChecked = e.target.checked;
                this.parent.change();
            }
        }
    }
}
</script>

<style lang="less">
    @import '../style/var.less';
    .mv-checkbox-wrap{
        input[type="checkbox"]{
            display: none;
        }
        .checkbox{
            width: 0.9rem;
            height: 0.9rem;
            border-radius: 0.15rem;
            border:1px solid #e5e5e5;
        }
        label{
            display: flex;
            font-size: 0.8rem;
            .label{
                flex:1;
                padding: 0 0.35rem;
            }
            &.disabled .label{
                color: #999 !important;
            }
            &.disabled .checkbox{
                background:#f4f4f4 !important;
                border-color: #f4f4f4 !important;
                &::after{
                    border-color:#ccc !important;
                }
            }
            &.checked{
                .checkbox{
                    background: @themeColor;
                    border-color: @themeColor;
                    position: relative;
                    &::after{
                        position: absolute;
                        left: 50%;
                        top:50%;
                        transform: translate(-50%,-70%) rotate(-45deg);
                        display: inline-block;
                        content: "";
                        width: 0.5rem;
                        height: 0.25rem;
                        border:1px solid #fff;
                        border-right: none;
                        border-top:none;
                    }
                }
            }
        }
    }
</style>
