<template>
	<view class="grace-coupons" :style="{backgroundColor:coupon.color}">
		<view class="grace-coupons-left" :style="{backgroundColor:coupon.ltBg, height:coupon.height}">
			<view class="grace-coupons-number">
				<view class="grace-coupons-number-show">
					<text class="grace-coupons-unit" :style="{color:coupon.color}">{{coupon.unit}}</text>
					<text class="grace-coupons-text" :style="{color:coupon.color}">{{coupon.number}}</text>
				</view>
				<text class="grace-coupons-left-txt" :style="{color:coupon.color}">{{coupon.txt}}</text>
			</view>
			<view class="grace-coupons-body">
				<text class="grace-coupons-title">{{coupon.title}}</text>
				<text class="grace-coupons-desc">{{coupon.desc}}</text>
			</view>
			<text class="grace-coupons-status" v-if="coupon.drawed" :style="{backgroundColor:coupon.color}">{{coupon.drawed}}</text>
		</view>
		<text class="grace-coupons-right" :style="{height:coupon.height, lineHeight:coupon.height}">{{coupon.btn}}</text>
		<view class="grace-coupons-sawtooth" :style="{height:coupon.height}">
			<view class="grace-coupons-circular" v-for="(item, index) in '1234567890'" :key="index"></view>
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
.grace-coupons{flex-direction:row; flex-wrap:nowrap; border-top-left-radius:10rpx; border-bottom-left-radius:10rpx; margin-top:20rpx;}
.grace-coupons-left{width:700rpx; height:150rpx; flex:1; padding-right:10rpx; flex-direction:row; justify-content:space-between; align-items:center; border-radius:8rpx; position:relative;}
.grace-coupons-number{width:200rpx; border-right-width:1px; border-right-style:dashed; border-right-color:#D2D2D2;}
.grace-coupons-number-show{flex-direction:row; flex-wrap:nowrap; align-items:flex-end; justify-content:center;}
.grace-coupons-text{color:#828282; font-size:50rpx;}
.grace-coupons-unit{font-size:32rpx;}
.grace-coupons-left-txt{font-size:26rpx; text-align:center;}
.grace-coupons-body{width:700rpx; margin-left:30rpx; flex:1;}
.grace-coupons-title{font-size:30rpx; line-height:46rpx;}
.grace-coupons-desc{color:#999999; margin-top:3px; font-size:24rpx; line-height:36rpx;}
.grace-coupons-status{width:180rpx; padding:0 10px; height:36rpx; line-height:36rpx; font-size:20rpx; position:absolute; right:6px; top:5px; border-radius:36rpx; text-align:center; color:#FFFFFF;}
.grace-coupons-right{width:150rpx; height:150rpx; font-size:30rpx; color:#FFFFFF; flex-direction:row; text-align:center;}
.grace-coupons-sawtooth{width:8px; height:150rpx; overflow:hidden;}
.grace-coupons-circular{width:10px; margin:2px 5px; height:10px; border-radius:10px; background-color:#F9F9F9;}

</style>