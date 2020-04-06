<template>
    <demo-section>
        <demo-block title="api调用">
           <mv-button @click="taost1">文字提示</mv-button>
        </demo-block>
        <demo-block title="组件使用">
            <mv-button @click="taost2">加载提示</mv-button>
        </demo-block>      
    </demo-section>   
</template>

<script>
   export default{
        methods:{
            taost1(){
                this.$toast("默认文字提示")
            },
            taost2(){
                let loading = this.$toast.loading("加载中");
                setTimeout(function(){
                    loading.close()
                },2000)
            }
        }
    }
</script>    

<style>

</style>