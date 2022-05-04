<template>
	<scroll-view scroll-with-animation 
	:class="['grace-nav-bar', isCenter ? 'grace-nav-center' : '']" :scroll-x="true" :show-scrollbar="false" 
	:scroll-into-view="'tab-'+currentIndex+autoLeft">
		<view class="nav-item" :id="'tab-'+index" 
		:style="{width:size < 1 ? 'auto' : size+'rpx', marginRight:margin+'rpx', padding:'0rpx '+padding}" 
		v-for="(item, index) in items" :key="index" @click="navchang" :data-index="index">
			<view :class="['nav-item-title', currentIndex == index ? 'nav-active' : '']"
			:style="{color:currentIndex == index ? activeColor : color, textAlign : textAlign, lineHeight:lineHeight, fontSize:currentIndex == index ? activeFontSize : fontSize, fontWeight:currentIndex == index ? activeFontWeight : ''}">{{item}}</view>
			<view class="nav-active-line-wrap" :style="{justifyContent:activeDirection}">
				<view class="nav-active-line" :class="[currentIndex == index && animatie ?'grace-nav-scale':'']" 
				:style="{background:activeLineBg, width:activeLineWidth, height:activeLineHeight, borderRadius:activeLineRadius}" 
				v-if="currentIndex == index"></view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
export default {
	props:{
		isCenter : {type : Boolean, default : false},
		currentIndex : {type : Number,default : 0},
		size : {type : Number, default : 120},
		fontSize : {type : String,default : '28rpx'},
		activeFontSize : {type : String, default : '28rpx'},
		items : {type : Array,default : function () {return []}},
		activeLineBg : {type : String,default : "linear-gradient(to right, #66BFFF,#3388FF)"},
		color : {type : String, default : "#333333"},
		activeColor:{type : String,	default : "#333333"},
		activeLineHeight : {type : String, default : '6rpx'},
		activeLineWidth : {type : String, default : "36rpx"},
		activeLineRadius : {type : String, default : "0rpx"},
		activeDirection : {type : String, default : ""},
		activeFontWeight: {type : Number, default : 700},
		margin : {type : Number, default : 0},
		textAlign : {type : String, default : ''},
		lineHeight :{type : String, default : '50rpx'},
		padding : {type : String, default : '0rpx'},
		animatie:{type:Boolean, default:true},
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
.grace-nav-bar{width:100%; display:flex; white-space:nowrap;}
/* #endif */
/* #ifdef MP-ALIPAY */
.grace-nav-bar{width:100%; white-space:nowrap;}
/* #endif */
.nav-item{width:100rpx; display:inline-flex; flex-direction:column;}
.nav-item-title{width:100%; color:#333333;}
.nav-active{}
.nav-active-line-wrap{display:flex;}
.nav-active-line{margin-top:5rpx;}
.grace-nav-center{justify-content:center; text-align:center;}
@keyframes grace-nav-scale{0%{transform: scale(0.1);} 100%{transform: scale(1);}}
.grace-nav-scale{animation:grace-nav-scale 300ms forwards;}
</style>