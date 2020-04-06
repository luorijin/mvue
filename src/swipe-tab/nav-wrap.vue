
<script>
export default {
    name:"nav-wrap",
    props:['nav'],
    mounted(){
        let label = this.nav.$refs.label;
        if(label){
            this.$el.parentNode.replaceChild(label,this.$el);
        }
    },
    render(h){
        return h('span',this.nav.label);
    }
}
</script>
