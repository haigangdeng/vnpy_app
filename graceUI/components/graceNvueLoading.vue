<template>
	<view class="grace-loading grace-ellipsis"  v-if="loadingType < 4">
		<text class="grace-loading-icon grace-icons" ref="loadingIcon" v-if="loadingType === 1" :style="{color:iconColor}">&#xe9db;</text>
		<text class="grace-loading-text" :style="{color:textColor}">{{loadingText[loadingType]}}</text>
	</view>
</template>
<script>
const animation = weex.requireModule('animation');
export default {
	props: {
		loadingType: {
			type : Number,
			default: 0
		},
		loadingText : {
			type  : Array,
			default : function () {
				return ["上拉加载更多", "正在努力加载", "已经加载全部数据",'',''];
			}
		},
		iconColor : {
			type : String,
			default : "#888888"
		},
		textColor : {
			type : String,
			default : "#888888"
		}
	},
	watch:{
		loadingType : function (nval, oval) {
			if(nval == 1){
				setTimeout(()=>{this.rotate360();}, 300);
			}
		}
	},
	methods: {
		rotate360 : function(){
			var el = this.$refs.loadingIcon;
			animation.transition(el, {
				styles: {transform: 'rotate(7200deg)'},
				duration: 20000,
				timingFunction: 'linear',
				needLayout:false,
				delay: 0
			});
		}
	}
}
</script>
<style scoped>
.grace-loading{flex-direction:row; flex-wrap:nowrap; justify-content:center; padding:16rpx 0; padding-bottom:36rpx; align-items:center;}
.grace-loading-text{margin-left:12rpx; font-size:26rpx;}
.grace-loading-icon{width:40rpx; height:40rpx; justify-content:center; line-height:40rpx; font-size:30rpx; text-align:center;}
</style>