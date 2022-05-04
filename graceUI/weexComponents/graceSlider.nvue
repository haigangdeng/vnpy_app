<template>
	<view class="grace-slider" :style="{height:blockSize+'px', width:realWidth+'px'}">
		<view class="grace-slider-bar" 
		:style="{backgroundColor:bgColor, width:realWidth+'px', height:height+'px', top:lineTop+'px'}"></view>
		<view class="grace-slider-active-bar" 
		:style="{backgroundColor:activeColor, width:activeWidth+'px', height:height+'px', marginLeft:activeLeft+'px', top:lineTop+'px'}"></view>
		<view class="grace-slider-block" 
		:style="{backgroundColor:blockBgColor, height:blockSize+'px', width:blockSize+'px', 'margin-left':xMin+'px'}" 
		@touchstart.stop="touchstart" @touchmove.stop.prevent="touchmove" data-tag="min"></view>
		<view class="grace-slider-block" 
		:style="{backgroundColor:blockBgColor, height:blockSize+'px', width:blockSize+'px', 'margin-left':xMax+'px'}" 
		@touchstart.stop="touchstart" @touchmove.stop.prevent="touchmove" data-tag="max"></view>
	</view>
</template>
<script>
const _windowWidth = uni.getSystemInfoSync().windowWidth;
export default {
	data() {
		return {
			realWidth    : 200,
			realMax      : 200,
			xMin         : 0,
			left1        : 0,
			xMax         : 100,
			currentBlock : '',
			minValue     : 0,
			maxValue     : 100,
			activeWidth  : 0,
			activeLeft   : 0,
			lineTop      : 0
		};
	},
	props: {
		bgColor : {type : String, default : "#F6F7F8"},
		activeColor : {type : String, default : "#3688FF"},
		width : {type : Number, default : 750},
		height : {type : Number, default :2},
		blockBgColor: {type : String, default : "#FFFFFF"},
		blockSize : {type : Number, default :30},
		min : {type : Number, default : 0},
		minDefault : {type : Number, default : 0},
		max : {type : Number, default : 100},
		maxDefault : {type : Number, default:100}
	},
	created:function(){
		this.realWidth = this.upx2px(this.width);
		this.left1     = (_windowWidth - this.realWidth) / 2;
		this.realMax   = this.realWidth - this.blockSize;
		this.lineTop   = (this.blockSize - this.height) / 2;
		this.setSlider();
	},
	watch:{
		minDefault : function(){
			this.setSlider();
		},
		maxDefault : function(){
			this.setSlider();
		}
	},
	methods: {
		setSlider : function(){
			this.xMin = (this.minDefault - this.min) / (this.max - this.min) * this.realMax;
			this.xMax = (this.maxDefault - this.min) / (this.max - this.min) * this.realMax;
			this.minValue = this.minDefault;
			this.maxValue = this.maxDefault;
			this.activeLeft = this.xMin + 5;
			this.activeWidth = this.xMax - this.xMin;
		},
		touchstart: function(e) {
			this.currentBlock = e.target.dataset.tag;
			if(this.currentBlock == 'min'){
				var pageX = e.pageX || e.changedTouches[0].pageX;
				pageX = pageX - this.left1;
				this.xMin = pageX;
			}else{
				var pageX = e.pageX || e.changedTouches[0].pageX;
				pageX = pageX - this.left1;
				this.xMax = pageX;
			}
		},
		touchmove: function(e) {
			this.calculate(e);
		},
		px2upx: function(px) {
			return (750 / _windowWidth ) * px;
		},
		upx2px : function(upx){
			return (_windowWidth / 750) * upx;
		},
		calculate: function(e) {
			var pageX = e.pageX || e.changedTouches[0].pageX;
			pageX = pageX - this.left1;
			if(this.currentBlock == 'min'){
				var xMin = this.xMin + (pageX - this.xMin);
				// 最左侧限制
				if(xMin < 0){xMin = 0;}
				// 最右侧限制
				if(xMin >= this.realMax){xMin = this.realMax;}
				this.xMin = xMin;
				// 计算值
				var value = this.xMin / this.realMax * (this.max - this.min);
				value = parseInt(value);
				value = value + this.min;
				this.minValue = value;
			}else{
				var xMax = this.xMax + (pageX - this.xMax);
				// 最左侧限制
				if(xMax < 0){xMax = 0;}
				// 最右侧限制
				if(xMax >= this.realMax){xMax = this.realMax;}
				this.xMax = xMax;
				// 计算值
				var value = this.xMax / this.realMax * (this.max - this.min);
				value = parseInt(value);
				value = value + this.min;
				this.maxValue = value;
			}
			// 获得2个值并传递出去
			if(this.maxValue >= this.minValue){
				this.$emit('change', [this.minValue, this.maxValue]);
			}else{
				this.$emit('change', [this.maxValue, this.minValue]);
			}
		}
	}
};
</script>
<style scoped>
.grace-slider{}
.grace-slider-bar{position:absolute; top:0rpx;}
.grace-slider-block{position:absolute; top:0rpx; left:0; border-radius:500px; border-width:1px; border-style:solid; border-color:#F5F6F8;}
.grace-slider-active-bar{position:absolute; top:25rpx;}
</style>