<template>
	<view class="grace-face-group" :style="{height:(size + borderWidth * 2 ) +'rpx'}">
		<view class="grace-face-items" v-if="isAddBtn" 
		:style="{width:size+'rpx', height:size+'rpx'}" 
		@tap.stop="addBtnClick">
			<slot></slot>
		</view>
		<image :src="item" class="grace-face-items" v-for="(item, index) in items" :key="index"  :style="{
			left:isAddBtn ? (space * (index+1)) + 'rpx' : (space * index) + 'rpx', 
			borderWidth:borderWidth + 'rpx', borderColor:borderColor, borderRadius:size+'rpx', width:size+'rpx', height:size+'rpx'}">
		</image>
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
		}
	},
	methods:{
		addBtnClick : function () {
			this.$emit('addBtnClicked');
		}
	}
}
</script>
<style scoped>
.grace-face-group{}
.grace-face-items{width:100rpx; height:100rpx; position:absolute; overflow:hidden;  border-radius:100rpx; font-size:0; borderStyle:solid;}
</style>
