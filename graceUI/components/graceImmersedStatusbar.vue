<template>
	<view>
		<view class="graceImmersedStatusbar" :style="{background:bgColor, height:height}"></view>
		<view :style="{height:height, width:'100%'}"></view>
	</view>
</template>
<script>
export default {
	props:{
		bgColor : {
			type : String,
			default : "#FFF"
		}
	},
	data(){
		return{
			height : 0	
		}
	},
	created:function(){
		var res = uni.getSystemInfoSync();
		this.height = res.statusBarHeight  + 'px';
	}
}
</script>
<style scoped>
.graceImmersedStatusbar{height:20px; position:fixed; z-index:1; top:0; left:0; width:100%;}
</style>