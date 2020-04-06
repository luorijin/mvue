<template>
    <demo-section>
        <demo-block title="选择完整时间">
            <div class="select" @click="showPicker(0)">{{ time}}</div>
            <mv-datetime-picker :min-date="minDate" v-model="current"  :max-date="maxDate"   ref="picker0" :title="title" />
        </demo-block>
        <demo-block title="选择日期(年月日)">
            <div class="select" @click="showPicker(1)">{{ time2}}</div>
            <mv-datetime-picker :min-date="minDate" v-model="current2" :formatter="formatter" type="date"  :max-date="maxDate"   ref="picker1" :title="title" />
        </demo-block>
         <demo-block title="选择时间">
            <div class="select" @click="showPicker(2)">{{ time3}}</div>
            <mv-datetime-picker  v-model="current3"  type="time"   ref="picker2" :title="title" />
        </demo-block>
    </demo-section>        
</template>

<script>
 export default{
        data(){
            return {
                time:null,
                time2:null,
                time3:null,
                current:new Date(),
                current2:new Date(),
                current3:'12:09',
                title:"时间选择",
                minDate:new Date(2020,1,18),
                maxDate:new Date(2050,5,18)
            }
        },
        mounted(){
            this.showTime();
        },
        watch:{
            current(){
                this.showTime();
            },
            current2(){
                this.showTime();
            },
            current3(){
                this.showTime();
            }
        },
        methods:{
            showTime(){
                let arr = this.$refs.picker0.getShowColumn(this.current);
                this.time = arr.slice(0,3).join("-")+" "+arr.slice(3).join(":")
                this.time2 = this.$refs.picker1.getShowColumn(this.current2).join("");
                this.time3 = this.current3;
            },
            showPicker(index) {
                let picker = this.$refs['picker'+index];
                picker.show()
            },
            formatter(type, val) {
                if (type === 'year') {
                    return `${val}年`;
                } else if (type === 'month') {
                    return `${val}月`
                }
                return `${val}日`;
            }
        }
}
</script>

<style>
    .demo-datetime-picker{
        background: #fff;
    }
</style>