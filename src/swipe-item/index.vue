<template>
    <div class="mv-swipe-item" :style="{'transform' : 'translate(' + translateX + 'px,0)'}">
        <slot></slot>
    </div>
</template>

<script>
import { FindParentMixin } from '../mixins/find-parent';
export default {
    name:"mv-swipe-item",
    mixins: [FindParentMixin],
    data(){
        return {
           translateX:0 
        }
    },
    created() {
        this.findParent('mv-swipe');
        this.parent.swipes.push(this);
    },
    destroyed() {
        this.parent.swipes.splice(this.parent.swipes.indexOf(this), 1);
    }
}
</script>

<style lang="less">

</style>
