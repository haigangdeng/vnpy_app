<template>
	<view>
		<swiper :style="{width:width, height:height}" class="grace-swiper-card" :current="currentIndex" 
		:indicator-dots="indicatorDots" :interval="interval" :indicator-color="indicatorColor" :indicator-active-color="indicatorActiveColor" :circular="true" :autoplay="autoplay" @change="swiperchange">
			<swiper-item v-for="(item, index) in swiperItems" :key="index" class="grace-swiper-card-item">
				<view :data-url="item.url" :data-opentype="item.opentype" @tap="navto">
					<image :style="{borderRadius : borderRadius, width:width, height:height}" 
					:src="item.img" class="grace-swiper-card-image" mode="widthFix" />
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
export default{
	props:{
		width:{
			type : String,
			default : "750rpx"
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
			current : 0
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
		},
		navto : function (e) {
			var url = e.currentTarget.dataset.url;
			var type = e.currentTarget.dataset.opentype;
			switch (type){
				case 'switchTab':
					uni.switchTab({
						url:url
					});
					break;
				case 'navigate':
					uni.navigateTo({
						url:url
					});
					break;
				case 'redirect':
					uni.redirectTo({
						url:url
					});
					break;
				default:
					break;
			}
		}
	}
}
</script>
<style scoped>
.grace-swiper-card-item{font-size:0; overflow:hidden;}
</style>