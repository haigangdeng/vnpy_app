<template>
	<view class="grace-scroll-body">
		<text class="grace-scroll-msg" 
		:style="{marginLeft:ml+'px', fontSize:fontSize, fontWeight:fontWeight, color:color}" ref="mainText">{{msg}}</text>
	</view>
</template>
<script>
const dom = weex.requireModule('dom');
export default {
	props:{
		msg : {
			type : String,
			default : ""
		},
		fontSize : {
			type : String,
			default : "26rpx"
		},
		color : {
			type : String,
			default : "#333333"
		},
		fontWeight : {
			type : String,
			default : ""
		}
	},
	data() {
		return {
			ml: 0
		}
	},
	created:function(){
		setTimeout(()=>{
			var el = this.$refs.mainText;
			dom.getComponentRect(el, (res) => {
				this.animate(res.size.width);
			});
		}, 500);
	},
	methods:{
		animate : function (w) {
			if(this.ml <= w*-1){
				this.ml = w;
			}else{
				this.ml = this.ml - 1;
			}
			setTimeout(()=>{
				this.animate(w);
			}, 10);
		}
	}
}
</script>
<style scoped>
.grace-scroll-body{line-height:60rpx; height:60rpx; overflow:hidden;}
.grace-scroll-msg{line-height:60rpx; height:60rpx; white-space:nowrap; font-size:26rpx;}
</style>