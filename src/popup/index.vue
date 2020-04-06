<template>
	<div class="mv-popup" :class="{'show': value}">
		<div class="popup-mask" @click='hide'></div>
		<transition :name="position">
			<div :class="['popup-pannel',direction]" v-show='value'>
				<div class="popup-action" v-if='toolbar'>
                    <slot name="toolbar">
                        <mv-button class="left" @click='cancel' v-text='cancelText'></mv-button>
                        <span class='title' v-text='title'></span>
                        <mv-button class="right" @click='confirm' v-text='confirmText'></mv-button>
                    </slot>
				</div>
				<div class="pop-content">
					<slot></slot>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
    name:"mv-popup",
	props:{
		'value':{
			type: Boolean,
			default: false
		},
		'position': {
			type: String,
			default: 'bottom'
		},
		'toolbar':{
			type: Boolean,
			default: false
		},
		'overlay':{
			type: Boolean,
			default: true
		},
		'title':{
			type: String,
			default: '标题'
		},
		'cancelText':{
			type: String,
			default: '取消'
		},
		'confirmText': {
			type: String,
			default: '确定'
		}
    },
    mounted(){
        document.body.appendChild(this.$el);
    },
    computed:{
        direction(){
            return `popup-${this.position}`;
        }
    },
	methods:{
		hide(){
			if(this.overlay){
                this.$emit('hide');
                this.$emit("input",false);
			}
		},
		cancel(){
            this.$emit('cancel');
            this.$emit("input",false);
		},
		confirm(){
            this.$emit('confirm');
            this.$emit("input",false);
		}
	}
}
</script>

<style lang='less'>
@import '../style/var.less';
.mv-popup{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	z-index: -1;
	transition: all .3s ease;
	&.show{
		display: block;
		z-index: 99999;
		opacity: 1;
	}
	.popup-mask{
		width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.6;

	}
	.popup-pannel{
		position: absolute;
		width: 100%;
		background-color: #fff;
		&.popup-top{
            top: 0;
            left:0;
		}
		&.popup-bottom{
            bottom: 0;
            left:0;
        }
        &.popup-left{
            top: 0;
            left:0;
		}
		&.popup-right{
            top: 0;
            right:0;
		}
		.popup-action{
            position: relative;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 2rem;
            .border-bottom();
			.left,
			.right,
			.title{
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.6rem;
                border:none;
			}
			.title{
				flex: 1;
				font-size: 0.7rem;
				color: #666;
            }
			.left{
                color: #999;
                 width: 3rem;
			}
			.right{
                width: 3rem;
				color: @themeColor;
			}
		}
	}
}
.top-enter-active,
.top-leave-active,
.bottom-enter-active,
.bottom-leave-active,
.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active{
    transition: all .3s;
}
.top-enter,
.top-leave-active{
    transform: translateY(-100%);
}
.bottom-enter,
.bottom-leave-active{
    transform: translateY(100%);
}
.left-enter,
.left-leave-active{
    transform: translateX(-100%);
}
.right-enter,
.right-leave-active{
    transform: translateX(100%);
}
</style>
