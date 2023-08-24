<template>
	<scroll-view scroll-with-animation 
	:class="['grace-nav-bar', isCenter ? 'grace-nav-center' : '']" :scroll-x="true" 
	:scroll-into-view="'tab-'+currentIndex" :show-scrollbar="false">
		<view class="nav-item" :id="'tab-'+index" 
		:style="{width:size+'rpx', marginRight:margin+'rpx', padding:'0rpx '+padding}" 
		v-for="(item, index) in items" :key="index" @click="navchang" :data-index="index">
			<text :class="['nav-item-title', currentIndex == index ? 'nav-active' : '']"
			:style="{color:currentIndex == index ? activeColor:color, width:size+'rpx', lineHeight:lineHeight, fontSize:currentIndex == index ? activeFontSize : fontSize, textAlign:textAlign, fontWeight:currentIndex == index ? activeFontWeight : ''}">{{item}}</text>
			<view class="nav-active-line-wrap" :style="{justifyContent:activeDirection}">
				<view class="nav-active-line" 
				:style="{backgroundImage:activeLineBg, width:activeLineWidth, height:activeLineHeight, borderRadius:activeLineRadius}" 
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
		activeLineBg : {type : String, default : "linear-gradient(to right, #66BFFF,#3388FF)"},
		color : {type : String, default : "#333333"},
		activeColor:{type : String,	default : "#333333"},
		activeLineHeight : {type : String, default : '6rpx'},
		activeLineWidth : {type : String, default : "36rpx"},
		activeDirection : {type : String, default : ""},
		activeFontWeight: {type : Number, default : 700},
		margin : {type : Number, default : 0},
		textAlign : {type : String, default : 'left'},
		lineHeight :{type : String, default : '50rpx'},
		padding : {type : String, default : '0rpx'},
		activeLineRadius : {type : String, default : "0rpx"}
	},
	methods:{
		navchang : function (e){
			this.$emit('change', Number(e.currentTarget.dataset.index))
		}
	}
}
</script>
<style scoped>
.grace-nav-bar{flex-direction:row;}
.nav-item{flex-direction:column;}
.nav-item-title{width:100%; color:#333333;}
.nav-active{}
.nav-active-line-wrap{flex-direction:row;}
.nav-active-line{margin-top:5rpx;}
.grace-nav-center{justify-content:center; text-align:center;}
</style>