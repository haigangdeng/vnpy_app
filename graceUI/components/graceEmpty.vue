<template>
	<view class="grace-empty">
		<view :class="['grace-empty-icon', 'grace-empty-icon'+iconType]" :style="{fontSize:iconSize+'rpx', lineHeight:(iconSize+10)+'rpx', color:iconColor}"></view>
		<view class="grace-empty-text" v-if="text != ''" :style="{fontSize:textSize+'rpx', lineHeight:(textSize+10)+'rpx', color:textColor}">{{text}}</view>
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
	},
}
</script>
<style scoped>
.grace-empty{width:100%;}
.grace-empty-icon{text-align:center;}
.grace-empty-text{padding:20rpx 0; text-align:center;}
@font-face{
	font-family:"graceEmptyFont"; 
	src:url('https://at.alicdn.com/t/font_1348648_qbg88v58i.ttf') format('truetype');
}
.grace-empty-icon1:before{font-family: "graceEmptyFont" !important; content:"\e736";}
.grace-empty-icon2:before{font-family: "graceEmptyFont" !important; content:"\e600";}
.grace-empty-icon3:before{font-family: "graceEmptyFont" !important; content:"\e704";}
.grace-empty-icon4:before{font-family: "graceEmptyFont" !important; content:"\e66e";}
.grace-empty-icon5:before{font-family: "graceEmptyFont" !important; content:"\e644";}
</style>