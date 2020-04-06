<template>
    <demo-section>
        <demo-block title="基本使用">
            <mv-action-sheet v-model="show" :actions="actions" @select="select" @cancel="cancel">
            </mv-action-sheet>
            <mv-button @click="show=true">显示</mv-button>
        </demo-block>   
    </demo-section>   
</template>

<script>
    export default{
        data(){
            return {
                show:false,
                    actions: [
                    { name: '选项' },
                    { name: '选项'},
                    { name: '禁用选项', disabled: true }
                ]
            }
        },
        methods:{
            select(item){
                alert(item.name);
                this.show = false;
            },
            cancel(action){
                alert("退出")
            }
        }
    }
</script>    

<style>

</style>