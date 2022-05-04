<template>
	<view class="grace-pk" :style="{height:height,borderRadius:borderRadius}">
		<view class="grace-pk-item">
			<text class="grace-pk-title">{{title[0]}}</text>
			<view class="grace-pk-btn-wrap" v-if="status == 'button'">
				<view class="grace-pk-btn" hover-class="grace-pk-btn-hv" 
				data-index="left" @tap="choose">{{btnName}}</view>
			</view>
			<view class="grace-pk-btn-wrap" v-if="status == 'progress'">
				<progress :percent="progress[0]" stroke-width="3" class="grace-pk-progress" active 
				activeColor="#FFFFFF" border-radius="10" backgroundColor="#3699ff"/>
			</view>
			<view class="grace-pk-text" v-if="status == 'progress'">{{progress[2]}}</view>
		</view>
		<view class="grace-pk-item">
			<text class="grace-pk-title" style="text-align:right;">{{title[1]}}</text>
			<view class="grace-pk-btn-wrap" style="justify-content:flex-end;" v-if="status == 'button'">
				<view class="grace-pk-btn" hover-class="grace-pk-btn-hv" 
				style="color:#FF0036;" data-index="right" @tap="choose">{{btnName}}</view>
			</view>
			<view class="grace-pk-btn-wrap" style="justify-content:flex-end;" v-if="status == 'progress'">
				<progress :percent="progress[1]" active stroke-width="3" class="grace-pk-progress" 
				activeColor="#FFFFFF" border-radius="10" backgroundColor="#FF6666"/>
			</view>
			<view class="grace-pk-text" style="text-align:right;" v-if="status == 'progress'">{{progress[3]}}</view>
		</view>
		<view class="grace-pk-icon">
			<image src="https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200806/84515c21a39e8382addbeca53462e3a0.png" 
			mode="widthFix" style="width:88rpx; height:88rpx;"></image>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		height       : {type:String, default:'260rpx'},
		borderRadius : {type:String, default:'8rpx'},
		title        : {type:Array, default:function(){return ['',''];}},
		btnName      : {type:String, default:'站队'},
		status       : {type:String, default:'button'},
		progress     : {type:Array, default:function(){return [80,20,'8000 票', '2000 票'];}}
	},
	methods:{
		choose:function (e) {
			this.$emit('choose', e.currentTarget.dataset.index);
		}
	}
}
</script>
<style scoped>
.grace-pk{display:flex; flex-direction:row; justify-content:space-between; background-image:url(https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200806/24692285f85690abbc762512ce22d2c5.png); background-repeat:repeat-y; background-size:100% auto; background-position:left center; position:relative;}
.grace-pk-item{width:750rpx; overflow:hidden; padding:0rpx 35rpx; box-sizing:border-box; display:flex; flex-direction:column; justify-content:center;}
.grace-pk-title{display:block; color:#FFFFFF; font-size:50rpx; line-height:60rpx;}
.grace-pk-btn-wrap{display:flex; flex-direction:row; margin-top:32rpx;}
.grace-pk-btn{width:150rpx; height:50rpx; line-height:50rpx; text-align:center; background-color:#FFFFFF; font-size:22rpx; border-radius:100rpx; color:#3687FF;}
.grace-pk-btn-hv{font-weight:bold;}
.grace-pk-progress{width:200rpx;}
.grace-pk-text{font-size:22rpx; color:#FFFFFF; line-height:50rpx; margin-top:2px;}
.grace-pk-icon{width:88rpx; height:88rpx; background-color:#FFFFFF; border-radius:100rpx; font-size:0; position:absolute; top:50%; left: 50%; transform: translate(-50%, -50%); padding:20rpx;}
</style>