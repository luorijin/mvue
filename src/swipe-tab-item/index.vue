<template>
    <mv-swipe-item>
    <div class="mv-tab-content">
        <slot></slot>
    </div>
    <span class="label-wrap" ref="label" v-if="$slots.label">
        <slot name="label"></slot>
    </span>
    </mv-swipe-item>
</template>

<script>
import { FindParentMixin } from '../mixins/find-parent';
export default {
    name:"mv-tab",
    mixins: [FindParentMixin],
    props:['label'],
    data(){
        return {

        }
    },
    created(){
        this.findParent('mv-swipe-tab');
        this.parent.tabs.push(this);
    },
    destroyed() {
        this.parent.tabs.splice(this.parent.tabs.indexOf(this),1);
    }
}
</script>

<style lang="less">
    .label-wrap{
        display: inline-block;
    }
</style>
