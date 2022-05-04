<template>
	<view class="grace-face-group" :style="{height:(size + borderWidth * 2 ) +'rpx'}">
		<view class="grace-face-items" v-if="isAddBtn" 
		:style="{'z-index':startIndex, width:size+'rpx', height:size+'rpx', border:borderWidth + 'rpx solid ' + borderColor}" 
		@tap.stop="addBtnClick">
			<slot></slot>
		</view>
		<view class="grace-face-items" 
		v-for="(item, index) in items" :key="index" 
		:style="{'z-index':startIndex - index - 1, 
			left:isAddBtn ? (space * (index+1)) + 'rpx' : (space * index) + 'rpx', 
			border:borderWidth + 'rpx solid ' + borderColor, 
			width:size+'rpx', height:size+'rpx'}">
			<image :src="item" mode="widthFix"></image>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		items : {
			type : Array,
			default : function () {
				return new Array()
			}
		},
		size : {
			type : Number,
			default : 80
		},
		space : {
			type : Number,
			default : 60
		},
		borderWidth : {
			type : Number,
			default : 4
		},
		borderColor : {
			type : String,
			default : '#F5F5F5'
		},
		isAddBtn : {
			type : Boolean,
			default : false
		},
		startIndex : {type:Number, default:100}
	},
	methods:{
		addBtnClick : function () {
			this.$emit('addBtnClicked');
		}
	}
}
</script>
<style scoped>
.grace-face-group{position:relative;}
.grace-face-items{width:100rpx; height:100rpx; position:absolute; overflow:hidden; border-radius:100%;}
.grace-face-items image{width:100%;}
</style>
