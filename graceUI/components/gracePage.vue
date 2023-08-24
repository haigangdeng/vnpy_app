<template>
	<view class="grace-sbody">
		<!-- 头部导航 -->
		<view v-if="customHeader">
			<view class="grace-page-header" 
			:style="{
				'z-index':headerIndex, background:headerBG, 
				borderBottomWidth:borderWidth, borderBottomColor:borderColor}">
				<!-- 沉浸式状态栏 -->
				<view class="grace-page-status-bar" 
				:style="{height:statusBarHeight+'px', background:statusBarBG}"></view>
				<!-- 头部核心 -->
				<view class="grace-page-header-nav" id="gracePageHeader" 
				:style="{minHeight:headerHeight+'px', height:headerHeight+'px', overflow:'hidden'}">
					<view class="grace-header-main">
						<slot name="gHeader"></slot>
					</view>
					<view :style="{width:BoundingWidth, flexShrink:'0'}" v-if="bounding"></view>
				</view>
			</view>
			<!-- 占位 view -->
			<view :style="{width:'100%', height:(headerHeight+statusBarHeight) + 'px'}"></view>
		</view>
		<!-- 页面主体 -->
		<view class="grace-page-body">
			<slot name="gBody"></slot>
		</view>
		<!-- #ifndef APP-PLUS -->
		<view v-if="!isSwitchPage" :style="{width:'100%', height:iphoneXButtomHeight+'px'}"></view>
		<!-- #endif -->
		<!-- 页面底部 -->
		<view class="grace-page-footer" :style="{'z-index':footerIndex, background:footerBg}">
			<slot name="gFooter"></slot>
			<!-- iphoneX 占位 view -->
			<!-- #ifndef APP-PLUS -->
			<view v-if="!isSwitchPage" :style="{width:'100%', height:iphoneXButtomHeight+'px'}"></view>
			<!-- #endif -->
		</view>
		<!-- 右下角悬浮按钮 -->
		<view class="gui-page-rb-area" 
		:style="{right:rbRight+'rpx', bottom:rbBottom+'rpx', width:rbWidth+'rpx', zIndex:rbIndex}">
			<slot name="gRTArea"></slot>
		</view>
		<!-- 全屏 loading -->
		<view class="grace-page-loading" @tap.stop="stopfun" @touchmove.stop.prevent="stopfun" :style="{background:loadingBG}" v-if="isLoading">
			<view class="grace-page-loading-point">
				<view class="grace-page-loading-points animate1" :style="{background:loadingPointBg}"></view>
				<view class="grace-page-loading-points animate2" :style="{background:loadingPointBg}"></view>
				<view class="grace-page-loading-points animate3" :style="{background:loadingPointBg}"></view>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		customHeader : { type : Boolean, default : true },
		headerHeight : { type : Number,  default : 44 },
		headerIndex  : { type : Number,  default : 98 },
		headerBG     : { type : String,  default : 'none' },
		statusBarBG  : { type : String,  default : 'none' },
		footerIndex  : { type : Number,  default : 98 },
		footerBg     : { type : String,  default : ''},
		isSwitchPage :  { type : Boolean, default : false },
		rbWidth      : { type : Number, default : 100},
		rbBottom     : { type : Number, default : 100 },
		rbRight      : { type : Number, default : 20 },
		rbIndex      : { type : Number,  default : 1 },
		borderWidth  : { type : String,  default : '0' },
		borderColor  : { type : String,  default : '#D1D1D1'},
		loadingBG    : { type : String,  default : 'rgba(255,255,255, 0.1)'},
		isLoading    :  { type : Boolean, default : false },
		loadingPointBg : {type : String,  default : '#3688FF'},
		bounding     : { type : Boolean, default : true }
	},
	data() {
		return {
			statusBarHeight : 44,
			iphoneXButtomHeight:0,
			BoundingWidth : '0px'
		}
	},
	created:function(){
		try {
		    var system = uni.getSystemInfoSync();
			system.model = system.model.replace(' ', '');
			system.model = system.model.toLowerCase();
			if(system.model.indexOf('iphonex') != -1 || system.model.indexOf('iphone11') != -1){this.iphoneXButtomHeight = uni.upx2px(50);}
			if(!this.customHeader){return ;}
			this.statusBarHeight = system.statusBarHeight;
			// #ifdef MP-ALIPAY
			this.statusBarHeight = 0;
			// #endif
			// #ifndef MP-ALIPAY
				// #ifdef MP-WEIXIN
				// 小程序胶囊按钮
				var bounding  = uni.getMenuButtonBoundingClientRect();
				this.BoundingWidth = (bounding.width + system.windowWidth - bounding.right + 10) + 'px';
				// #endif
			// #endif
		} catch (e){return null;}
	},
	methods:{
		getHeaderHeight:function(){
			return this.headerHeight + this.statusBarHeight;
		},
		stopfun : function(){}
	}
}
</script>
<style>
/* #ifndef MP */
page{width:100%; min-height:100%; display:flex; flex-direction:column; flex:1;}
/* #endif */
.grace-sbody{display:flex; flex-direction:column; width:100%; min-height:100%; flex:1;}
/* #ifdef MP */
.grace-sbody{min-height:100vh;}
/* #endif */
.grace-page-header{width:100%; position:fixed; left:0; top:0; z-index:99; border-bottom:0px solid #FFFFFF;}
.grace-page-status-bar{width:100%; height:0;}
.grace-page-header-nav{width:100%; display:flex; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-header-main{width:300rpx; flex:auto; overflow:hidden; min-height:44px;}
.grace-page-body{width:100%; flex:1; display:flex; flex-direction:column;}
.grace-page-footer{width:100%; position:fixed; left:0; bottom:var(--window-bottom); z-index:99;}
.gui-page-rb-area{width:100rpx; position:fixed; right:20rpx; bottom:100rpx; z-index:1;}
.grace-page-loading{width:100%; height:100%; background:rgba(255,255,255,0.1); position:fixed; z-index:9999; left:0; top:0; bottom:0; display:flex; flex-direction:column; justify-content:center; align-items:center;}
.grace-page-loading-point{display:flex; flex-direction:row; flex-wrap:nowrap; justify-content:center;}
.grace-page-loading-points{width:20rpx; height:20rpx; background-color:#3688FF; border-radius:50rpx; margin:10rpx; opacity:0.5;}
@keyframes pageLoading1{0% {opacity:0.5; transform:scale(1);} 40% {opacity:1; transform:scale(1.5);}  60%{opacity:0.5; transform:scale(1);}}
@keyframes pageLoading2{20% {opacity:0.5; transform:scale(1);} 60% {opacity:1; transform:scale(1.5);}  80% {opacity:0.5; transform:scale(1);}}
@keyframes pageLoading3{40% {opacity:0.5; transform:scale(1);} 80% {opacity:1; transform:scale(1.5);}  100% {opacity:0.5; transform:scale(1);}}
.animate1{animation:pageLoading1 1.2s infinite linear;}
.animate2{animation:pageLoading2 1.2s infinite linear;}
.animate3{animation:pageLoading3 1.2s infinite linear;}
</style>