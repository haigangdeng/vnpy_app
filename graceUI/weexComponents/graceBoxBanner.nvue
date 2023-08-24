<template>
	<view class="grace-box-banner" :style="{backgroundColor:background, paddingTop:padding, paddingBottom:padding, borderRadius:borderRadius}">
	    <view class="grace-box-items" v-for="(item, index) in items" :key="index" @tap.stop="taped(index)"
		:style="{
			borderRightStyle : index+1 >= items.length ? '0rpx' : border[0],
			borderRightWidth : index+1 >= items.length ? '0rpx' : border[2],
			borderRightColor : index+1 >= items.length ? '0rpx' : border[1],
		}">
			<view class="grace-flex-center grace-box-line1">
				<text :style="{color:color[0],fontSize:fontSize[0], lineHeight:lineHeight}">{{item[0]}}</text>
				<text :style="{color:color[1],fontSize:fontSize[1], lineHeight:lineHeight}" style="margin-left:3px;">{{item[1]}}</text>
			</view>
	        <text class="grace-box-line2" :style="{color:color[2],fontSize:fontSize[2]}">{{item[2]}}</text>
	    </view>
	</view>
</template>
<script>
export default {
	props: {
		items:{
			type : Array,
			default : function () {
				return []
			}
		},
		color:{
			type : Array,
			default : function () {
				return ['#333333', '#999999', '#999999']
			}
		},
		fontSize:{
			type : Array,
			default : function () {
				return ['36rpx', '24rpx', '24rpx']
			}
		},
		background : {
			type : String,
			default : ''
		},
		padding:{
			type : String,
			default : '25rpx'
		},
		border:{
			type:Array,
			default:function () {return ["none","",""];}
		},
		borderRadius : {
			type:String,
			default:'10rpx'
		},
		lineHeight:{
			type : String,
			default : '50rpx'
		}
	},
	methods:{
		taped:function (index) {
			this.$emit('taped', index);
		}
	}
}
</script>
<style scoped>
.grace-box-banner{flex-wrap:nowrap; flex-direction:row; overflow:hidden;}
.grace-box-items{justify-content:center; width:700rpx; flex:1; text-align:center;}
.grace-box-line1{align-items:center; padding-top:2px;}
.grace-box-line2{margin-top:5px; text-align:center; padding-bottom:2px;}
</style>