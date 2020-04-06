<template>
    <demo-section>
        <demo-block title="代码演示">
            <div class="select" @click="showPicker(0)" ref="select0">{{ selectedText0 || title}}</div>
            <div class="select" @click="showPicker(1)" ref="select1">{{ selectedText1 || title2}}</div>
            <div class="select" @click="showPicker(2)" ref="select2">{{ selectedText2 || title3}}</div>
            <mv-picker @confirm="confirm" v-model="sval1"  :columns="data0" ref="picker0" :title="title">
            </mv-picker>
            <mv-picker @confirm="confirm" v-model="sval2"  :columns="data2"  ref="picker1" :title="title2">
            </mv-picker>
             <mv-picker @confirm="confirm" v-model="sval3"  @change="change"  :columns="data3" ref="picker2" :title="title3"/>
        </demo-block>    
    </demo-section>    
</template>
<script>
     import {data0,data2,data3} from './data'
    export default{
        data(){
            return {
                sval1:{},
                sval2:[],
                sval3:[],
                title:"单列选择",
                title2:"多列选择",
                title3:"级联选择",
                data0:data0,
                data2:[[...data0],[...data2]],
                data3:data3
            }
        },
        mounted(){
        },
        computed:{
            selectedText0(){
                return this.sval1.text || '';
            },
            selectedText1(){
                 let arr = this.sval2.map((cval)=>{
                    return cval.text;
                })
                return arr.join("|")
            },
            selectedText2(){
                let arr = this.sval3.map((cval)=>{
                    return cval.text;
                })
                return arr.join("|")
            }
        },
        methods:{
            showPicker(index) {
                let picker = this.$refs['picker'+index];
                picker.show()
            },
            confirm(pickerSelected) {
                console.log(pickerSelected)
            },
            change(){
                console.log("变化")
            }
        }
    }
</script>
<style>
    .demo-picker{
        background: #fff;
    }
    .select{
        width:100%;
        padding:10px;
        box-sizing: border-box;
        border-bottom:1px solid #f4f4f4;
    }
</style>