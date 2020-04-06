<template>
    <div class="mv-swipe-tab">
        <div class="tabs-nav">
            <div class="nav" v-for="(nav,index) in tabs" :key="index" @click="tabClick(index+1)" :class="['mv-tab',{active:value-1==index}]">
                <tab-nav :nav="nav"></tab-nav>
                <div :class="['line',tabDire]"></div>
            </div>
        </div>
        <mv-swipe ref="swipe" :initial="value" class="swipe-content" @change="change" :loop="false">
            <slot></slot>
        </mv-swipe>    
    </div>
</template>

<script>
import tabNav from './nav-wrap'
export default {
    name:"mv-swipe-tab",
    props:{
        value:Number,
        default:1
    },
    data(){
        return {
            tabs:[],
            tabDire:"right"
        }
    },
    components:{
        tabNav
    },
    methods:{
       change(page){
           this.tabDire = page > this.value ? "right" :"";
           clearTimeout(this.time)
           this.time = setTimeout(()=>{
                this.$emit("input",page);
           },30)
       },
       tabClick(page){
           this.change(page);
       }
    }
}
</script>

<style lang="less">
    @import '../style/var.less';
    .mv-swipe-tab{
        display: flex;
        flex-direction: column;
        .tabs-nav{
            position: relative;
            display: flex;
            .mv-tab{
                position: relative;
                flex: 1;
                text-align: center;
                padding: 0.5rem 0;
                .line{
                    position: absolute;
                    left: 50%;
                    transform: translateX(0%);
                    &.right{
                        transform: translateX(-100%);
                    }
                    width: 30px;
                    bottom: 0;
                    visibility: hidden;
                    opacity: 0;
                    border-bottom: 2px solid @themeColor;
                }
                &.active{
                    color: @themeColor;
                    .line{
                        transform: translateX(-50%);
                        visibility: visible;
                        opacity: 1;
                        transition: all 0.3s ease;
                    
                    }
                }
            }
            &:before{
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                border-bottom: 1px solid #f4f4f4;
                color: @themeColor;
            }
        }
        .swipe-content{
            flex: 1;
            overflow: hidden;
        }
    }
</style>
