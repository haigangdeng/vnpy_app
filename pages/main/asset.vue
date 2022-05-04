<template>
	<gracePage :customHeader="false" :isLoading="pageLoading">
		<view v-if="userIsLogin" slot="gBody" class="grace-body">
			
			<view class="grace-margin-top">当前服务器：{{ serverUrl }}</view>
			<view class="ucenter-line"></view>
			<view class="grace-title">账户余额：</view>
			
			<view class="grace-table">
				<view class="grace-theader grace-bg-blue">
					<text class="grace-td grace-bold">接口</text>
					<text class="grace-td grace-bold">账号</text>
					<text class="grace-td grace-bold">可用余额</text>
					<text class="grace-td grace-bold">冻结</text>
				</view>
				<view class="grace-tbody" v-for="(item, index) in accountData" :key="index">
					<text class="grace-td">{{item.gateway_name}}</text>
					<text class="grace-td">{{item.accountid}}</text>
					<text class="grace-td">{{item.available}}</text>
					<text class="grace-td">{{item.frozen}}</text>
				</view>
			</view>
			
			<view class="ucenter-line"></view>
			<view class="grace-title">持有仓位：</view>
			<view class="grace-table">
				<view class="grace-theader grace-bg-blue">
					<text class="grace-td grace-bold">接口</text>
					<text class="grace-td grace-bold">交易所</text>
					<text class="grace-td grace-bold">代码</text>
					<text class="grace-td grace-bold">方向</text>
					<text class="grace-td grace-bold">数量</text>
				</view>
				<view class="grace-tbody" v-for="(item, index) in positionData" :key="index">
					<text class="grace-td">{{item.gateway_name}}</text>
					<text class="grace-td">{{item.exchange}}</text>
					<text class="grace-td">{{item.symbol}}</text>
					<text class="grace-td">{{item.direction}}</text>
					<text class="grace-td">{{item.volume}}</text>
				</view>
			</view>
			
			<view class="ucenter-line"></view>
			<view class="grace-title">订单：</view>
			<view class="grace-table">
				<view class="grace-theader grace-bg-blue">
					<text class="grace-td grace-bold">接口</text>
					<text class="grace-td grace-bold">交易所</text>
					<text class="grace-td grace-bold">代码</text>
					<text class="grace-td grace-bold">方向</text>
					<text class="grace-td grace-bold">开平</text>
					<text class="grace-td grace-bold">类型</text>
					<text class="grace-td grace-bold">价格</text>
					<text class="grace-td grace-bold">数量</text>
					<text class="grace-td grace-bold">状态</text>
					<!-- <text class="grace-td grace-bold">日期</text> -->
				</view>
				<view class="grace-tbody" v-for="(item, index) in orderData" :key="index">
					<text class="grace-td">{{item.gateway_name}}</text>
					<text class="grace-td">{{item.exchange}}</text>
					<text class="grace-td">{{item.symbol}}</text>
					<text class="grace-td">{{item.direction}}</text>
					<text class="grace-td">{{item.offset}}</text>
					<text class="grace-td">{{item.type}}</text>
					<text class="grace-td">{{item.price}}</text>
					<text class="grace-td">{{item.volume}}</text>
					<text class="grace-td">{{item.status}}</text>
					<!-- <text class="grace-td">{{item.datetime}}</text> -->
				</view>
			</view>
			
			<view class="ucenter-line"></view>
			<view class="grace-title">成交记录：</view>
			<view class="grace-table">
				<view class="grace-theader grace-bg-blue">
					<text class="grace-td grace-bold">接口</text>
					<text class="grace-td grace-bold">交易所</text>
					<text class="grace-td grace-bold">代码</text>
					<text class="grace-td grace-bold">方向</text>
					<text class="grace-td grace-bold">开平</text>
					<text class="grace-td grace-bold">价格</text>
					<text class="grace-td grace-bold">数量</text>
					<text class="grace-td grace-bold">状态</text>
					<!-- <text class="grace-td grace-bold">日期</text> -->
				</view>
				<view class="grace-tbody" v-for="(item, index) in tradeData" :key="index">
					<text class="grace-td">{{item.gateway_name}}</text>
					<text class="grace-td">{{item.exchange}}</text>
					<text class="grace-td">{{item.symbol}}</text>
					<text class="grace-td">{{item.direction}}</text>
					<text class="grace-td">{{item.offset}}</text>
					<text class="grace-td">{{item.price}}</text>
					<text class="grace-td">{{item.volume}}</text>
					<text class="grace-td">{{item.status}}</text>
					<!-- <text class="grace-td">{{item.datetime}}</text> -->
				</view>
			</view>
			
			<view class="ucenter-line"></view>

		</view>
			
			
		<graceHeaderAlert :show="showErrorMessage" background="#FF0036">
			<text class="grace-h5 grace-white">{{errorMessage}}</text>
		</graceHeaderAlert>
			
		</view>
	</gracePage>
</template>

<script>

import uniRequest from '../../http/uniRequest.js';
//import graceScroll from '../../graceUI/components/graceNvueScroll.vue';
export default {
	data() {
		return {
			userIsLogin: false,
			serverUrl: '',
			accountData: [],
			positionData: [],
			orderData: [],
			tradeData: [],
			
			pageLoading: false,
			showErrorMessage: false,
			errorMessage: ''
		};
	},
	onLoad() {
		this.pageOnLoad();
	},
	onShow() {
		this.pageOnLoad();
	},
	onPullDownRefresh: function() {
		this.pageOnLoad();
		console.log('刷新了');
		uni.stopPullDownRefresh();
	},
	methods: {
		pageOnLoad() {
			var me = this;
			me.pageLoading = true;
			setTimeout(() => {
				me.pageLoading = false;
			}, 1500);

			var userInfo = me.getCurrentUserInfo();
			if (userInfo != null) {
				me.userIsLogin = true;
				me.userInfo = userInfo;
				var serverUrl = me.getServerUrl();
				me.serverUrl = serverUrl;
				
				//获取资金余额
				uni.request({
					url: serverUrl + '/account',
					method: 'GET',
					header: {
						"Authorization": userInfo.token_type + ' ' + userInfo.access_token,
						"content-type": "application/x-www-form-urlencoded",
						"accept": "application/json"
					},
					success: res => {
						//console.log(res);
						if (res.statusCode == 200) {
							me.accountData = res.data;
						} else {
							uni.showToast({
								title: res.data.detail,
								duration: 2000,
								icon: 'none'
							});
							uni.removeStorageSync('currentUserInfo');
							uni.reLaunch({
								url: '/pages/user/login'
							});
						}
					},
					fail: (res) => {
						uni.showToast({
							title: '网络异常请重试',
							duration: 2000,
							icon: 'none'
						});
						uni.removeStorageSync('currentUserInfo');
						uni.reLaunch({
							url: '/pages/user/login'
						});
					},
					complete: function() {
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					}
				});
				
				//获取仓位
				uni.request({
					url: serverUrl + '/position',
					method: 'GET',
					header: {
						"Authorization": userInfo.token_type + ' ' + userInfo.access_token,
						"content-type": "application/x-www-form-urlencoded",
						"accept": "application/json"
					},
					success: res => {
						//console.log(res);
						if (res.statusCode == 200) {
							me.positionData = res.data;
						} else {
							uni.showToast({
								title: res.data.detail,
								duration: 2000,
								icon: 'none'
							});
							uni.removeStorageSync('currentUserInfo');
							uni.reLaunch({
								url: '/pages/user/login'
							});
						}
					},
					fail: (res) => {
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
				
				//订单
				uni.request({
					url: serverUrl + '/order',
					method: 'GET',
					header: {
						"Authorization": userInfo.token_type + ' ' + userInfo.access_token,
						"content-type": "application/x-www-form-urlencoded",
						"accept": "application/json"
					},
					success: res => {
						//console.log(res);
						if (res.statusCode == 200) {
							me.orderData = res.data;
						} else {
							uni.showToast({
								title: res.data.detail,
								duration: 2000,
								icon: 'none'
							});
							uni.removeStorageSync('currentUserInfo');
							uni.reLaunch({
								url: '/pages/user/login'
							});
						}
					},
					fail: (res) => {
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
				
				
				//成交记录
				uni.request({
					url: serverUrl + '/trade',
					method: 'GET',
					header: {
						"Authorization": userInfo.token_type + ' ' + userInfo.access_token,
						"content-type": "application/x-www-form-urlencoded",
						"accept": "application/json"
					},
					success: res => {
						//console.log(res);
						if (res.statusCode == 200) {
							me.tradeData = res.data;
						} else {
							uni.showToast({
								title: res.data.detail,
								duration: 2000,
								icon: 'none'
							});
							uni.removeStorageSync('currentUserInfo');
							uni.reLaunch({
								url: '/pages/user/login'
							});
						}
					},
					fail: (res) => {
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
				
			
			} else {
				me.userIsLogin = false;
				me.userInfo = {};
				uni.removeStorageSync('currentUserInfo');
				//未登录，返回登陆界面
				uni.reLaunch({
					url: '../user/login'
				});

			}
		}
	},
	onShareAppMessage(res) {
		return {
			title: 'VeighNa - 基于Python的开源量化交易平台开发框架',
			path: '/pages/user/login'
		};
	}
};
</script>

<style>
.grace-td{
	line-height:48rpx
}
.progress {
	margin: 30rpx 0;
}

.three {
	border-right: 2rpx solid #f5f6f8;
	border-bottom: 2rpx solid #f5f6f8;
}

.grace-title {
	padding: 10rpx 0;
	line-height: 2em;
	display: flex;
	flex-wrap: nowrap;
	font-size: 28rpx;
	justify-content: space-between;
	font-weight: 500;
	align-items: center;
}

/* #ifdef H5 */
.grace-title {
	font-weight: 700;
}

/* #endif */
.grace-title > .title {
	width: 200rpx;
	flex: auto;
}

.grace-title > .icon {
	width: 50rpx;
	font-size: 50rpx;
}

.current-project {
	margin-left: 20upx;
	width: 170upx;
}

.three > .items {
	width: 33.333333%;
	border-left: 2rpx solid #f5f6f8;
	border-top: 2rpx solid #f5f6f8;
	color: #a5a7b2;
}

.contact {
	width: 100%;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	margin-top: 30rpx;
}

.demoForIcon {
	border-right: 2rpx solid #f5f6f8;
	border-bottom: 2rpx solid #f5f6f8;
}

.demoForIcon > .items {
	border-left: 2rpx solid #f5f6f8;
	border-top: 2rpx solid #f5f6f8;
	color: #a5a7b2;
}

.ucenter-line {
	width: 100%;
	height: 3px;
	background: #f4f5f6;
	margin: 16px 0;
}

.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}

.percenpading {
	padding-right: 100upx;
}
</style>
