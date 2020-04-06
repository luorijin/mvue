<template>
    <demo-section>
        <demo-block title="api调用">
            <mv-button @click="showdialog(true)">确认弹窗</mv-button>
            <mv-button @click="showdialog(false)">提示弹窗</mv-button>
        </demo-block>
        <demo-block title="组件使用">
            <mv-dialog v-model="show" :before="before" title="组件调用">
                组件弹窗内容
            </mv-dialog>
            <mv-button @click="show=true" >弹窗</mv-button>
        </demo-block>      
    </demo-section>   
</template>

<script>
    export default{
        data(){
            return {
                show:false
            }
        },
        methods:{
            showdialog(is){
                this.$dialog({
                    title:"我是谁",
                    content:"我是api调用",
                    showCancel:is,
                    before(done){
                        setTimeout(function(){
                            console.log(22)
                            done(true);
                        },2000)
                    }
                })
            },
            before(done){
                setTimeout(function(){
                    console.log(22)
                    done(false);
                },2000)
            }
        }
    }
</script>    

<style>

</style>