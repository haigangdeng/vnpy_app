<template>
	<view>
		<view class="grace-header" :style="{backgroundImage:background, height:viewHeight+'px', 'padding-top':top+'px'}">
			<slot></slot>
		</view>
		<!-- 占位 view -->
		<view :style="{height:viewHeight+'px'}" v-if="isSeize"></view>
	</view>
</template>
<script>
export default {
	props: {
		background:{
			type : String,
			default : "linear-gradient(to right, #3688FF, #3688FF)"
		},
		height:{
			type : Number,
			default : 90
		},
		haveStatusBar:{
			type : Boolean,
			default : true
		},
		isSeize: {
		  type: Boolean,
		  default: true
		}
	},
	data(){
		return{
			top : 0,
			BoundingWidth :'0px',
			viewHeight : 80
		}
	},
	created:function(){
		var res         = uni.getSystemInfoSync();
		this.top        = res.statusBarHeight;
		this.viewHeight = uni.upx2px(this.height) + this.top;
	}
}
</script>
<style scoped>
.grace-header{width:750rpx; position:fixed; left:0; top:0; height:44px; flex-direction:row; flex-wrap:nowrap;}
.grace-header-main{width:750rpx; flex:1;}
</style>