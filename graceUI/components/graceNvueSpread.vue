<template name="graceSpread">
	<view class="grace-spread" :style="{height:reHeight, width:width}">
		<view :style="{paddingBottom: !isBtn && isShrink ? '80rpx' : '0rpx'}"><slot></slot></view>
		<view v-if="isBtn" class="grace-spread-btn" @tap.stop="spreadContent" :style="{width:width, backgroundColor:isBtn ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0)'}">
			<text :style="{color:btnColor, fontSize:btnTxtSize}">{{btnTxt}}</text>
			<text :style="{color:btnColor, fontSize:btnTxtSize}" class="grace-icons" style="padding-left:12rpx;">&#xe69d;</text>
		</view>
		<view v-if="!isBtn && isShrink" class="grace-spread-btn" @tap="shrinkContent" :style="{width:width, backgroundColor:!isBtn && isShrink ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.1)'}">
			<text :style="{color:btnColor, fontSize:btnTxtSize}">{{shrinkBtnTxt}}</text>
			<text :style="{color:btnColor, fontSize:btnTxtSize}" class="grace-icons" style="padding-left:12rpx;">&#xe638;</text>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		width:{
			type : String,
			default : "700rpx"
		},
		height:{
			type : String,
			default : "600rpx"
		},
		btnTxt:{
			type : String,
			default : "展开阅读全文"
		},
		btnColor:{
			type : String,
			default : "#999999"
		},
		btnTxtSize:{
			type : String,
			default : "28rpx"
		},
		isShrink:{type:Boolean,default:false},
		shrinkBtnTxt:{type : String,default : "收缩展示"}
	},
	data() {
		return {
			reHeight: "600px",
			isBtn : true
		}
	},
	created:function(){
		this.reHeight = this.height;
	},
	methods: {
		spreadContent : function () {
			this.reHeight = '';
			this.isBtn = false;
		},
		shrinkContent : function () {
			console.log('ok');
			this.reHeight = this.height;
			this.isBtn = true;
		}
	},
}
</script>
<style scoped>
.grace-spread{overflow:hidden;}
.grace-spread-btn{flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; height:80rpx; line-height:80rpx; position:absolute; left:0; bottom:0;}
</style>