<template>
	<view class="gui-search" :style="{height:height, backgroundColor:background,borderRadius:borderRadius}">
		<text class="gui-search-icon grace-icons" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}">&#xe604;</text>
		<input type="text" class="gui-search-input" :placeholder="placeholder" v-model="inputVal" 
		:style="{height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize, backgroundColor:background, color:inputColor}" 
		@input="inputting" @confirm="confirm" confirm-type="search" v-if="!disabled" />
		<text class="gui-search-input" :style="{height:inputHeight, lineHeight:inputHeight, fontSize:inputFontSize, backgroundColor:background, color:iconColor}" @tap.stop="tapme" v-if="disabled">{{placeholder}}</text>
		<text class="gui-search-icon grace-icons" v-if="inputVal.length > 0" @tap.stop="clearKwd" 
		:style="{color:iconColor, fontSize:iconFontSize, lineHeight:height, width:iconWidth}">&#xe632;</text>
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
		placeholder:{type:String, default:'关键字'},
		kwd:{type:String, default:''},
		borderRadius:{type:String, default:'66rpx'},
		disabled:{type:Boolean, default:false},
		inputColor:{type:String, default:'#323232'}
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
		kwd : function(val){
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
.gui-search{border-radius:66rpx; padding:0 10rpx; flex-direction:row; flex-wrap:nowrap; align-items:center; overflow:hidden; flex:1;}
.gui-search-icon{text-align:center;}
.gui-search-input{width:600rpx; margin:0 10rpx; flex:1; border-width:0; padding:0;}
</style>