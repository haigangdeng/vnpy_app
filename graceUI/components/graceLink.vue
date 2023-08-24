<template>
	<!-- #ifdef APP-PLUS -->
	<text class="link" :data-url="url" @tap="openUrlForApp" :style="{color:color, lineHeight:lineHeight, fontSize:fontSize}">{{title}}</text>
	<!-- #endif -->
	<!-- #ifdef H5 -->
	<a :href="url" class="link" target="_blank" :style="{color:color, lineHeight:lineHeight, fontSize:fontSize}">{{title}}</a>
	<!-- #endif -->
	<!-- #ifdef MP -->
	<text class="link" :style="{color:color, lineHeight:lineHeight, fontSize:fontSize}">{{url}}</text>
	<!-- #endif -->
</template>
<script>
export default {
	props: {
		url:{
			type : String,
			default : ""
		},
		title : {
			type : String,
			default : ""
		},
		color:{
			type : String,
			default : "#3688FF"
		},
		fontSize : {
			type : String,
			default : "28rpx"
		},
		lineHeight : {
			type : String,
			default : "50rpx"
		}
	},
	methods:{
		openUrlForApp : function(e){
			var link = e.currentTarget.dataset.url;
			plus.runtime.openURL(link);
		}
	}
}
</script>
<style scoped>
.link{text-decoration:none;}
</style>
