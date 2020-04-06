<template>
  <demo-section>
    <demo-block title="基本用法">
        <mv-checkbox v-model="checked">复选框</mv-checkbox>
    </demo-block>
    <demo-block title="禁用状态">
        <mv-checkbox v-model="checked2" disabled>复选框</mv-checkbox>
    </demo-block>       
    <demo-block title="复选框组">
       <div style="margin-bottom:1rem">{{grounp}}</div> 
       <mv-checkbox-grounp v-model="grounp">
            <mv-checkbox   value="值1">
                我是谁我是谁我
            </mv-checkbox>
            <mv-checkbox  value="值2">
                我是谁我是谁我
            </mv-checkbox>
            <mv-checkbox  value="值3">
                我是谁3
            </mv-checkbox>
        </mv-checkbox-grounp>
    </demo-block>
  </demo-section>  
</template>
<script>
    export default {
        data(){
            return {
                checked:true,
                checked2:false,
                grounp:['值1']
            }
        }
    }
</script>
<style lang="less">
    .demo-checkbox-group{
        background: #fff;
    }
</style>
