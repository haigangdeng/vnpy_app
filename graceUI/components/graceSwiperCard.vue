<template>
	<view>
		<swiper :style="{width:width, height:height}" class="grace-swiper-card" 
		:indicator-dots="indicatorDots" :interval="interval" 
		:indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" 
		:duration="500" :circular="true" :autoplay="autoplay" :current="currentIndex" 
		:previous-margin="spacing" :next-margin="spacing" @change="swiperchange">
			<swiper-item v-for="(item, index) in swiperItems" :key="index" class="grace-swiper-card-item">
				<navigator :url="item.url" :open-type="item.opentype" hover-class="none" :style="{padding :padding}">
					<image :style="{borderRadius : borderRadius}" 
					:src="item.img" class="grace-swiper-card-image" 
					:class="[
						current != index && scale ? 'grace-swiper-card-img-small' : '',
						current == index && isReady ? 'grace-swiper-card-img-big' : ''
					]" mode="widthFix" />
				</navigator>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
export default{
	props:{
		width:{
			type : String,
			default : "100%"
		},
		height:{
			type : String,
			default : "300rpx"
		},
		swiperItems : {
			type : Array,
			default : function(){return new Array();}
		},
		borderRadius : {
			type : String,
			default : '5rpx'
		},
		indicatorColor : {
			type : String,
			default : "rgba(0, 0, 0, 0.2)"
		},
		indicatorActiveColor : {
			type : String,
			default : "#3688FF"
		},
		spacing : {
			type : String,
			default : "50rpx"
		},
		interval : {
			type : Number,
			default : 5000
		},
		padding:{
			type : String,
			default : '0 10rpx'
		},
		scale : {
			type : Boolean,
			default : true
		},
		autoplay : {
			type : Boolean,
			default : true
		},
		currentIndex : {
			type : Number,
			default : 0
		},
		indicatorDots:{
			type : Boolean,
			default:true
		}
	},
	data() {
		return {
			current : 0,
			isReady : false
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
			this.current = e.detail.current;
			this.$emit('swiperchange', this.current);
			this.isReady = true;
		}
	}
}
</script>
<style scoped>
.grace-swiper-card-item{box-sizing: border-box; font-size:0; overflow:hidden;}
.grace-swiper-card-image{width:100%;}
.grace-swiper-card-img-small{transform:scaleY(0.88); opacity:0.8; transform-origin:center center;}
.grace-swiper-card-img-big{transform:scaleY(1); opacity:1; transform-origin:center center; transition:300ms linear;}
</style>
