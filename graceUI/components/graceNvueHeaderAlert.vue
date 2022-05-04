<template>
	<view class="grace-alert" v-if="showIn" :style="{top : topReal + 'px'}">
		<view class="grace-alert-body" ref="gracealert" 
		:style="{'background-color':background, width:width+'rpx'}">
			<slot></slot>
		</view>
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
		this.showIn  = this.show;
	},
	watch: {
		show : function(n , o){
			if(n){
				this.showIn = n;
				this.animation();
			}
		}
	},
	methods:{
		open:function(){
			this.showIn = true;
			this.animation();
		},
		close:function(){
			this.showIn = false;
		},
		animation : function(){
			setTimeout(()=>{
				var animation = weex.requireModule('animation');
				animation.transition(this.$refs.gracealert, {
					styles         : {opacity:0, transform:'scale(0.1,0.1)'},
					duration       : 1, 
					timingFunction : 'linear',
					needLayout     : false,
					delay          : 0 ,
				}, ()=>{
					animation.transition(this.$refs.gracealert, {
						styles         : {opacity:1, transform:'scale(1,1)'},
						duration       : 150, 
						timingFunction : 'linear',
						needLayout     : false,
						delay          : 0 ,
					});
				});
			}, 200);
			setTimeout(()=>{this.showIn = false;}, this.duration);
		}
	}
	
}
</script>
<style scoped>
.grace-alert{width:750rpx; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center;  position:fixed; left:0rpx; top:20rpx;}
.grace-alert-body{padding:25rpx; border-radius:10rpx; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; opacity:0;}
</style>