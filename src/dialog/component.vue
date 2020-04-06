<template>
    <transition name="dialogAnimate">
        <div class="mv-dialog-wrap" v-show="value">
            <div class="mv-dialog">
                <div class="dialog-header" v-if="title" v-html="title"></div>
                <div class="dialog-content">
                <div class="wrap">
                    <div v-if="content" v-html="content"></div>
                    <slot v-else></slot>
                </div>
                </div>
                <div class="dialog-footer">
                    <mv-button :disabled="disabled" v-if="showCancel" class="dialog-button  dialog-cancel" @click="cancel">取消</mv-button>
                    <mv-button :disabled="disabled" class="dialog-button dialog-confirm" @click="confirm">确定</mv-button>
                </div>
            </div>
            <div class="dialog-overlay"></div>
        </div>
    </transition>
</template>

<script>
import unScroll from '../utils/unScroll'
import mvButtom from '../button'
export default {
    name:"mv-dialog",
    data(){
        return {
            disabled:false
        }
    },
    props:{
        value:Boolean,
        title:String,
        before:Function,
        content:String,
        showCancel:{
            type:Boolean,
            default:true
        }
    },
    components:{
        mvButtom
    },
    watch:{
       value(val){
           if(val) {
               unScroll.lock();
               this.disabled = false;
            }else{
                unScroll.unlock();
            }
       } 
    },
    methods:{
       cancel(is){
            this.disabled = false;
            if(is===false) return;
            this.$emit("input",false);
        },
        confirm(){
            if(this.before){
                this.disabled = true;
                this.before((is)=>{
                    this.cancel(is);
                })
            }else{
                this.cancel();
            }
        }
    }
}
</script>

<style lang="less">
    @import '../style/var.less';
    .dialogAnimate-enter-active, .dialogAnimate-leave-active {
        transition: all 0.3s;
        &.mv-dialog-wrap .dialog-overlay{
            transition: opacity 0.3s;
        }
        &.mv-dialog-wrap .mv-dialog{
            transform:translate(-50%,-50%)  scale(1);
            transition: all 0.3s;
        }
    }
    .dialogAnimate-enter, .dialogAnimate-leave-to {
        &.mv-dialog-wrap .dialog-overlay{
            opacity: 0;
        }
        &.mv-dialog-wrap .mv-dialog{
            opacity: 0;
            transform: translate(-50%,-50%) scale(0.7);
        }
    }
    .mv-dialog-wrap{
        position: fixed;
        left: 0;
        top:0;
        height: 100%;
        width: 100%;
        z-index: 2000;
        .mv-dialog{
            position: absolute;
            width:85%;
            box-sizing: border-box;
            top:50%;
            left: 50%;
            background: #fff;
            overflow: hidden;
            font-size: 0.65rem;
            border-radius: 0.3rem;
            transform: translate(-50%,-50%);
            z-index: 2002;
            .dialog-header{
                font-size: 0.75rem;
                text-align: center;
                padding: 0.5rem 0;
            }
        }
        .dialog-content{
            padding: 0 0.7rem;
            padding-top: 0.35rem;
            text-align: center;
            min-height: 3.25rem;
            color: #7d7e80;
            .wrap{
                display: inline-block;
                text-align: left;
            }
        }
        .dialog-footer{
            display: flex;
            position: relative;
            .dialog-button{
                flex: 1;
                height: 2.2rem;
                padding: 0;
                line-height: 1;
                margin-right: 0;
                border:none;
                &.dialog-confirm{
                    color: @themeColor;
                }
                & + .dialog-button{
                    &::after{
                        content: "";
                        position: absolute;
                        left: 0;
                        top:0;
                        height: 100%;
                        border-left:1px solid  @boderLine;
                        transform: scaleX(0.5);                
                        z-index: 1;
                    }
                }
            }
            &::before{
                content: "";
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
                border-top:1px solid  @boderLine;
                transform: scaleY(0.5);                
                z-index: 1;

            }
        }
        .dialog-overlay{
            position: absolute;
            left: 0;
            top:0;
            height: 100%;
            width:100%;
            z-index: 2001;
            background: #000;
            opacity: 0.6;
        }
    }
</style>
