<template>
	<view class="grace-sg-slider" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" id="gracesgslider" 
	:style="{height:barHeight+'rpx'}">
		<view class="grace-sg-slider-line" 
		:style="{height:bglineSize+'rpx', background:bglineColor, 
		marginTop:((barHeight - bglineSize) / 2)+'rpx', borderRadius:borderRadius}"></view>
		<view class="grace-sg-slider-a-line" 
		:style="{width:(left+25)+'px', top:((barHeight - bglineSize) / 2)+'rpx', 
		background:bglineAColor, height:bglineSize+'rpx', borderRadius:borderRadius}"></view>
		<view class="grace-sg-slider-bar"
		:style="{
			width:barWidth+'rpx', height:barHeight+'rpx', 'line-height':barHeight+'rpx', 
			background:barBgColor, color:barColor, left:left+'px', fontSize:barTextSize, 
			borderRadius:borderRadius
		}">{{barText}}</view>
	</view>
</template>
<script>
export default{
	props:{
		barHeight    : {type:Number, default:32},
		barWidth     : {type:Number, default:168},
		barColor     : {type:String, default:'#FFFFFF'},
		barBgColor   : {type:String, default:'linear-gradient(to right, #3688FF,#3688FF)'},
		bglineSize   : {type:Number, default:2},
		bglineColor  : {type:String, default:'rgba(54,136,255,0.5)'},
		bglineAColor : {type:String, default:'#3688FF'},
		barText      : {type:String, default:''},
		barTextSize  : {type:String, default:'20rpx'},
		borderRadius : {type:String, default:'32rpx'},
		canSlide     : {type:Boolean, default:true}
	},
	data() {
		return {
			left       : 0,
			startLeft  : 0,
			width      : 0,
			barWidthPX : 30
		}
	},
	created:function(){
		this.init();
	},
	methods:{
		init : function(){
			uni.createSelectorQuery().in(this).select('#gracesgslider').fields(
				{size: true, rect:true}, (res) => {
					if(res == null){
						setTimeout(()=>{this.init();}, 100);
						return;
					}
					this.startLeft  = res.left;
					this.width      = res.width;
					this.barWidthPX = uni.upx2px(this.barWidth);
				}
			).exec();
		},
		touchstart : function (e) {
			if(!this.canSlide){return ;}
			var touch = e.touches[0] || e.changedTouches[0];
			this.changeBar(touch.pageX);
		},
		touchmove : function (e) {
			if(!this.canSlide){return ;}
			var touch = e.touches[0] || e.changedTouches[0];
			this.changeBar(touch.pageX);
		},
		touchend : function (e) {
			if(!this.canSlide){return ;}
			var touch = e.touches[0] || e.changedTouches[0];
			this.changeBar(touch.pageX, true);
		},
		changeBar : function(x){
			var left = x - this.startLeft;
			if(left <= 0){
				this.left = 0;
				this.$emit('change', 0);
			}else if(left + this.barWidthPX > this.width){
				left = this.width - this.barWidthPX;
				this.left = left;
				this.$emit('change', 100);
			}else{
				this.left = left;
				var scale = this.left / (this.width - this.barWidthPX);
				this.$emit('change', Math.round(scale * 100));
			}
		},
		setProgress : function (value){
			if(this.width < 1){ setTimeout(()=>{this.setProgress(value), 300}); return ;}
			if(value < 0){value = 0;}
			if(value > 100){value = 100;}
			this.left = ( value / 100 ) * (this.width - this.barWidthPX);
		}
	}
}
</script>
<style scoped>
.grace-sg-slider{position:relative; overflow:hidden;}
.grace-sg-slider-a-line{position:absolute; z-index:1; left:0; top:0;}
.grace-sg-slider-bar{position:absolute; z-index:2; left:0; top:0; border-radius:50rpx; font-size:20rpx; text-align:center; color:#323232; overflow:hidden;}
</style>