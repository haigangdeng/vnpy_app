<template>
	<view class="grace-pk-wrap" :style="{height:height,borderRadius:borderRadius}">
		<!-- 背景 -->
		<image src="https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200806/24692285f85690abbc762512ce22d2c5.png" 
		class="grace-pk-bg" style="width:700rpx; height:466rpx;"></image>
		<!-- pk 图标 -->
		<view class="grace-pk-icon-wrap" :style="{height:height,borderRadius:borderRadius}">
			<view class="grace-pk-icon">
				<image src="https://img-cdn-qiniu.dcloud.net.cn/uploads/article/20200806/84515c21a39e8382addbeca53462e3a0.png" 
				mode="widthFix" style="width:80rpx; height:80rpx;"></image>
			</view>
		</view>
		<view class="grace-pk" :style="{height:height,borderRadius:borderRadius}">
			<view class="grace-pk-item">
				<text class="grace-pk-title">{{title[0]}}</text>
				<view class="grace-pk-btn-wrap" v-if="status == 'button'">
					<text class="grace-pk-btn" hover-class="grace-pk-btn-hv" 
					data-index="left" @tap="choose">{{btnName}}</text>
				</view>
				<view class="grace-pk-btn-wrap" v-if="status == 'progress'">
					<progress :percent="progress[0]" activeColor="#FFFFFF" stroke-width="3" class="grace-pk-progress" backgroundColor="#3699ff" />
				</view>
				<text class="grace-pk-text" v-if="status == 'progress'">{{progress[2]}}</text>
			</view>
			<view class="grace-pk-item">
				<text class="grace-pk-title" style="text-align:right;">{{title[1]}}</text>
				<view class="grace-pk-btn-wrap" style="justify-content:flex-end;" v-if="status == 'button'">
					<text class="grace-pk-btn" hover-class="grace-pk-btn-hv" 
					style="color:#FF0036;" data-index="right" @tap="choose">{{btnName}}</text>
				</view>
				<view class="grace-pk-btn-wrap" style="justify-content:flex-end;" v-if="status == 'progress'">
					<progress :percent="progress[1]" stroke-width="3" class="grace-pk-progress" 
					activeColor="#FFFFFF" backgroundColor="#FF6666"/>
				</view>
				<text class="grace-pk-text" style="text-align:right;" v-if="status == 'progress'">{{progress[3]}}</text>
			</view>
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
.grace-pk-wrap{font-size:0; overflow:hidden;}
.grace-pk-bg{width:700rpx; position:absolute; left:0; top:0;}
.grace-pk{flex-direction:row; justify-content:space-between;}
.grace-pk-item{width:100rpx; overflow:hidden; padding-left:35rpx; padding-right:35rpx; flex:1; flex-direction:column; justify-content:center;}
.grace-pk-title{color:#FFFFFF; font-size:50rpx; line-height:60rpx;}
.grace-pk-btn-wrap{flex-direction:row; margin-top:32rpx;}
.grace-pk-btn{width:150rpx; height:50rpx; line-height:50rpx; text-align:center; background-color:#FFFFFF; font-size:22rpx; border-radius:100rpx; color:#3687FF;}
.grace-pk-btn-hv{font-weight:bold;}
.grace-pk-progress{width:200rpx;}
.grace-pk-text{font-size:22rpx; color:#FFFFFF; line-height:50rpx; margin-top:2px;}
.grace-pk-icon-wrap{width:700rpx; position:absolute; top:0px; left:0rpx; flex-direction:row; justify-content:center; align-items:center;}
.grace-pk-icon{width:120rpx; height:120rpx; padding-top:20rpx; padding-bottom:20rpx; padding-left:20rpx; padding-right:20rpx; background-color:#FFFFFF; border-radius:100rpx; font-size:0;}
</style>