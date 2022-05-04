<template>
	<view class="grace-swiper-card-wrap">
		<swiper :style="{width:width+'rpx', height:height+'rpx'}" class="grace-swiper-card" 
		:indicator-dots="false" :interval="interval" 
		:indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" 
		:duration="500" :circular="true" :autoplay="autoplay" :current="currentIndex" @change="swiperchange">
			<swiper-item v-for="(item, index) in swiperItems" :key="index" class="grace-swiper-card-item">
				<navigator class="grace-swiper-card-nav" :url="item.url" 
				:open-type="item.opentype" hover-class="none" v-if="item.opentype != 'click'">
					<image :style="{ borderRadius : borderRadius, width:width+'rpx', height:height+'rpx'}" 
					:src="item.img" class="grace-swiper-card-image" />
				</navigator>
				<view class="grace-swiper-card-nav" :data-index="index" @tap.stop="taped" 
				:url="item.url" :open-type="item.opentype" hover-class="none" v-if="item.opentype == 'click'">
					<image :style="{ borderRadius : borderRadius, width:width+'rpx', height:height+'rpx'}" 
					:src="item.img" class="grace-swiper-card-image" />
				</view>
				<view v-if="indicatorType == 'number'" class="grace-indicator-dot-numbers" 
				:style="{height:indicatorBarHeight+'rpx', backgroundColor:indicatorBarBgColor, 
				width:width+'rpx', left:'0rpx', bottom:'0rpx'}">
					<text class="grace-indicator-dot-text" 
					:style="{paddingLeft:'20rpx', 'fontStyle':'italic', color:titleColor}">{{index+1}}</text>
					<text class="grace-indicator-dot-text" :style="{'fontSize':'36rpx', color:titleColor}">/</text>
					<text class="grace-indicator-dot-text" 
					:style="{fontSize:'28rpx', paddingRight:'20rpx', fontStyle:'italic', color:titleColor}">{{swiperItems.length}}</text>
					<text class="grace-swiper-text" 
					:style="{color:titleColor, fontSize:titleSize, height:indicatorBarHeight+'rpx', 
					lineHeight:indicatorBarHeight+'rpx'}">{{item.title}}</text>
				</view>
			</swiper-item>
		</swiper>
		<view class="grace-indicator-dots" v-if="indicatorType == 'dot'" 
		:style="{width:width+'rpx', height:indicatorBarHeight+'rpx', position:indicatorPosition, 'justify-content':indicatorDirection}">
			<view class="grace-indicator-dots-wrap">
				<view v-for="(item, index) in swiperItems" :key="index" class="grace-indicator-dot" 
				:style="{
					width           : current != index ? indicatorWidth+'rpx' : indicatorActiveWidth +'rpx',
					height          : indicatorHeight+'rpx',
					borderRadius    : indicatorRadius+'rpx',
					backgroundColor : current != index ? indicatorColor : indicatorActiveColor}"></view>
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
	},
	methods:{
		swiperchange : function (e) {
			var current = e.detail.current;
			this.current = current;
			this.$emit('swiperchange', current);
		},
		taped:function (e) {
			this.$emit('taped', e.currentTarget.dataset.index);
		}
	}
}
</script>
<style scoped>
.grace-swiper-card-wrap{position:relative;}
.grace-swiper-card{overflow:hidden;}
.grace-swiper-card-item{font-size:0; overflow:hidden; line-height:0;}
.grace-swiper-card-nav{font-size:0; position:relative;}
.grace-swiper-card-image{}
.grace-indicator-dots{width:750rpx; height:68rpx; overflow:hidden; left:0; bottom:0; flex-direction:row; flex-wrap:nowrap; align-items:center; justify-content:center;}
.grace-indicator-dots-wrap{flex-direction:row; flex-wrap:nowrap; padding:0 20rpx;}
.grace-indicator-dot{margin:6rpx;}
.grace-indicator-dot-text{text-align:center; line-height:68rpx; padding:0 4rpx; color:#FFFFFF; font-size:32rpx;}
.grace-indicator-dot-numbers{flex-direction:row; flex-wrap:nowrap; justify-content:center; overflow:hidden; align-items:center; position:absolute; z-index:1; left:0; bottom:0;}
.grace-swiper-text{width:700rpx; line-height:68rpx; padding-right:25rpx; overflow:hidden; text-overflow:ellipsis; flex:1;}
</style>