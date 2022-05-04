<template>
	<view class="grace-fixed-msg" :style="{width:width+'rpx', bottom:bottom+'rpx', left:(( 750 - width ) / 2) + 'rpx'}" v-if="show" @tap.stop="tapme">
		<text class="grace-fixed-msg-icon grace-icons" :style="{color:color}">&#xe666;</text>
		<text class="grace-fixed-msg-text" :style="{color:color}">{{msg}}</text>
		<text class="grace-fixed-msg-icon grace-icons" :style="{color:color}">&#xe601;</text>
	</view>
</template>
<script>
export default {
	props:{
		msg : {
			type : String,
			default : ""
		},
		color : {
			type : String,
			default : "#008CFF"
		},
		width : {
			type : Number,
			default : 300
		},
		bottom : {
			type : Number,
			default : 80
		},
		show : {
			type : Boolean,
			default : true
		}
	},
	methods:{
		tapme : function(){
			this.$emit('tapme');
		}
	}
}
</script>
<style scoped>
.grace-fixed-msg{width:300rpx; flex-direction:row; flex-wrap:nowrap; align-items:center; padding:0rpx 20rpx; height:70rpx; border-radius:50rpx; background-color:#F6F7F8; position:fixed; bottom:60rpx;}
.grace-fixed-msg-icon{width:40rpx; height:40rpx; line-height:40rpx; font-size:30rpx; color:#3688FF; opacity:0.6; text-align:center;}
.grace-fixed-msg-text{width:500rpx; line-height:70rpx; font-size:28rpx; color:#008CFF; height:70rpx; text-align:center; flex: 1;}
</style>