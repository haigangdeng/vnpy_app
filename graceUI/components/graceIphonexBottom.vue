<template>
	<view>
		<view :class="['grace-iphonex-bottom', isFixed ? 'grace-iphonex-bottom-fixed' : '']" :style="{height:height, background:bgcolor}"></view>
		<view :style="{width:'100%', height:height}" v-if="isFixed"></view>
	</view>
</template>
<script>
export default{
	props:{
		bgcolor : {
			type : String,
			default : '#FFFFFF'
		},
		isFixed : {
			type : Boolean,
			default : true
		}
	},
	data() {
		return {
			height:'0rpx'
		}
	},
	created : function () {
		var _self = this;
		// #ifdef MP
		uni.getSystemInfo({
			success: function(res) {
				var model = res.model;
				model = model.replace(' ', '');
				if (model.search('iPhoneX') != -1){
				   _self.height = '50rpx';
				}
			}
		})
		// #endif
	} 
}
</script>
<style scoped>
.grace-iphonex-bottom{width:100%; height:0rpx; flex:auto;}
.grace-iphonex-bottom-fixed{position:fixed; z-index:999999; left:0; bottom:0;}
</style>
