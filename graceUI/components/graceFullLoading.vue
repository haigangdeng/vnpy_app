<template name="graceFullLoading">
	<view class="grace-full-loading" 
	:style="{
		background:background,
		height:graceFullLoading?'100%':'0px',
		opacity:graceFullLoading?1:0}" 
	@tap.stop="stopFun" @touchmove.stop.prevent="stopFun">
		<view class="content">
			<view class="image"><image :src="logoUrl" mode="widthFix" :style="{width:size, height:size}"></image></view>
			<view class="text" :style="{fontSize:fontSize, color:textColor}">{{text}}</view>
		</view>
	</view>
</template>
<script>
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
		size : {
			type    : String,
			default : "138rpx"
		},
		fontSize : {
			type    : String,
			default : "22rpx"
		},
		textColor : {
			type    : String,
			default : "#999999"
		},
		background : {
			type    : String,
			default : 'rgba(255,255,255,1)'
		}
	},
	methods:{
		stopFun : function(){return false;}
	}
}
</script>
<style scoped>
@keyframes grace-fade{0%{opacity:0.6;} 25%{opacity:1;} 50%{opacity:0.6;} 75%{opacity:1;} 100%{opacity:0.6;}}
.grace-full-loading{width:100%; background:#FFFFFF; position:fixed; z-index:9999; top:0; left:0; bottom:0; overflow:hidden;}
.grace-full-loading .content{width:300rpx; height:auto; position:absolute; z-index:100; left:50%; top:50%; transform:translate(-50%, -50%); animation:grace-fade 3500ms infinite linear; opacity:0.6; padding:10rpx;}
.grace-full-loading .image{text-align:center; font-size:0;}
.grace-full-loading .image image{width:138rpx; height:138rpx; border-radius:138rpx;}
.grace-full-loading .text{line-height:1.5em; font-size:22rpx; margin-top:6px; text-align:center;}
</style>