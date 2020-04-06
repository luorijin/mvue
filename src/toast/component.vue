<template>
    <transition name="fade">
        <div v-show="visible" class="mv-toast-wrap">
            <div class="mv-toast" :class="[type]">
                <loading v-if="type=='loading'"></loading>
                <div class="tip">{{tip}}</div>
            </div>
            <div class="toast-overlay" v-if="mask"></div>
        </div>
    </transition>
</template>

<script>
import loading from './loading'
export default {
    name:"mv-toast",
    data(){
        return {
            tip:"提示",
            type:"info",
            mask:false,
            visible:false,
            duration:2000
        }
    },
    components:{
        loading
    },
    mounted(){
        if(this.type!=='loading')
        setTimeout(()=>{
            this.visible = false;
        },this.duration+300)//300是过渡的时间
    }
}
</script>

<style lang="less">
@import '../style/var.less';
.fade-enter,.fade-leave{
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: opacity 0.3s ease;
}
.mv-toast-wrap{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 2001;
    .toast-overlay{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: 2001;
        background: #000;
        opacity: 0.6;
    }
}
.mv-toast{
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 4.5rem;
    max-width: 70%;
    padding: 0.5rem 0.65rem;
    font-size: 0.7rem;
    border-radius: 0.2rem;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: rgba(50, 50, 51, 0.8);
    top:50%;
    left: 50%;
    transform:translate(-50%,-50%);
    z-index: 2003;
    &.success{
        background-color: #f0f9eb;
        color: #67c23a;
        border:1px solid #ebeef5;
    }
    &.fail{
        background-color: #fef0f0;
        color: #f56c6c;
        border:1px solid #ebeef5;
    }
}
</style>
