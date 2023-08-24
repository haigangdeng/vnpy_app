<template>
	<view class="grace-coupons" :style="{background:coupon.color}">
		<view class="left" :style="{background:coupon.ltBg, height:coupon.height}">
			<view class="number">
				<view class="show" :style="{color:coupon.color}"><text>{{coupon.unit}}</text>{{coupon.number}}</view>
				<view class="txt" :style="{color:coupon.color}">{{coupon.txt}}</view>
			</view>
			<view class="body">
				<view class="title">{{coupon.title}}</view>
				<view class="desc">{{coupon.desc}}</view>
			</view>
			<view class="status" v-if="coupon.drawed" :style="{background:coupon.color}">{{coupon.drawed}}</view>
		</view>
		<view class="right" :style="{height:coupon.height}">{{coupon.btn}}</view>
		<view class="sawtooth" :style="{height:coupon.height}">
			<view class="circular" v-for="(item, index) in '1234567890'" :key="index"></view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		coupon : {
			type : Object,
			default :  function  () {
				return {}
			}
		}
	}
}
</script>
<style scoped>
.grace-coupons{display:flex; flex-wrap:nowrap; border-top-left-radius:10rpx; border-bottom-left-radius:10rpx;}
.grace-coupons .left{width:100%; height:150rpx; padding-right:10rpx; display:flex; justify-content:space-between; align-items:center; border-radius:8rpx; position:relative;}
.grace-coupons .left .number{width:32%; display:flex; flex-wrap:wrap; border-right:1px dashed #D2D2D2;}
.grace-coupons .left .number .show{font-size:50rpx; font-weight:700; line-height:66rpx; text-align:center; width:100%;}
.grace-coupons .left .number text{color:#828282; font-weight:400; font-size:50rpx;}
.grace-coupons .left .number .txt{line-height:26rpx; font-size:22rpx; text-align:center; width:100%;}
.grace-coupons .left .body{width:62%; margin-left:4%; display:flex; flex-wrap:wrap; position:relative;}
.grace-coupons .left .status{display:inline-block; color:#FFFFFF; padding:0 10px; height:36rpx; line-height:36rpx; font-size:20rpx; position:absolute; z-index:1; right:6px; top:8px; border-radius:36rpx;}
.grace-coupons .left .body .title{width:100%; font-size:30rpx; line-height:46rpx;}
.grace-coupons .left .body .desc{color:#999999; margin-top:3px; font-size:24rpx; line-height:36rpx;}
.grace-coupons .right{width:150rpx; height:150rpx; flex-shrink:0; font-size:30rpx; display:flex; align-items:center; justify-content:center; color:#FFF;}
.grace-coupons .sawtooth{width:8px; height:150rpx; overflow:hidden; position:relative; flex-shrink:0;}
.grace-coupons .sawtooth .circular{width:10px; margin:5px; height:10px; border-radius:10px; background:#F9F9F9;}
</style>