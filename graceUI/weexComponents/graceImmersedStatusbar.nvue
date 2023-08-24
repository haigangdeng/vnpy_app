<template>
	<view>
		<view class="graceImmersedStatusbar" :class="[isFixed ? 'graceImmersedStatusbar-fixed' : '']" :style="{height:height, 'background-image':bgColor}"></view>
		<view :style="{height:height, width:'750rpx'}"></view>
	</view>
</template>
<script>
export default {
	props:{
		bgColor : {
			type : String,
			default : "none"
		},
		isFixed : {
			type : Boolean,
			default : false
		}
	},
	data(){
		return{
			height : '0px'
		}
	},
	created:function(){
		var res = uni.getSystemInfoSync();
		this.height = res.statusBarHeight  + 'px';
	}
}
</script>
<style scoped>
.graceImmersedStatusbar{height:20px; width:750rpx;}
.graceImmersedStatusbar-fixed{position: fixed; left:0; top:0;}
</style>