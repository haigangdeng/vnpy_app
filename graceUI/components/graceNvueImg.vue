<template>
	<view class="grace-img" 
	:style="{width:width+'rpx', height:height == 0 ? imgHeight+'rpx' : height+'rpx'}">
		<image :src="src" @load="imgLoad" 
		:style="{width:width+'rpx', height:imgHeight+'rpx', borderRadius:borderRadius, opacity:opacity}"></image>
		<text class="grace-img-loading grace-icons" v-if="isLoading" 
		:style="{width:width+'rpx', height:height == 0 ? imgHeight+'rpx' : height+'rpx', lineHeight:height == 0 ? imgHeight+'rpx' : height+'rpx', borderRadius:borderRadius}">&#xe63a;</text>
	</view>
</template>
<script>
export default{
	props:{
		src:{type:String, default:''},
		width:{type:Number, default:300},
		height:{type:Number, default:300},
		timer : {type:Number,default:300},
		borderRadius:{type:String, default:'0rpx'}
	},
	data() {
		return {
			isLoading : true,
			imgHeight : 300,
			opacity   : 0
		}
	},
	methods:{
		imgLoad : function (e) {
			var scale      = e.detail.width / e.detail.height;
			this.imgHeight = this.width / scale;
			setTimeout(() => {this.isLoading = false; this.opacity = 1;}, this.timer);
		}
	}
}
</script>
<style scoped>
.grace-img{width:300rpx; height:300rpx; overflow:hidden; font-size:0;}
.grace-img-loading{position:absolute; left:0; top:0; background-color:#F8F8F8; font-size:80rpx; color:#999999; text-align:center;}
</style>