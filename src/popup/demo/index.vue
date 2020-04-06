<template>
  <demo-section>
    <demo-block title="弹出位置">
        <mv-button  @click='show("top")'>上方</mv-button>
        <mv-button  @click='show("bottom")'>下方</mv-button>
        <mv-button  @click='show("left")'>左方</mv-button>
        <mv-button  @click='show("right")'>右方</mv-button>
    </demo-block>
     <mv-popup  :position="position" v-model='pshow'>
        <div class="test">
            内容区域
        </div>
    </mv-popup>
    <demo-block title="是否显示工具栏">
        <mv-button  @click='pshow2=true'>默认</mv-button>
        <mv-button  @click='pshow3=true'>slot</mv-button>
    </demo-block>
    <mv-popup  v-model='pshow2' toolbar>
        <div class="test">
            显示工具栏
        </div>
    </mv-popup>
    <mv-popup  v-model='pshow3' toolbar>
        <div slot="toolbar">slot分发</div>
        <div class="test">
            显示工具栏
        </div>
    </mv-popup>
  </demo-section>
</template>
<script>
export default {
    data(){
        return {
            pshow:false,
            pshow2:false,
            pshow3:false,
            position:"top"  
        }
    },
    methods:{
        show(position){
            this.position = position;
            this.pshow = true;
        }
    }
}
</script>
<style lang="less">
    html{
        font-size: 20px !important;
    }
     .test{
        width: 100%;
        height: 8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.7rem;
        color: #666;
    }
    .van-doc-demo-block{
        padding: 0 0.8rem;
    }
    .van-doc-demo-block__title{
        padding-left:0;
    }
</style>