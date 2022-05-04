<template>
	<view class="grace-box-banner" :style="{background:background, paddingTop:padding, paddingBottom:padding, borderRadius:borderRadius}">
	    <view class="grace-box-items" v-for="(item, index) in items" :key="index" @tap.stop="taped(index)"
		:style="{borderRight : index+1 >= items.length ? '0rpx' : border[0]+' '+border[1]+' '+border[2]}">
	        <view class="grace-box-banner-line" :style="{lineHeight:lineHeight}">
				<text class="grace-box-banner-line-text1" :style="{color:color[0],fontSize:fontSize[0]}">{{item[0]}}</text>
				<text class="grace-box-banner-line-text2" :style="{color:color[1],fontSize:fontSize[1]}">{{item[1]}}</text></view>
	        <view class="grace-box-banner-line">
				<text :style="{color:color[2],fontSize:fontSize[2]}">{{item[2]}}</text>
			</view>
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
		borderRadius:{
			type : String,
			default : '10rpx'
		},
		lineHeight:{
			type : String,
			default : '1.5em'
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
.grace-box-banner{padding:26rpx 0; display:flex; flex-wrap:nowrap; overflow:hidden;}
.grace-box-items{width:100%;}
.grace-box-banner-line{overflow:hidden; display:flex; width:100%; justify-content:center; align-items:center; line-height:1.5em; padding-top:8rpx;}
.grace-box-banner-line-text1{}
.grace-box-banner-line-text2{margin-left:3px;}
</style>