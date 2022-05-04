<template>
	<view class="gui-search" :style="{height:height, backgroundColor:background,borderRadius:borderRadius}">
		<view class="gui-search-icon grace-icons icon-search" @tap.stop="tapme" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}"></view>
		<input type="text" class="gui-search-input" :placeholder="placeholder" v-model="inputVal" v-if="!disabled" 
		:style="{height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize, background:background, color:inputColor}" 
		@input="inputting" @confirm="confirm" confirm-type="search" />
		<view class="gui-search-input" v-if="disabled" @tap.stop="tapme" 
		:style="{height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize, background:background, color:iconColor}">{{placeholder}}</view>
		<view class="gui-search-icon grace-icons icon-close" v-if="inputVal.length > 0" @tap.stop="clearKwd" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}"></view>
	</view>
</template>
<script>
export default{
	props:{
		height:{type:String, default:'66rpx'},
		background:{type:String, default:'#FFFFFF'},
		fontSize:{type:String, default:'28rpx'},
		iconWidth:{type:String, default:'60rpx'},
		iconColor:{type:String, default:'#A5A7B2'},
		iconFontSize:{type:String, default:'30rpx'},
		inputHeight:{type:String, default:'30rpx'},
		inputFontSize:{type:String, default:'26rpx'},
		inputColor:{type:String, default:'#323232'},
		placeholder:{type:String, default:'关键字'},
		kwd:{type:String, default:''},
		borderRadius:{type:String, default:'66rpx'},
		disabled:{type:Boolean, default:false}
	},
	data() {
		return {
			inputVal : ''
		}
	},
	created: function (){
		this.inputVal = this.kwd;
	},
	watch:{
		kwd : function(val, vo){
			this.inputVal = val;
		}
	},
	methods:{
		clearKwd : function () {
			this.inputVal = '';
			this.$emit('clear', '');
		},
		inputting : function(e){
			this.$emit('inputting', e.detail.value);
		},
		confirm : function (e) {
			this.$emit('confirm', e.detail.value);
		},
		tapme : function () {
			this.$emit('tapme')
		}
	}
}
</script>
<style scoped>
.gui-search{border-radius:66rpx; box-sizing:border-box; padding:0 10rpx; display:flex; flex-wrap:nowrap; align-items:center; overflow:hidden; width:100%; box-sizing:border-box;}
.gui-search-icon{text-align:center; flex-shrink:0;}
.gui-search-input{width:100%; margin:0 10rpx; border:none; padding:0;}
</style>