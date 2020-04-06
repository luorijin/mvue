<template>
    <demo-section>
        <div class="mv-pull">
            <mv-pull class="wrapper"
                                ref="scroll"
                                :scrollbar="scrollbarObj"
                                :pullDownRefresh="pullDownRefreshObj"
                                :pullUpLoad="pullUpLoadObj"
                                :startY="parseInt(startY)"
                                @pullingDown="onPullingDown"
                                @pullingUp="onPullingUp">
                <ul class="list-content">
                    <li class="list-item" v-for="item in items" :key="item">{{item}}</li>
                </ul>
            </mv-pull>
        </div>
        <button class="go-top" @click="scrollTo">返回顶部</button>      
    </demo-section>   
</template>

   <script>
    let count = 1
    export default {
        name: 'app',
        data() {
            return {
                // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
                scrollbarObj: {
                    fade: true
                },
                // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
                pullDownRefreshObj: {
                    threshold: 50,
                    stop: 50
                },
                // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
                pullUpLoadObj: {
                    threshold: 0,
                    txt: {
                        more: '加载更多',
                        noMore: '没有更多数据了'
                    }
                },
                startY: 0, // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 700,
                items: []
            }
        },
        mounted() {
            this.onPullingDown()
        },
        methods: {
        // 滚动到页面顶部
        scrollTo() {
            this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
        },
        // 模拟数据请求
        getData() {
            return new Promise(resolve => {
            setTimeout(() => {
                const arr = []
                for (let i = 0; i < 10; i++) {
                arr.push(count++)
                }
                resolve(arr)
            }, 1000)
            })
        },
        onPullingDown() {
            // 模拟下拉刷新
            console.log('下拉刷新')
            count = 0
            this.$refs.scroll.disable();
            this.getData().then(res => {
            this.items = res
            this.$refs.scroll.forceUpdate(true)
            this.$refs.scroll.enable();
            })
        },
        onPullingUp() {
            // 模拟上拉 加载更多数据
            console.log('上拉加载')
            this.getData().then(res => {
            this.items = this.items.concat(res)
            if (count < 30) {
                this.$refs.scroll.forceUpdate(true)
            } else {
                this.$refs.scroll.forceUpdate(false)
            }
            })
        }
        }
    }
    </script>
    <style>
    .mv-pull{
        position:fixed;
        top:56px;
        bottom:0;
        left:0;
        width:100%;
        overflow:hidden;
        z-index:2;
    }
    .position-box {
        position: absolute;
        top: 1.4rem;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .list-content {
        list-style: none;
        margin:0;
        padding:0;
        padding-left:0.6rem;
        background: #fff;
    }
    .list-item {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        border-bottom: 1px solid #e5e5e5;
    }
    .go-top {
        position: fixed;
        right: 20px;
        bottom: 20px;
        background-color: #ffb3a7;
        outline:none;
        border-radius: 5px;
        border: 1px solid #fff;
        color: #fff;
        padding: 10px 15px;
    }
    </style>