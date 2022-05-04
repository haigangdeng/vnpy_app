<template>
	<view class="grace-number-box" :style="{width:width}">
		<text class="grace-number-box-doBtn" @tap.stop="reduce" 
		:style="{
			width:btnSize, height:btnSize, fontSize:btnFontSize, 
			lineHeight:btnSize, color:btnColr}">-</text>
		<input class="grace-number-box-input" type="number" 
		:value="inputNumber" :disabled="disabled"  @blur="inputval" 
		:style="{
			backgroundColor:inputBG, height:inputHeight, lineHeight:inputHeight, 
			fontSize:inputFontSize, color:inputColor, padding:inputPadding, 
			borderRadius:inputBorderRadius}"></input>
		<text class="grace-number-box-doBtn" @tap.stop="add" 
		:style="{width:btnSize, height:btnSize, fontSize:btnFontSize, lineHeight:btnSize, color:btnColr}">+</text>
	</view>
</template>
<script>
export default {
	name: "graceNumberBox",
	props: {
		disabled :{
			type : Boolean,
			default : false
		},
		value : {
			type : Number,
			default : 0 
		},
		index : {
			type : Number,
			default : 0
		},
		maxNum:{
			type: Number,
			default: 999999
		},
		minNum: {
			type: Number,
			default: 0
		},
		datas:{
			type: String,
			default: ''
		},
		btnSize : {
			type : String,
			default : '60rpx'
		},
		btnFontSize : {
			type : String,
			default : '36rpx'
		},
		btnColr : {
			type : String,
			default : '#666666'
		},
		inputHeight : {
			type : String,
			default : '56rpx'
		},
		inputFontSize : {
			type : String,
			default : '26rpx'
		},
		inputColor : {
			type : String,
			default : '#333333'
		},
		inputBG : {
			type : String,
			default : '#F6F7F8'
		},
		inputPadding : {
			type : String,
			default : '10rpx'
		},
		inputBorderRadius : {
			type : String,
			default : '8rpx'
		},
		width:{
			type : String,
			default : '200rpx'
		},
		step : {
			type : Number,
			default : 1
		}
	},
	data() {
		return {
			inputNumber: 0,
			callbackNumber:0
		}
	},
	created:function(){
		this.inputNumber = Number(this.value);
		this.callbackNumber++;
	},
	watch:{
		value :function(val, vo){this.inputNumber = Number(val);},
		inputNumber :function(val, vo){
			val = Number(val);
			if(isNaN(val)){ setTimeout(()=>{this.inputNumber = Number(vo);}, 200);  return; }
			if(val > this.maxNum){
				this.$emit('change', [this.maxNum, this.index, this.datas]);
				setTimeout(()=>{this.inputNumber = this.maxNum;}, 200);
				return ;
			}
			if(val < this.minNum){
				this.$emit('change', [this.minNum, this.index, this.datas]);
				setTimeout(()=>{this.inputNumber = this.minNum;}, 200);
				return ;
			}
			if(val != vo && this.callbackNumber > 0){this.$emit('change', [val, this.index, this.datas]);}
		}
	},
	methods: {
		add : function(){
			var newVal = Number(this.inputNumber) + Number(this.step);
			if(newVal > this.maxNum){return ;}
			this.inputNumber = Number(newVal);
		},
		reduce: function () {
			var newVal = Number(this.inputNumber) - Number(this.step);
			if(newVal < this.minNum){return ;}
			this.inputNumber = newVal;
		},
		inputval:function (e) {
			this.inputNumber = e.detail.value;
		}
	}
}
</script>
<style scoped>
.grace-number-box{overflow:hidden; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-number-box-doBtn{text-align:center; color:#666666;}
.grace-number-box-input{text-align:center; width:700rpx; flex:1;}
</style>