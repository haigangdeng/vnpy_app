<template>
	<view class="grace-full-loading" v-if="graceFullLoading" @tap.stop="stopFun" @touchmove.stop.prevent="stopFun" 
	:style="{
		backgroundColor:background, left:graceFullLoading?'0px':'-1000px',
		opacity:graceFullLoading?1:0}">
		<image class="grace-full-loading-image" ref="loadingLogos" :src="logoUrl" mode="widthFix" :style="{width:size, height:size}"></image>
		<text class="grace-full-loading-text" :style="{color:textColor, fontSize:fontSize}">{{text}}</text>
	</view>
</template>
<script>
var animation = weex.requireModule('animation');
export default {
	name: "graceFullLoading",
	props: {
		graceFullLoading: {
			type    : Boolean,
			default : false
		},
		logoUrl : {
			type    : String,
			default : ""
		},
		text : {
			type    : String,
			default : "Loading ..."
		},
		fontSize : {
			type    : String,
			default : "22rpx"
		},
		textColor : {
			type    : String,
			default : "#999999"
		},
		size : {
			type    : String,
			default : "138rpx"
		},
		background : {
			type    : String,
			default : 'rgba(255,255,255,1)'
		}
	},
	updated : function(){
		setTimeout(()=>{
			var loadingLogos = this.$refs.loadingLogos;
			this.animation1(loadingLogos);
		}, 200);
	},
	methods: {
		stopFun : function () {},
		animation1 : function(loadingLogos){
			if(!this.graceFullLoading){return ;}
			var _self = this;
			animation.transition(loadingLogos, {
				styles: { opacity:0.3},
				duration: 1000, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 0 
			}, function (){
				_self.animation2(loadingLogos);
			});
		},
		animation2 : function(loadingLogos){
			if(!this.graceFullLoading){return ;}
			var _self = this;
			animation.transition(loadingLogos, {
				styles: { opacity: 1},
				duration: 1000, 
				timingFunction: 'linear',
				needLayout:false,
				delay: 0 
				}, function (){_self.animation1(loadingLogos);}
			);
		}
	}
}
</script>
<style scoped>
.grace-full-loading{width:750rpx; justify-content:center; align-items:center; background-color:rgba(255,255,255,0.9); position:fixed; top:0; bottom:0;}
.grace-full-loading-image{width:150rpx; height:150rpx; border-radius:150rpx;}
.grace-full-loading-text{line-height:50rpx; font-size:22rpx; margin-top:10rpx; text-align:center;}
</style>