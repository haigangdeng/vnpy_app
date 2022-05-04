<template>
	<gracePage :customHeader="false" :isLoading="pageLoading">
		<view v-if="userIsLogin" slot="gBody" class="grace-body">
			<!-- <view class="grace-h4 grace-margin-top" style="padding:20rpx 0;">用户中心</view> -->
			<view class="grace-h4 grace-margin-top" style="padding:10rpx 0;"></view>
			<view class="grace-list" style="margin-top:10rpx; margin-bottom:30rpx;">
				<view class="items">
					<view class="icons ucenter-face"><image src="../../static/img/usercenter.png" mode="widthFix"></image></view>
					<view class="body">
						<view class="title">{{ userInfo.UserName }}</view>
						<view class="desc">{{ serverUrl }}</view>
						<!-- <view class="desc">{{ userInfo.RealName }}</view> -->
					</view>
					<!-- <view class="arrow-right"></view> -->
				</view>
			</view>

			<view class="ucenter-line"></view>

			<!-- <view class="ucenter-line"></view> -->

			<view class="grace-list">
				<navigator open-type="reLaunch" class="items" url="agreement">
					<view class="icons grace-icons icon-menu grace-blue"></view>
					<view class="body"><view class="title">用户服务使用协议</view></view>
					<view class="arrow-right"></view>
				</navigator>
				<navigator open-type="reLaunch" class="items" url="privacy">
					<view class="icons grace-icons icon-eye grace-blue"></view>
					<view class="body"><view class="title">用户隐私政策</view></view>
					<view class="arrow-right"></view>
				</navigator>
			</view>

			<view class="ucenter-line"></view>

			<view>
				<button v-if="!userIsLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
				<button v-if="userIsLogin" type="default" @tap="bindLogout">退出登录</button>
			</view>
			<view class="ucenter-line"></view>
		</view>
	</gracePage>
</template>
<script>
export default {
	data() {
		return {
			userIsLogin: false,
			userInfo: {},
			serverUrl: '',

			pageLoading: false
		};
	},
	onLoad() {
		this.pageOnLoad();
	},
	onShow() {
		
	},
	onPullDownRefresh: function() {
		this.pageOnLoad();
		console.log('刷新了');
		uni.stopPullDownRefresh();
	},
	components: {},
	methods: {
		pageOnLoad() {
			var me = this;
			me.pageLoading = true;
			// setTimeout(() => {
			// 	me.pageLoading = false;
			// }, 1500);
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();
			if (userInfo != null) {
				//debugger;
				//me.getUserContact();
				me.userIsLogin = true;
				me.userInfo = userInfo;
				me.serverUrl = serverUrl;
			} else {
				me.userIsLogin = false;
				me.userInfo = {};
				uni.reLaunch({
					url: 'login'
				});
			}
			me.pageLoading = false;
		},
		
		bindLogin() {
			uni.navigateTo({
				url: 'login'
			});
		},
		bindLogout() {
			var me = this;
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();

			uni.showLoading({
				title: '请求中...'
			});
			
			//uni.removeStorageSync('appEnvironment');
			uni.removeStorageSync('currentUserInfo');
			uni.showToast({
				title: '退出成功',
				//mask: true,
				duration: 2000,
				icon: 'success'
			});
			uni.reLaunch({
				url: 'login'
			});
			
			// console.log(userInfo);
		}
	},
	onShareAppMessage(res) {
		return {
			title: 'VeighNa - 基于Python的开源量化交易平台开发框架',
			path: '/pages/help/help'
		};
	}
};
</script>
<style>
.ucenter-face {
	width: 120rpx !important;
	height: 120rpx !important;
}
.ucenter-face image {
	width: 120rpx !important;
	height: 120rpx !important;
}
.ucenter-line {
	width: 100%;
	height: 10px;
	background: #f4f5f6;
	margin: 8px 0;
}
.btn-row {
	width: 90%;
	align-content: center;
}
</style>
