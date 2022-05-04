<template>
	<view class="grace-swiper-card-wrap">
		<swiper :style="{width:width+'rpx', height:heightIn+'rpx'}" class="grace-swiper-card" 
		:indicator-dots="false" :interval="interval" :circular="true" :autoplay="autoplay" :current="currentIndex" 
		:previous-margin="spacing+'rpx'" :next-margin="spacing+'rpx'" @change="swiperchange">
			<swiper-item v-for="(item, index) in swiperItems" :key="index" class="grace-swiper-card-item">
				<navigator class="grace-swiper-card-nav" :url="item.url" :open-type="item.opentype" hover-class="none" v-if="item.opentype != 'click'" 
				:style="{paddingLeft:current != index ? padding +'rpx':'0rpx',
				paddingRight:current != index ? padding +'rpx':'0rpx',
				paddingTop:current != index ? paddingY +'rpx':'0rpx',
				paddingBottom:current != index ? paddingY +'rpx':'0rpx',
				transition: 'all 0.2s ease-in 0s'}">
					<image :style="{
						borderRadius : borderRadius, 
						transition: 'all 0.2s ease-in 0s',
						width:current != index ? widthInSamll+'rpx':widthIn+'rpx',
						height:current != index ? heightInSmall+'rpx':heightIn+'rpx',
						opacity:current != index ? opacity : 1}" 
						:src="item.img" class="grace-swiper-card-image" />
				</navigator>
				<view class="grace-swiper-card-nav" hover-class="none" v-if="item.opentype == 'click'" @tap.stop="taped" :data-index="index" 
				:style="{paddingLeft:current != index ? padding +'rpx':'0rpx',
				paddingRight:current != index ? padding +'rpx':'0rpx',
				paddingTop:current != index ? paddingY +'rpx':'0rpx',
				paddingBottom:current != index ? paddingY +'rpx':'0rpx',
				transition: 'all 0.2s ease-in 0s'}">
					<image :style="{
						borderRadius : borderRadius, 
						transition: 'all 0.2s ease-in 0s',
						width:current != index ? widthInSamll+'rpx':widthIn+'rpx',
						height:current != index ? heightInSmall+'rpx':heightIn+'rpx',
						opacity:current != index ? opacity : 1}" 
					:src="item.img" class="grace-swiper-card-image" />
				</view>
				<view v-if="indicatorType == 'number'" class="grace-indicator-dot-numbers" 
				:style="{
					height:indicatorBarHeight+'rpx', background:indicatorBarBgColor, 
					width:current != index ? widthInSamll+'rpx':widthIn+'rpx', 
					left:current != index ? padding+'rpx':'0rpx', bottom:current != index ? paddingY+'rpx':'0rpx'}">
					<text class="grace-indicator-dot-text" 
					:style="{paddingLeft:'20rpx', 'fontStyle':'italic', color:titleColor}">{{index+1}}</text>
					<text class="grace-indicator-dot-text" 
					:style="{'fontSize':'36rpx', color:titleColor}">/</text>
					<text class="grace-indicator-dot-text" 
					:style="{fontSize:'28rpx', paddingRight:'20rpx', fontStyle:'italic', color:titleColor}">{{swiperItems.length}}</text>
					<text class="grace-swiper-text" 
					:style="{color:titleColor, fontSize:titleSize, height:indicatorBarHeight+'rpx', 
					lineHeight:indicatorBarHeight+'rpx'}">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="grace-indicator-dots" v-if="indicatorType == 'dot'" 
		:style="{width:width+'rpx', height:indicatorBarHeight+'rpx', position:indicatorPosition, 
		paddingLeft:spacing+'rpx', paddingRight:spacing+'rpx', 'justify-content':indicatorDirection}">
			<view class="grace-indicator-dots-wrap">
				<view v-for="(item, index) in swiperItems" :key="index" 
				:class="['grace-indicator-dot',current == index ? 'dot-show' : '']" 
				:style="{
					width           : current != index ? indicatorWidth+'rpx' : indicatorActiveWidth +'rpx',
					height          : indicatorHeight+'rpx',
					borderRadius    : indicatorRadius+'rpx',
					background      : current != index ? indicatorColor : indicatorActiveColor}"></view>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		width:{ type : Number, default : 750 },
		height:{ type : Number, default : 300 },
		swiperItems : { type : Array, default : function(){return new Array();} },
		borderRadius : { type : String, default : '10rpx'},
		indicatorBarHeight:{type : Number, default : 68},
		indicatorBarBgColor:{type : String, default : 'rgba(0,0,0,0)'},
		indicatorWidth : { type:Number, default:18 },
		indicatorActiveWidth :{ type:Number, default:18 },
		indicatorHeight : { type:Number, default:18 },
		indicatorRadius:{ type:Number, default:18 },
		indicatorColor : { type : String, default : "rgba(255, 255, 255, 0.6)" },
		indicatorActiveColor : { type : String, default : "#3688FF" },
		indicatorType:{ type : String, default : "dot" },
		indicatorPosition:{ type : String, default : "absolute" },
		indicatorDirection:{type:String, default:'center'},
		spacing : { type : Number, default : 50 },
		padding : { type : Number, default : 26 },
		interval : { type : Number, default : 5000 },
		autoplay : { type : Boolean, default : true },
		currentIndex : { type : Number, default : 0 },
		opacity:{ type : Number, default:0.66},
		titleColor:{type:String, default:"#FFFFFF"},
		titleSize:{type:String, default:"28rpx"}
	},
	data() {
		return {
			current : 0,
			isReady : false,
			widthIn : 750,
			heightIn  : 300,
			widthInSamll:700,
			heightInSmall:280,
			paddingY:0
		}
	},
	watch:{
		currentIndex : function (val) {
			this.current = val;
		}
	},
	created:function(){
		this.current = this.currentIndex;
		this.init();
	},
	methods:{
		init : function(){
			// 图片宽高计算
			this.widthIn   = this.width - this.spacing*2;
			this.heightIn  = this.height / this.width * this.widthIn;
			this.paddingY  = this.padding * this.height / this.width;
			this.widthInSamll  = this.widthIn -  this.padding * 2;
			this.heightInSmall = this.heightIn - this.paddingY * 2;
		},
		swiperchange : function (e) {
			var current = e.detail.current;
			this.current = current;
			this.$emit('swiperchange', current);
		},
		taped : function(e){
			this.$emit('taped', e.currentTarget.dataset.index);
		}
	}
}
</script>
<style scoped>
.grace-swiper-card-wrap{position:relative;}
.grace-swiper-card{overflow:hidden;}
.grace-swiper-card-item{box-sizing:border-box; font-size:0; overflow:hidden; line-height:0;}
.grace-swiper-card-nav{font-size:0; display:block; position:relative;}
.grace-swiper-card-image{}
.grace-indicator-dots{width:750rpx; height:68rpx; overflow:hidden; z-index:1; left:0; bottom:0; display:flex; flex-direction:row; flex-wrap:nowrap; box-sizing:border-box; align-items:center; justify-content:center;}
.grace-indicator-dot{margin:6rpx;}
.grace-indicator-dots-wrap{display:flex; flex-direction:row; flex-wrap:nowrap; padding:0 20rpx;}
.grace-indicator-dot-text{display:block; text-align:center; line-height:68rpx; padding:0 4rpx; color:#FFFFFF; font-size:32rpx; flex-shrink:0;}
.grace-indicator-dot-numbers{display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:center; overflow:hidden; align-items:center; position:absolute; z-index:1; left:0; bottom:0;}
.grace-swiper-text{width:750rpx; line-height:68rpx; padding-right:25rpx; box-sizing:border-box; overflow:hidden; white-space:nowrap; text-overflow:ellipsis;}
@keyframes dot-show{from{opacity:0.1;}to{opacity:1;}}
.dot-show{animation:dot-show 300ms linear forwards;}
</style>
