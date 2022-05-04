<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-card-view grace-margin-top" style="margin-top:100px;">
				<view class="body">
					<view class="img"><view class="dotnet-icons icon-wms-user-c grace-gray" style="font-size:100rpx; line-height:100rpx"></view></view>
					<view class="desc">
						<view class="title">
							{{ userInfo.UserName }}
							<text>{{ userInfo.IpAddress }}</text>
						</view>
						<view class="text">{{ userInfo.CompanyName }}{{ userInfo.SubCompanyName }}</view>
						<view class="text">{{ userInfo.RealName }}{{ userInfo.NickName }}</view>
					</view>
				</view>
				<view class="footer">
					<view class="grace-icons icon-home">首页</view>
					<view class="grace-icons icon-safe">设置</view>
					<view class="grace-icons icon-share">分享</view>
				</view>
			</view>

			<view class="grace-margin-top">
				<view class="btn-row">
					<button v-if="!userIsLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
					<button v-if="userIsLogin" type="default" @tap="bindLogout">退出登录</button>
				</view>
			</view>
		</view>
	</gracePage>
</template>

<script>
export default {
	data() {
		return {
			userIsLogin: false,
			userInfo: {}
		};
	},
	onShow() {
		var me = this;
		var userInfo = me.getCurrentUserInfo();
		var serverUrl = me.getServerUrl();
		if (userInfo != null) {
			//debugger;
			me.userIsLogin = true;
			me.userInfo = userInfo;
		} else {
			me.userIsLogin = false;
			me.userInfo = {};
			uni.reLaunch({
				url: '../login/login'
			});
		}
	},

	methods: {
		bindLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		bindLogout() {
			var me = this;
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();

			uni.showLoading({
				title: '请求中...'
			});
			//debugger;
			uni.request({
				url: serverUrl + '/User/Logout',
				method: 'POST',
				header: {
					appKey: me.getAppKey(),
					appSecret: me.getAppSecret(),
					userId: userInfo.Id,
					openId: userInfo.OpenId
				},
				success: res => {
					var statusmessage = res.data.StatusMessage;
					if (res.data.Status) {
						//debugger;
						// 清空本地缓存
						uni.clearStorageSync();
						uni.showToast({
							title: '退出成功',
							duration: 2000,
							icon: 'success'
						});
						uni.reLaunch({
							url: '../login/login'
						});
					} else {
						//debugger;
						uni.clearStorageSync();
						uni.showToast({
							title: statusmessage,
							//mask: true,
							duration: 2000,
							icon: 'none'
						});
						uni.reLaunch({
							url: '../login/login'
						});
					}
				},
				fail: function() {
					uni.showToast({
						title: '网络异常请重试',
						duration: 2000,
						icon: 'none'
					});
				},
				complete: function() {
					setTimeout(function() {
						uni.hideLoading();
					}, 2000);
				}
			});
		}
	}
};
</script>

<style></style>
