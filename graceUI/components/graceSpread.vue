<template name="graceSpread">
	<view class="grace-spread" :style="{height:reHeight, width:width}">
		<view :style="{paddingBottom: !isBtn && isShrink ? '80rpx' : '0rpx'}"><slot></slot></view>
		<view v-if="isBtn" class="grace-spread-btn" @tap.stop="spreadContent" 
		:style="{color:btnColor, fontSize:btnTxtSize, zIndex:zIndex}">{{btnTxt}}<text :style="{color:btnColor}" class="grace-icons" style="padding-left:12rpx;">&#xe69d;</text></view>
		<view v-if="!isBtn && isShrink" class="grace-spread-btn" @tap.stop="shrinkContent"
		:style="{color:btnColor, fontSize:btnTxtSize, zIndex:zIndex}">{{shrinkBtnTxt}}<text :style="{color:btnColor}" class="grace-icons" style="padding-left:12rpx;">&#xe638;</text></view>
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
		zIndex:{
			type:Number,
			default:1
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
			// #ifdef MP-BAIDU
			this.reHeight = '';
			// #endif
			// #ifndef MP-BAIDU
			this.reHeight = 'auto';
			// #endif
			this.isBtn = false;
		},
		shrinkContent : function () {
			this.reHeight = this.height;
			this.isBtn = true;
		}
	},
}
</script>
<style scoped>
.grace-spread{overflow:hidden; position:relative;}
.grace-spread-btn{ width:100%; height:38px;  line-height:38px; background:linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.8) 25%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%); position:absolute; z-index:999999; left:0; bottom:0; text-align:center;}
</style>