<template>
	<view class="grace-empty">
		<text class="grace-empty-icon grace-icons" v-if="iconType == 1" :style="{fontSize:iconSize+'rpx', lineHeight:(iconSize+10)+'rpx', color:iconColor}">&#xe704;</text>
		<text class="grace-empty-icon grace-icons" v-if="iconType == 2" :style="{fontSize:iconSize+'rpx', lineHeight:(iconSize+10)+'rpx', color:iconColor}">&#xe736;</text>
		<text class="grace-empty-icon grace-icons" v-if="iconType == 3" :style="{fontSize:iconSize+'rpx', lineHeight:(iconSize+10)+'rpx', color:iconColor}">&#xe644;</text>
		<text class="grace-empty-text" v-if="text != ''" :style="{fontSize:textSize+'rpx', lineHeight:(textSize+10)+'rpx', color:textColor}">{{text}}</text>
		<slot></slot>
	</view>
</template>
<script>
export default {
	props: {
		iconType  : { type: Number,  default : 1},
		iconSize  : { type: Number,  default : 80},
		iconColor : { type: String,  default : "#999999"},
		textSize  : { type: Number,  default : 26},
		textColor : { type: String,  default : "#999999"},
		text      : { type: String,  default :''}
	}
}
</script>
<style scoped>
.grace-empty{}
.grace-empty-icon{text-align:center;}
.grace-empty-text{padding:20rpx 0; text-align:center;}
</style>