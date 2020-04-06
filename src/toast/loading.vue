<template>
    <div class="vue-loading">
        <svg  class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none"/>
        </svg>
    </div>
</template>

<script>
export default {
    name:"vueLoading"
}
</script>

<style lang="less">

    @keyframes vue-circular {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
    }
    }
    .vue-loading{
        width: 1.5rem;
        height: 1.5rem;
        margin-bottom:0.5rem;
        .circular{
            height:100%;
            width:100%;
            .path{
                stroke: currentColor;
                stroke-width: 3;
                stroke-linecap: round;
                animation: vue-circular 1.5s ease-in-out infinite;
            }
        }
    }
</style>
