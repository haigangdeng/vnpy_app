<template>
	<view class="graceRightMessage" v-if="showIn" 
	:style="{
		zIndex:zIndex, bottom:bottom, background:background, width:status == 1 ? width : minWidth, 
		height:height, borderTopLeftRadius:height, borderBottomLeftRadius:height}">
		<view class="graceRightMessageIcon"><slot name="icon"></slot></view>
		<view class="graceRightMessageContent"><slot name="content"></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		zIndex : {type:Number, default:99},
		bottom : {type:String, default:'150rpx'},
		width  : {type:String, default:'260rpx'},
		height : {type:String, default:'80rpx'},
		minWidth : {type:String, default:'80rpx'},
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
.graceRightMessage{position:fixed; right:0; bottom:0; padding:10rpx; box-sizing:border-box; overflow:hidden; display:flex; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.graceRightMessageIcon{text-align:center; flex-shrink:0;}
.graceRightMessageContent{width:700rpx;}
</style>