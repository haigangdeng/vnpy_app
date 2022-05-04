<template>
	<view class="graceProgressButton" :class="[val > 0 && val < 100 ? 'ganimate' : '']" :style="{height:height+'rpx', lineHeight:height+'rpx', borderRadius:borderRadius, background:background}">
		<text :style="{fontSize:fontSize+'rpx', color:color}">{{(val > 0 && val < 100) ? progressText + val + '%' : buttonText}}</text>
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
@keyframes gradientBG{0% {opacity:1; } 50% { opacity:0.8;} 80% { opacity:1;}}
.graceProgressButton{position:relative; border-radius:0rpx; text-align:center; width:100%;}
.ganimate{animation:gradientBG 1.5s linear infinite;}
</style>