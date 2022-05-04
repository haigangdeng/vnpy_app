<template>
	<view class="graceProgressButton" :style="{height:height+'rpx', borderRadius:borderRadius, backgroundColor:background}">
		<text 
		:style="{fontSize:fontSize+'rpx', color:color, lineHeight:height+'rpx', textAlign:'center'}">{{val > 0 && val < 100 ? progressText + val + '%' : buttonText}}</text>
	</view>
</template>
<script>
export default{
	props:{
		height : {
			type : Number,
			default : 80
		},
		fontSize : {
			type : Number,
			default : 30
		},
		val : {
			type : Number,
			default : 0
		},
		buttonText : {
			type : String,
			default : ""
		},
		color : {
			type : String,
			default : "#FFFFFF"
		},
		background:{
			type : String,
			default : "#5CC72F"
		},
		borderRadius : {
			type : String,
			default : "6rpx"
		},
		progressText : {
			type : String,
			default : "已下载 : "
		}
	}
}
</script>
<style scoped>
.graceProgressButton{border-radius:0rpx; text-align:center;}
</style>