<template>
  <transition name="picker-fade">
    <div class="mv-picker" v-show="state===1" @touchmove.prevent @click="cancel">
      <transition name="picker-move">
        <div class="picker-panel" v-show="state===1" @click.stop>
          <div class="picker-choose">
            <span class="cancel" @click="cancel">{{cancelTxt}}</span>
            <span class="confirm" @click="confirm">{{confirmTxt}}</span>
            <h1 class="picker-title">{{title}}</h1>
          </div>
          <div class="picker-content">
            <div class="mask-top"></div>
            <div class="mask-bottom"></div>
            <div class="wheel-wrapper" ref="wheelWrapper">
              <div class="wheel" v-for="(data,index) in pickerData" :key="index">
                <ul class="wheel-scroll">
                  <li v-for="(item,index) in data" :key="index" :class="{'wheel-disabled-item':item.disabled}"  class="wheel-item">{{item.text}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="picker-footer"></div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BScroll from '../utils/bscroll.esm'

const EVENT_SELECT = 'confirm'
const EVENT_CANCEL = 'cancel'

export default {
    name: 'mv-picker',
    props: {
        columns: {
            type: Array,
            default() {
                return []
            }
        },
        title: {
            type: String
        },
        cancelTxt: {
            type: String,
            default: '取消'
        },
        value:{
            type: null,
            default() {
                return []
            }
        },
        confirmTxt: {
            type: String,
            default: '确定'
        }
    },
    data() {
        return {
            isTouch:true,
            type:0,//1为级联
            state: 0,
            pickerSelected: [],
            pickerSelectedOld:[],
            pickerSelectedIndex:[]
        }
    },
    computed:{
        pickerData(){
            let data = [];
            if(this.type ==1){
                let colIndexs = this.pickerSelectedIndex;
                data.push(this.columns)
                colIndexs.forEach((pindex,i)=>{
                    let children = data[i][pindex].children;
                    if(children) data.push(children);
                })
                return data;
            }else{
                return !(this.columns[0] instanceof Array)?[this.columns]:this.columns;
            }
        }
    },
    created() {
        this.type = this.getType();
        this.setValue(this.value instanceof Array?this.value:[this.value]);
    },
    watch:{
        pickerData(){
            this.refresh();
        }
    },
    methods: {
        getType(){//是否级联
            let col = this.columns[0];
            return col instanceof Object&&col.children?1:0;
        },
        setValue(sdata=[]){
            this.isTouch = false;
            if(!sdata.length) {//无默认值，设置初始选择
                if(this.type==1){//是否级联
                    let children = this.columns[0].children,i=0;
                    this.pickerSelectedIndex[i] = 0
                    this.pickerSelected[i] = {text:children.text,value:children.value}
                    while(children){
                        i++;
                        this.pickerSelectedIndex[i] = 0;
                        this.pickerSelected[i] = {text:children.text,value:children.value}
                        children = children[0].children;
                    }
                }else{
                    if(!(this.columns[0] instanceof Array)){
                        this.pickerSelectedIndex[0] = 0;
                        this.pickerSelected[0] = this.columns[0];
                    }else{
                        this.columns.forEach((col,i)=>{
                            this.pickerSelectedIndex[0] = 0;
                            this.pickerSelected[i] = col[0];
                        })
                    }
                }
            }else{
                this.pickerSelected = sdata.slice();
                if(this.type==1){
                    let children = this.columns,i=0;
                    while(children){
                        let scol = this.pickerSelected[i];
                        if(scol){//对应的列是否有默认选择
                            for(let j=0;j<children.length;j++){
                                if(scol.value==children[j].value){
                                    this.pickerSelectedIndex[i] = j;
                                    break;
                                }
                            }
                        }else{//没有默认选择取第一选项
                            this.pickerSelected[i] = children[0];
                            this.pickerSelectedIndex[i] = 0;
                        }   
                        children = children[this.pickerSelectedIndex[i]].children;
                        i++;
                    }
                    this.pickerSelectedIndex = this.pickerSelectedIndex.slice();
                }else{
                    let pdata =!(this.columns[0] instanceof Array)?[this.columns]:this.columns;
                    this.pickerSelectedIndex = pdata.map((col,index)=>{
                        let pos = 0;
                        let scol = this.pickerSelected[index];
                        if(scol){
                            col.forEach(function(pcol,i){
                                pcol.value == scol.value?pos = i:null;     
                            });
                        }else{
                            this.pickerSelected[i] = col[0]
                        }
                        return pos;
                    })
                }
            }
            this.pickerSelectedOld = this.pickerSelected.slice();
            this.showScroll();
            this.isTouch = true;
        },
        showScroll(){
            if(this.wheels&&this.state){
                this.pickerSelectedIndex.forEach((pos,i)=>{
                    this.wheels[i].enable()
                    this.wheels[i].wheelTo(pos)
                })
            }
        },
        canConfirm() {
            return this.wheels.every((wheel) => {
                return !wheel.isInTransition
            })
        },
        confirm() {
            if(!this.canConfirm()) return;
            this.hide();
            this.pickerSelectedOld = this.pickerSelected.slice();
            if(this.value instanceof Array){
                this.$emit("input",this.pickerSelectedOld)
                this.$emit(EVENT_SELECT, this.pickerSelectedOld)
            }else{
                this.$emit("input",this.pickerSelectedOld[0])
                this.$emit(EVENT_SELECT, this.pickerSelectedOld[0])
            }
        },
        cancel() {
            this.hide()
            this.$emit(EVENT_CANCEL);
        },
        show() {
            this.state = 1;
            this.$nextTick(() => {
                if(!this.wheels){
                    this.wheels = []
                    let wheelWrapper = this.$refs.wheelWrapper
                    for (let i = 0; i < this.pickerData.length; i++) {
                        this._createWheel(wheelWrapper, i)
                    }
                }
                this.setValue(this.pickerSelectedOld);
            })

        },
        hide() {
            this.state = 0;
        },
        refill(datas) {
            let ret = []
            if (!datas.length) {
                return ret
            }
            datas.forEach((data, index) => {
                ret[index] = this.refillColumn(index, data)
            })
            return ret
        },
        refillColumn(index, data) {
            if (this.state !== 1) {
                console.error('can not use refillColumn when picker is not show')
                return
            }
            const wheelWrapper = this.$refs.wheelWrapper
            let scroll = wheelWrapper.children[index].querySelector('.wheel-scroll')
            let wheel = this.wheels[index]
            if (scroll && wheel) {
            let oldData = this.pickerData[index]
            this.$set(this.pickerData, index, data)
            let selectedIndex = wheel.getSelectedIndex()
            let dist = 0
            if (oldData.length) {
                let oldValue = oldData[selectedIndex].value
                for (let i = 0; i < data.length; i++) {
                if (data[i].value === oldValue) {
                    dist = i
                    break
                }
                }
            }
            this.pickerSelectedIndex[index] = dist
            this.$nextTick(() => {
                // recreate wheel so that the wrapperHeight will be correct.
                wheel = this._createWheel(wheelWrapper, index)
                wheel.wheelTo(dist)
            })
            return dist
            }
        },
        scrollTo(index, dist) {
            const wheel = this.wheels[index]
            this.pickerSelectedIndex[index] = dist
            wheel.wheelTo(dist)
        },
        refresh() {
            this.wheels&&this.$nextTick(() => {
                this.wheels.forEach((wheel, index) => {
                    wheel.refresh()
                })
            })
        },
        _createWheel(wheelWrapper, i) {
            if (!this.wheels[i]) {
                let swipeTime = 1500;
                this.wheels[i] = new BScroll(wheelWrapper.children[i], {
                    swipeTime,
                    wheel: {
                        selectedIndex: this.pickerSelectedIndex[i],
                        /** 默认值就是下面配置的两个，为了展示二者的作用，这里再配置一下 */
                        wheelWrapperClass: 'wheel-scroll',
                        wheelItemClass: 'wheel-item'
                    },
                    probeType: 3
                })
                this.wheels[i].on('scrollEnd', () => {
                    if(!this.isTouch) return;
                    this.$nextTick(()=>{
                        let pos = this.wheels[i].getSelectedIndex();
                        let selectData = this.pickerData[i][pos];
                        this.pickerSelected[i] = {text:selectData.text,value:selectData.value}
                        this.pickerSelectedIndex[i] = pos;
                        if(this.type==1){
                            this.pickerSelectedIndex = this.pickerSelectedIndex.map((sIdex,index)=>{
                                return index>i?0:sIdex;
                            })
                            if(i+1<this.wheels.length)
                            this.$nextTick(()=>{
                                this.scrollTo(i+1,0)
                            })
                        }
                       this.$emit('change',this.pickerSelected); 
                    })    
                })

            } else {
                this.wheels[i].refresh()
            }

            return this.wheels[i]
        }
    },
}
</script>

<style scoped lang="less">
@import '../style/var.less';
.mv-picker{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-align: center;
    font-size: 0.65rem;
    background-color: rgba(37,38,45,0.4);
    &.picker-fade-enter, &.picker-fade-leave-active{
        opacity: 0
     }
    &.picker-fade-enter-active, &.picker-fade-leave-active{
        transition: all .3s ease-in-out
    }
    .picker-panel{
        position: absolute;
        z-index: 600;
        bottom: 0;
        width: 100%;
        height: 253px;
        background: #fff;
        &.picker-move-enter, &.picker-move-leave-active{
            transform: translate3d(0, 100%, 0)
        }
        &.picker-move-enter-active, &.picker-move-leave-active{
            transition: all .3s ease-in-out;
        }
        .picker-choose{
            position: relative;
            height: 2.5rem;
            color: #999;
            .border-bottom();
            .picker-title{
                margin: 0;
                line-height:2.5rem;
                font-weight: normal;
                text-align: center;
                font-size: 0.8rem;
                color: #333;
            }
            .confirm, .cancel{
                position: absolute;
                top: 0;
                padding: 0.8rem;
                font-size: 0.65rem;
            }
            .confirm{
                right: 0;
                color: #007bff;
            }
            &:active{
                color: #5aaaff;
            }
            .cancel{
                left: 0;
                &:active{
                    color: #c2c2c2;
                }
            }
        }
    }
    .picker-content{
        position: relative;
        top:0.5rem;
        .mask-top, .mask-bottom{
            z-index: 10;
            width: 100%;
            height: 68px;
            pointer-events: none;
            transform: translateZ(0);
        }
        .mask-top{
            position: absolute;
            top: 0;
            background: rgba(255, 255, 255, 0.3);
            .border-bottom();
        }
        .mask-bottom{
            position: absolute;
            bottom: 0;
            background: rgba(255, 255, 255, 0.3);
            .border-top();
        }    
    }
    .wheel-wrapper{
        display: flex;
        padding: 0 0.8rem;
        .wheel{
            flex: 1;
            width: 1%;
            height: 173px;
            overflow: hidden;
            font-size: 0.7rem;
            .wheel-scroll{
                padding: 0;
                margin-top: 68px;
                line-height: 36px;
                list-style: none;
                .wheel-item{
                    list-style: none;
                    height: 36px;
                    overflow: hidden;
                    white-space: nowrap;
                    color: #333;
                    &.wheel-disabled-item{
                        opacity: .2;
                    }
                }
               
            }      
        }
          
    }   
    .picker-footer{
        height: 0.5rem;
    }    
}
</style>