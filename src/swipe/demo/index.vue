<template>
    <demo-section>
        <demo-block title="基本使用">
            <mv-swipe class="swipe" :indicator="true">
                <mv-swipe-item class="swipe-item">
                    第一页
                </mv-swipe-item>
                <mv-swipe-item class="swipe-item">
                    第二页
                </mv-swipe-item>
                <mv-swipe-item class="swipe-item">
                    第三页
                </mv-swipe-item>
            </mv-swipe>
        </demo-block>    
    </demo-section>
</template>

<script>
export default {

}
</script>

<style>
    .demo-swipe{
        background: #fff;
    }
     div.swipe{
        position: relative;
        width:100%;
        height:300px;
        top:0;
        left:0;
        z-index:1;
    }
</style>