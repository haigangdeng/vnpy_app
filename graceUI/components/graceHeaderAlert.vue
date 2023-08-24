<template name="graceHeaderAlert">
	<view :class="['grace-alert',showIn ? 'ganimate-show' : 'ganimate-hide']" 
	:style="{background:background, top : topReal + 'px', width:width+'rpx', left:((750-width)/2)+'rpx'}" v-if="showIn">
		<slot></slot>
	</view>
</template>
<script>
export default {
	name: "graceHeaderAlert",
	props: {
		show       : { type : Boolean, default : false },
		background : { type : String, default : '#F1F2F3' },
		top        : { type : Number, default : 20 },
		width      : { type : Number, default : 580},
		duration   : { type : Number, default : 2500}
	},
	data() {
		return {
			showIn : false,
			topReal : 0
		}
	},
	created:function(){
		this.topReal = this.top;
		// #ifdef H5
		this.topReal += 46;
		// #endif
		this.showIn = this.show;
	},
	watch: {
		show : function(n , o){
			if(n){
				this.showIn = n;
				setTimeout(()=>{this.showIn = false;}, this.duration);
			}
		}
	},
	methods:{
		open:function(){
			this.showIn = true;
			setTimeout(()=>{this.showIn = false;}, this.duration);
		},
		close:function(){
			this.showIn = false;
		}
	}
}
</script>
<style scoped>
@keyframes g-show{from {opacity:0; transform:scale3d(0.1, 0.1, 0.1);} to {opacity:1; transform:scale3d(1, 1, 1);}}
.ganimate-show{animation:g-show 250ms linear;}
.grace-alert{display:flex; box-sizing:border-box; padding:25rpx; border-radius:10rpx; flex-wrap:nowrap; justify-content:center; align-items:center; background:#FFF; position:fixed; z-index:99999; top:50px;}
.grace-alert::before{content:""; display:block; background:inherit; filter:blur(6rpx); position:absolute; width:100%; height:100%; top:8rpx; left:8rpx; z-index:-1; opacity:0.38; transform-origin:0 0; border-radius:inherit; transform:scale(1, 1);}
</style>