<template>
    <div class="mv-checkbox-grounp">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"mv-checkbox-grounp",
    props:{
        value:Array
    },
    data(){
        return {
            checkboxChild:[]
        }
    },
    mounted(){
        this.setchecked();    
    },
    watch:{
        value(){
            if(!this.stop){//checkbox触发无需执行
                this.setchecked();
            }
            this.stop = false;
        }
    },
    methods:{
        setchecked(){
             this.checkboxChild.forEach(children => {
                if(this.value.indexOf(children.value)!==-1){
                    children.isChecked = true;
                }else{
                    children.isChecked = false;
                }
            })
        },
        change(){
            this.stop = true;
            let checkboxVal = [];
            this.checkboxChild.forEach((children)=>{
                if(children.isChecked){
                    checkboxVal.push(children.value)
                }
            })
            this.$emit("input",checkboxVal);
        }
    }
}
</script>

<style lang="less">
   .mv-checkbox-wrap+.mv-checkbox-wrap{
        margin-top: 0.6rem;
    }
</style>
