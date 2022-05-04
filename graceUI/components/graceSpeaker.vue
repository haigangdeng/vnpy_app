<template name="graceSpeaker">
	<view class="grace-swiper-msg">
		<view class="grace-swiper-msg-icon" :class="[iconClass]" :style="{color:iconColor}"></view>
		<swiper class="grace-swiper-msg-swiper" 
		:vertical="vertical" @change="change" autoplay="true" circular="true" :interval="interval" :style="{height:height}">
			<swiper-item class="grace-swiper-item" 
			v-for="(item, index) in msgs" :key="index" :style="{height:height}">
				<navigator class="grace-swiper-msg-navigator" 
				:url="item.url" :open-type="item.opentype" 
				:style="{fontSize:fontSize, fontWeight:fontWeight, color:fontColor, height:height, lineHeight:height}">{{item.title}}</navigator>
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
		iconClass : {
		  type  : String,
		  default : ""
		},
		iconColor : {
		  type  : String,
		  default : "#3688FF"
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
		}
	},
	methods:{
		change:function (index) {
			this.$emit('change', index.detail.current);
		}
	}
}
</script>
<style scoped>
.grace-swiper-msg{width:100%; display:flex; flex-wrap:nowrap; align-items:center;}
.grace-swiper-msg-icon{margin-right:16rpx; display:inline-block; flex-shrink:0;}
.grace-swiper-msg-swiper{width:100%; height:60rpx; overflow:hidden;}
.grace-swiper-item{overflow:hidden;}
.grace-swiper-msg-navigator{line-height:60rpx; overflow:hidden;}
</style>