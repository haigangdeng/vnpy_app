<template name="graceSpeaker">
	<view class="grace-swiper-msg">
		<view class="grace-swiper-msg-icon"><slot></slot></view>
		<swiper :vertical="vertical" autoplay="true" circular="true" @change="change" 
		:interval="interval" class="grace-swiper-msg-swiper" :style="{height:height}">
			<swiper-item v-for="(item, index) in msgs" :key="index" class="grace-swiper-msg-swiper-item" :style="{height:height}">
				<text @tap="navto"
				:data-url="item.url" :data-opentype="item.opentype" class="grace-swiper-msg-text" 
				:style="{fontSize:fontSize, color:fontColor, height:height, lineHeight:height, fontWeight:fontWeight}">{{item.title}}</text>
			</swiper-item>
	  </swiper>
	</view>
</template>
<script>
export default {
	name: "graceSpeaker",
	props: {
		msgs : {
			type  : Array,
			default : function(){return [];}
		},
		interval : {
			type : Number,
			default: 5000
		},
		vertical : {
			type : Boolean,
			default : true
		},
		fontSize : {
			type  : String,
			default : "26rpx"
		},
		fontColor : {
			type  : String,
			default : "#333333"
		},
		fontWeight : {
			type  : String,
			default : ""
		},
		height:{
			type  : String,
			default : "60rpx"
		},
		fontWeight : {
			type  : String,
			default : ""
		}
	},
	methods:{
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
		},
		change:function (index) {
			this.$emit('change', index.detail.current);
		}
	}
}
</script>
<style scoped>
.grace-swiper-msg{flex-wrap:nowrap; flex-direction:row; align-items:center;}
.grace-swiper-msg-icon{margin-right:16rpx;}
.grace-swiper-msg-swiper{width:750rpx; flex:1; height:60rpx; overflow:hidden;}
.grace-swiper-msg-swiper-item{line-height:60rpx; height:60rpx; overflow:hidden;}
.grace-swiper-msg-text{line-height:60rpx; height:60rpx; overflow:hidden; font-size:28rpx;}
</style>