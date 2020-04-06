<template>
    <demo-section>
        <demo-block title="基本使用">
            <mv-swipe-tab v-model="active" class="flex">
            <mv-tab>
                <div slot="label">{{labe}}</div>
                你是谁2222
            </mv-tab>
            <mv-tab :label="mm">tab第二页</mv-tab>
            <mv-tab label="哈哈哈">tab第三页</mv-tab>
            <mv-tab label="tab4">tab第四页</mv-tab>
            </mv-swipe-tab>
            <mv-button @click="ev">to第三页</mv-button>
        </demo-block>   
    </demo-section>   
</template>

<script>
    export default {
        data(){
            return {
                mm:"我是分发",
                labe:"slot",
                active:2
            }
        },
        methods:{
            ev(){
                this.active = 3;
            }
        }
    }
</script>    
<style>
    .flex{
        height:300px;
    }
</style>   