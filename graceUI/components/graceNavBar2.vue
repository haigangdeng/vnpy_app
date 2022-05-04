<template>
	<scroll-view scroll-with-animation 
	:class="['grace-nav-bar2', isCenter ? 'grace-nav2-center' : '']" :scroll-x="true" :show-scrollbar="false" 
	:scroll-into-view="'tab-'+currentIndex+autoLeft">
		<view class="nav2-item" :id="'tab-'+index" :style="{width:size+'rpx', height:(lineHeight+lineHeightSamll+6)+'rpx'}" 
		v-for="(item, index) in items" :key="index" @click="navchang" :data-index="index">
			<view class="nav2-nav-body">
				<text :class="['nav2-item-title', currentIndex == index ? 'nav-active' : '']"
				:style="{
					color:currentIndex == index ? activeColor : color, 
					lineHeight:lineHeight+'rpx', fontSize:currentIndex == index ? activeFontSize : fontSize, 
					background:bgColor,
					fontWeight:currentIndex == index ? 'bold' : ''}">{{item.title}}</text>
				<text :class="['nav2-item-desc', currentIndex == index ? 'nav-active' : '']"
				:style="{color:currentIndex == index ? activeColor : descColor, lineHeight:lineHeightSamll+'rpx', fontSize:fontSizeSmall, background:bgColor}">{{item.desc}}</text>
			</view>
			<view class="nav2-active-line-in" :class="currentIndex == index ? 'grace-nav-fadein' : ''">
				<view class="nav2-active-line" :style="{borderColor:currentIndex == index ? activeColor : bgColor}"></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	props:{
		isCenter : {type : Boolean, default : false},
		currentIndex : {type : Number,default : 0},
		size : {type : Number, default : 138},
		fontSize : {type : String,default : '28rpx'},
		activeFontSize: {type : String,default : '30rpx'},
		lineHeight :{type : Number, default : 52},
		fontSizeSmall: {type : String,default : '22rpx'},
		lineHeightSamll :{type : Number, default : 28},
		items : {type : Array,default : function () {return []}},
		color : {type : String, default : "#333333"},
		descColor : {type : String, default : "#999999"},
		activeColor:{type : String,	default : "#3688FF"},
		bgColor:{type : String, default : '#FFFFFF'},
		autoLeft: {type : String, default : ''}
	},
	methods:{
		navchang : function (e){
			this.$emit('change', Number(e.currentTarget.dataset.index))
		}
	}
}
</script>
<style scoped>
/* #ifndef MP-ALIPAY */
.grace-nav-bar2{width:100%; display:flex; white-space:nowrap;}
/* #endif */
/* #ifdef MP-ALIPAY */
.grace-nav-bar2{width:100%; white-space:nowrap;}
/* #endif */
.nav2-item{width:100rpx; display:inline-flex; flex-direction:column; padding-bottom:16rpx; position:relative;}
.nav2-item-title{width:100%; color:#333333; display:block; text-align:center;}
.nav2-item-desc{width:100%; color:#666666; display:block; text-align:center; padding-bottom:6rpx;}
.nav2-active{font-weight:bold;}
.nav2-active-line-wrap{display:flex;}
.grace-nav2-center{justify-content:center; text-align:center;}
@keyframes grace-nav-fadein{0%{transform: scale(0,0);} 100%{transform: scale(1,1);}}
.grace-nav-fadein{animation:grace-nav-fadein 300ms forwards;}
.nav2-active-line-in{position:absolute; left:0; bottom:2rpx; z-index:1; display:flex; flex-direction:row; justify-content:center; width:100%;}
.nav2-active-line{width:20rpx; height:20rpx; border-radius:50rpx; border:6rpx solid #FF0000;}
.nav2-nav-body{position:absolute; z-index:2; left:0; top:0; width:100%;}
</style>