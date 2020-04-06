<template>
    <button :class="['mv-button',type,{plain},{harline},{round}]" :disabled="disabled" @click="propsClick">
        <i></i>
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    name:"mvButton",
    props:{
        type:String,
        plain:Boolean,
        harline:Boolean,
        disabled:Boolean,
        round:Boolean
    },
    methods:{
        propsClick(evt){
            this.$emit("click",evt);
        }
    }
}
</script>

<style lang="less">
    @primary:#07c160;
    @info:#1989fa;
    @warning:#f44;
    @danger:#ff976a;
    .plain(@color){
         &.plain{
            color:@color;
            background: #fff;
            border:1px solid @color;
            &.harline{
                border:none;
                &:after{
                    content: ' ';
                    position: absolute;
                    pointer-events: none;
                    box-sizing: border-box;
                    border-radius:inherit;
                    top: -50%;
                    left: -50%;
                    right: -50%;
                    bottom: -50%;
                    -webkit-transform: scale(0.5);
                    transform: scale(0.5);
                    border: 1px solid @color;
                }
            }
        }
    }
    .mv-button{
        position: relative;
        background: #fff;
        color: #323233;
        border: 1px solid #ebedf0;
        outline: none;
        box-sizing: border-box;
        padding: 0.35rem 0.6rem;
        min-width: 3.8rem;
        border-radius: 0.1rem;
        -webkit-appearance:none;
        &.round{
            border-radius: 1rem;
            &::before{
                border-radius: 1rem; 
            }
        }
        -webkit-user-select:none;
        -webkit-appearance:none;
        font-size: 0.65rem;
        user-select: none;
        &:disabled{
            background: #ccc !important;
            color: #fff !important;
            border-color: #ccc !important;
        }
        &.primary{
            color: #fff;
            border-color: @primary;
            background-color:@primary;
            .plain(@primary)
        }
        &.info{
            color: #fff;
            border-color: @info;
            background-color: @info;
           .plain(@info)
        }
        &.warning{
            color: #fff;
            border-color:  @warning;
            background-color:  @warning;
            .plain(@warning)
        }
        &.danger{
            color: #fff;
            border-color: @danger;
            background-color: @danger;
            .plain(@danger)
        }
        &:not(:last-child){
            margin-right: 0.3rem;
        }
        &:active::before{
            opacity: 0.1;
        }
        
        &:before{
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 1;
            background: #000;
            opacity: 0;
        }
    }
</style>
