<template>
	<view class="graceRightMessage" v-if="showIn" 
	:style="{
		zIndex:zIndex, bottom:bottom, backgroundColor:background, width:status == 1 ? width : minWidth, 
		height:height, borderRadius:height}">
		<view class="graceRightMessageIcon"><slot name="icon"></slot></view>
		<view class="graceRightMessageContent"><slot name="content"></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		zIndex : {type:Number, default:99},
		bottom : {type:String, default:'150rpx'},
		width  : {type:String, default:'360rpx'},
		height : {type:String, default:'80rpx'},
		minWidth : {type:String, default:'180rpx'},
		background : {type:String, default:'#3688FF'}
	},
	data() {
		return {
			showIn : true,
			status : 1
		}
	},
	methods:{
		open:function () {
			this.status = 1;
		},
		hide:function(){
			this.showIn = false;
		},
		shrink:function(){
			this.status = 2;
		},
		show:function(){
			this.showIn = true;
		}
	}
}
</script>
<style scoped>
.graceRightMessage{position:fixed; right:-100rpx; bottom:0; padding:10rpx; overflow:hidden; flex-direction:row; flex-wrap:nowrap; align-items:center; padding-right:100rpx;}
.graceRightMessageIcon{text-align:center;}
.graceRightMessageContent{width:1rpx; flex:1}
</style>