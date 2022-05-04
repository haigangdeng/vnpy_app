<template>
	<text class="link" @tap="openUrlForApp(url)" :style="{color:color, lineHeight:lineHeight, fontSize:fontSize}">{{title}}</text>
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
		openUrlForApp : function(url){
			plus.runtime.openURL(url);
		}
	}
}
</script>
<style scoped>
.link{color:#3688FF;}
</style>
