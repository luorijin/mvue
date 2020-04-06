<template>
   <div class="mv-swipe"
    :class="['horizontal', {'dragging': dragging},slideContainerClass]"
    @touchstart="onTouchStart" @mousedown="onTouchStart">
        <div class="mv-swipe-wrap"
        ref="mv-swipe-wrap"
        :style="{'transform' : 'translate(' + translateX + 'px,0)'}">
            <slot></slot>
        </div>
        <div  class="mv-swipe-pagination"
        :class="[paginationContainerClass]"
        v-show="indicator">
            <span class="mv-swipe-pagination-bullet"
            :class="[{'active': (index+1)==currentPage},paginationClass]"
            v-for="(slide,index) in swipes"
            :key="index"
            :id="index+1"></span>
        </div>
    </div>
</template>
<script>
    export default {
        name:"mv-swipe",
        props: {
            paginationClass: {
                type: String,
                default: ''
            },
            slideContainerClass: {
                type: String,
                default: ''
            },
            paginationContainerClass: {
                type: String,
                default: ''
            },
            indicator: {
                type: Boolean,
                default: false
            },
            loop: {
                type: Boolean,
                default: true
            },
            initial:{
                type: Number,
                default: 1 
            },
            autoplay: {
                type: Number,
                default: 0 //0 to not auto
            },
            rebound:{
                type:Number,
                default:20
            }
        },
        data() {
            return {
                currentPage:this.initial,
                intervalId: 0,
                lastPage: 1,
                translateX: 0,
                startTranslateX: 0,
                deltaX: 0,
                dragging: false,
                startPos: null,
                swipes:[],
                clientWidth:0
            };
        },
        mounted(){
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.clientWidth = this.$refs['mv-swipe-wrap'].clientWidth;
            this.dragging = true;
            this.setPage(this.currentPage);
            this.autoBegin();
            setTimeout(()=>{
                this.dragging = false;
            },0)
        },
        watch:{
            initial(page){
                this.currentPage = page;
            },
            currentPage(page){
                this.setPage(page)
                this.$emit("change",page);
            }
        },
        destroyed(){
            this.autoStop();
        },
        methods: {
            next() {
                let page = this.currentPage;
                if (page < this.swipes.length) {
                   this.currentPage = page+1;
                } else {
                    if (this.loop) this.autoRepeat();
                    else this.revert();
                }
            },
            prev() {
                var page = this.currentPage;
                if (page > 1) {
                    this.currentPage = page-1;
                } else {
                    if (this.loop) this.autoRepeat()
                    else this.revert();
                }
            },
            autoRepeat(move){
                let {deltaX,swipes,clientWidth} = this;
                let length = swipes.length;
                if(deltaX>0){
                    swipes[length-1].translateX = -length*clientWidth;
                    if(!move) this.setPage(0);
                }else{
                    swipes[0].translateX = length*clientWidth;
                    if(!move) this.setPage(length+1)
                }
            },
            autoBegin() {
                if (!this.autoplay) return;
                this.intervalId=setInterval(()=>{
                    this.resetTran();
                    this.timeout = setTimeout(()=>{
                        this.dragging = false;
                        this.next();
                    },30)//30毫秒是节流更新渲染时间
                    
                }, this.autoplay);
            },
            autoStop() {
                clearInterval(this.intervalId);
                clearTimeout(this.timeout);
            },
            setPage(page) {
                this.deltaX = 0;//重置拖动距离，解决swipetab切换过程中点击屏幕会返回
                let {currentPage,swipes} = this;
                this.lastPage = currentPage;
                //偏移的大小
                this.translateX = -(page-1)*this.clientWidth;
            },
            resetTran(){
                let {currentPage,swipes,clientWidth} = this;
                let length = swipes.length;
                if(this.translateX>0){
                    this.currentPage = swipes.length; 
                }
                if(this.translateX<-(swipes.length-1)*clientWidth){
                    this.currentPage = 1;   
                }
                swipes[length-1].translateX = 0;
                swipes[0].translateX = 0;
            },
            onTouchStart(e) {
                this.dragging = true;
                this.autoStop()
                this.resetTran();
                this.startPosX = this.getTouchPos(e).pageX;
                this.startPosY = this.getTouchPos(e).pageY;
                this.startTranslateX = -(this.currentPage-1)*this.clientWidth;
                this.startTime = new Date().getTime();
                e.stopPropagation();
                document.addEventListener('touchmove', this.onTouchMove, false);
                document.addEventListener('touchend', this.onTouchEnd, false);
                document.addEventListener('mousemove', this.onTouchMove, false);
                document.addEventListener('mouseup', this.onTouchEnd, false);
            },
            onTouchMove(e) {
                this.deltaX = this.getTouchPos(e).pageX - this.startPosX;
                this.deltaY = this.getTouchPos(e).pageY - this.startPosY;
                if(Math.abs(this.deltaY)>Math.abs(this.deltaX)) {this.deltaX=0;return};//y方向大于x,不允许滚动
                if(this.isReachBorder(this.deltaX)){
                     if(this.loop){
                        this.autoRepeat(true);
                    }else{
                        this.deltaX<0?this.deltaX=-this.rebound:this.deltaX=this.rebound;
                    }
                }
                this.translateX = this.startTranslateX + this.deltaX;
                this.$emit('slider-move', this.translateX);
                if (Math.abs(this.deltaX) > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            onTouchEnd(e) {
                this.autoBegin()
                this.dragging = false;
                var isQuickAction = new Date().getTime() - this.startTime < 1000;
                if (this.deltaX < -100 || (isQuickAction && this.deltaX < -30)) {
                    this.next();
                } else if (this.deltaX > 100 || (isQuickAction && this.deltaX > 30)) {
                    this.prev();
                } else {
                    this.revert();
                }
                document.removeEventListener('touchmove', this.onTouchMove);
                document.removeEventListener('touchend', this.onTouchEnd);
                document.removeEventListener('mousemove', this.onTouchMove);
                document.removeEventListener('mouseup', this.onTouchEnd);
            },
            revert() {
                this.setPage(this.currentPage);
            },
            isReachBorder(delta){//是否达到最大或最小
                if(delta<=0&&this.currentPage>=this.swipes.length){
                    return true;
                }else if(delta>0&&this.currentPage<=1){
                    return true;
                }else{
                    return false;
                }
            },
            getTouchPos(e) {
                return e.changedTouches ? e.changedTouches[0] : e;
            }
        }
    };
</script>
<style lang="less">
.mv-swipe {
    position: relative;
    overflow: hidden;
    .mv-swipe-wrap {
        display: flex;
        width: 100%;
        height: 100%;
        transition: all 0.3s ease;
    }    
    .mv-swipe-item {
        overflow: hidden;
        overflow-y: auto;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
    }
    &.horizontal .mv-swipe-wrap {
        flex-direction: row;
    }
    &.dragging .mv-swipe-wrap {
        transition: none;
    }
    .mv-swipe-pagination {
        position: absolute;
        .mv-swipe-pagination-bullet {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #000000;
            opacity: .2;
            cursor:pointer
        }
        .mv-swipe-pagination-bullet.active {
            background: #007aff;
            opacity: 1;
        }
    }
    &.horizontal .mv-swipe-pagination {
        bottom: 10px;
        width: 100%;
        text-align: center;
        .mv-swipe-pagination-bullet {
            display: inline-block;
            margin: 0 3px;
        }
    }
}
</style>