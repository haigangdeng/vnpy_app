<template>
	<scroll-view scroll-with-animation 
	:class="['grace-nav-bar2', isCenter ? 'grace-nav2-center' : '']" :scroll-x="true" :show-scrollbar="false" 
	:scroll-into-view="'tab-'+currentIndex">
		<view class="nav2-item" :id="'tab-'+index" :style="{width:size+'rpx', height:(lineHeight+lineHeightSamll+18)+'rpx'}" 
		v-for="(item, index) in items" :key="index" @click="navchang" :data-index="index">
		<view class="nav2-active-line-in" :style="{width:size+'rpx'}">
			<view class="nav2-active-line" :style="{borderColor:currentIndex == index ? activeColor : bgColor}"></view>
		</view>
			<view class="nav2-nav-body">
				<text :class="['nav2-item-title', currentIndex == index ? 'nav-active' : '']"
				:style="{
					color:currentIndex == index ? activeColor : color, width:size+'rpx', 
					lineHeight:lineHeight+'rpx', fontSize:currentIndex == index ? activeFontSize : fontSize, 
					backgroundColor:bgColor,
					fontWeight:currentIndex == index ? 'bold' : ''}">{{item.title}}</text>
				<text :class="['nav2-item-desc', currentIndex == index ? 'nav-active' : '']"
				:style="{color:currentIndex == index ? activeColor : descColor, lineHeight:lineHeightSamll+'rpx', 
				fontSize:fontSizeSmall, backgroundColor:bgColor, width:size+'rpx'}">{{item.desc}}</text>
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
		bgColor:{type : String, default : '#FFFFFF'}
	},
	methods:{
		navchang : function (e){
			this.$emit('change', Number(e.currentTarget.dataset.index))
		}
	}
}
</script>
<style scoped>
.grace-nav-bar2{flex-direction:row;}
.nav2-item{width:100rpx; flex-direction:column; padding-bottom:16rpx;}
.nav2-item-title{color:#333333; text-align:center;}
.nav2-item-desc{color:#666666; text-align:center; padding-bottom:6rpx;}
.nav2-active{font-weight:bold;}
.nav2-active-line-wrap{}
.grace-nav2-center{justify-content:center; text-align:center;}
.nav2-active-line-in{position:absolute; left:0; bottom:2rpx; flex-direction:row; justify-content:center;}
.nav2-active-line{width:20rpx; height:20rpx; border-radius:50rpx; border-width:6rpx; border-style:solid; border-color:#FF0000;}
.nav2-nav-body{position:absolute; left:0; top:0;}
</style>