<template>
	<gracePage :customHeader="false" :isLoading="pageLoading">
		<view v-if="userIsLogin" slot="gBody" class="grace-body">
			<view class="grace-margin-top">当前服务器：{{ serverUrl }}</view>
			<view class="ucenter-line"></view>
			
			<view class="grace-nowrap">
				<view class="icons grace-icons icon-set grace-yellow grace-title"></view>
				<view class="grace-title current-project">当前代码：</view>
				<picker mode="selector" @change="bindPickerChangeSymbol" v-model="symbolIndex" :range="symbolList" range-key="symbol" name="symbol">
					<view class="grace-space-between grace-title">
						<!-- <view class="uni-input">{{ projectList[projectIndex].Name }}</view> -->
						<view class="uni-input">{{ currentSymbolInfo.gateway_name }} - {{ currentSymbolInfo.exchange }} - {{ currentSymbolInfo.symbol }} - {{ currentSymbolInfo.name }}</view>
						<view class="grace-icons icon-arrow-down"></view>
					</view>
				</picker>
			</view>
			

			<view class="ucenter-line"></view>
			
			<view v-if="tickShow">
			<view class="grace-table">
				<view class="grace-theader grace-bg-blue grace-space-between">
					<text class="grace-td grace-bold">价格</text>
					<text class="grace-td grace-bold">数量</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-red">{{currentSymbolInfo.ask_price_5}}</text>
					<text class="grace-td ">{{currentSymbolInfo.ask_volume_5}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-red">{{currentSymbolInfo.ask_price_4}}</text>
					<text class="grace-td ">{{currentSymbolInfo.ask_volume_4}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-red">{{currentSymbolInfo.ask_price_3}}</text>
					<text class="grace-td ">{{currentSymbolInfo.ask_volume_3}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-red">{{currentSymbolInfo.ask_price_2}}</text>
					<text class="grace-td ">{{currentSymbolInfo.ask_volume_2}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-red" @tap="copyAskPrice1">{{currentSymbolInfo.ask_price_1}}</text>
					<text class="grace-td ">{{currentSymbolInfo.ask_volume_1}}</text>
				</view>
			</view>	
						
			<view class="grace-table grace-nowrap grace-flex-center">
				<view class="grace-tbody" @tap="copyCurrentPrice">
					<text class="grace-td">{{currentSymbolInfo.last_price}}</text>
				</view>
			</view>	
		
			<view class="grace-table">
				<text class="grace-td "></text>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-green" @tap="copyBidPrice1">{{currentSymbolInfo.bid_price_1}}</text>
					<text class="grace-td ">{{currentSymbolInfo.bid_volume_1}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-green">{{currentSymbolInfo.bid_price_2}}</text>
					<text class="grace-td ">{{currentSymbolInfo.bid_volume_2}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-green">{{currentSymbolInfo.bid_price_3}}</text>
					<text class="grace-td ">{{currentSymbolInfo.bid_volume_3}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-green">{{currentSymbolInfo.bid_price_4}}</text>
					<text class="grace-td ">{{currentSymbolInfo.bid_volume_4}}</text>
				</view>
				<view class="grace-tbody grace-space-between">
					<text class="grace-td grace-green">{{currentSymbolInfo.bid_price_5}}</text>
					<text class="grace-td ">{{currentSymbolInfo.bid_volume_5}}</text>
				</view>
			</view>	

			
			<view class="ucenter-line"></view>

			<view class="grace-nowrap">
				<view class="grace-title current-project">方向：</view>
				<picker mode="selector" @change="bindPickerChangeDirection" v-model="directionIndex" :range="directionList" range-key="name" name="name">
					<view class="grace-space-between grace-title">
						<!-- <view class="uni-input">{{ projectList[projectIndex].Name }}</view> -->
						<view class="uni-input">{{ selectedDirection }} </view>
						<view class="grace-icons icon-arrow-down"></view>
					</view>
				</picker>
			</view>
			
			<view class="grace-nowrap">
				<view class="grace-title current-project">开平：</view>
				<picker mode="selector" @change="bindPickerChangeOffset" v-model="offsetIndex" :range="offsetList" range-key="name" name="name">
					<view class="grace-space-between grace-title">
						<!-- <view class="uni-input">{{ projectList[projectIndex].Name }}</view> -->
						<view class="uni-input">{{ selectedOffset }} </view>
						<view class="grace-icons icon-arrow-down"></view>
					</view>
				</picker>
			</view>
			
			<view class="grace-nowrap">
				<view class="grace-title current-project">类型：</view>
				<picker mode="selector" @change="bindPickerChangeType" v-model="typeIndex" :range="typeList" range-key="name" name="name">
					<view class="grace-space-between grace-title">
						<!-- <view class="uni-input">{{ projectList[projectIndex].Name }}</view> -->
						<view class="uni-input">{{ selectedType }} </view>
						<view class="grace-icons icon-arrow-down"></view>
					</view>
				</picker>
			</view>
			
			<view class="grace-nowrap">
				<view class="grace-title current-project">价格：</view>
				<!-- <text class="dotnet-icons icon-wms-user-c icon grace-blue"></text> -->
				<input type="number" class="input text-align-left" name="orderPrice" v-model="orderPrice" placeholder="请输入价格"></input>
				<view class="grace-form-funs grace-icons icon-close" @tap="clearOrderPrice" v-if="orderPrice.length > 0"></view>
				
			</view>
			<view class="grace-nowrap">
				<view class="grace-title current-project">数量：</view>
				<!-- <text class="dotnet-icons icon-wms-user-c icon grace-blue"></text> -->
				<input type="number" class="input text-align-left" name="orderVolumn" v-model="orderVolume" placeholder="请输入金额"></input>
				<view class="grace-form-funs grace-icons icon-close" @tap="clearOrderVolume" v-if="orderVolume.length > 0"></view>
				
			</view>
			
			<view class="grace-margin-top grace-margin-bottom">
				<button type="default" class="grace-border-radius grace-bg-blue" @tap="bindOrder">下单</button>
			</view>
			</view>
			
			<view v-if="orderShow">
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
			</view>
			<view class="ucenter-line"></view>

			<graceHeaderAlert :show="showErrorMessage" background="#FF0036">
				<text class="grace-h5 grace-white">{{errorMessage}}</text>
			</graceHeaderAlert>
			
		</view>
	</gracePage>
</template>

<script>
import uniRequest from '../../http/uniRequest.js';
export default {
	data() {
		return {
			userIsLogin: false,
			serverUrl: '',
			userInfo: {},
			pageLoading: false,
			
			symbolList: [],
			symbolIndex: 0,
			
			//currentSymbolInfo: { gateway_name: '网关', exchange: '交易所', symbol: '代码' },
			currentSymbolInfo: {},
			
			directionList: ['多', '空'],
			directionIndex: 0,
			selectedDirection: '请选择方向',
			offsetList: ['开', '平', '平今', '平昨'],
			offsetIndex: 0,
			selectedOffset: '请选择开平',
			typeList: ['限价', '市价', 'STOP', 'FAK', 'FOK', '询价'],
			typeIndex: 0,
			selectedType: '请选择委托下单类型',
			
			orderPrice: 0,
			orderVolume: 0,
			
			orderData: [],
			
			tickShow: false,
			orderShow: false,
			showErrorMessage: false,
			errorMessage: ''
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
	methods: {
		clearOrderPrice: function() {
			this.orderPrice = '';
		},
		clearOrderVolume: function() {
			this.orderVolume = '';
		},
		bindPickerChangeSymbol: function(e) {
			var me = this;
			me.symbolIndex = e.target.value;
			//storage当前项目更新
			me.currentSymbolInfo = me.symbolList[me.symbolIndex];
			uni.setStorageSync('currentSymbolInfo', me.symbolList[me.symbolIndex]);
			me.updateTick();
			//me.getStatistics(me.currentProjectInfo.Id);
			//console.log(me.projectStatistic);
		},
		bindPickerChangeDirection: function(e){
			var me = this;
			me.directionIndex = e.target.value;
			me.selectedDirection = me.directionList[me.directionIndex];
		},
		bindPickerChangeOffset: function(e){
			var me = this;
			me.offsetIndex = e.target.value;
			me.selectedOffset = me.offsetList[me.offsetIndex];
		},
		bindPickerChangeType: function(e){
			var me = this;
			me.typeIndex = e.target.value;
			me.selectedType = me.typeList[me.typeIndex];
		},
		copyCurrentPrice(){
			this.orderPrice = this.currentSymbolInfo.last_price;
		},
		copyAskPrice1(){
			this.orderPrice = this.currentSymbolInfo.ask_price_1;
		},
		copyBidPrice1(){
			this.orderPrice = this.currentSymbolInfo.bid_price_1;
		},
		bindOrder(){
			var me = this;
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();
			var currentSymbolInfo = me.getCurrentSymbolInfo();
			// console.log(currentSymbolInfo);
			// console.log(me.selectedDirection);
			// console.log(me.selectedType);
			// console.log(me.orderVolume);
			// console.log(me.orderPrice);
			// console.log(me.selectedOffset);
			uni.showLoading({
				title: '下单中...'
			});
			//下单
			uni.request({
				url: serverUrl + '/order',
				method: 'POST',
				header: {
					"Authorization": userInfo.token_type + ' ' + userInfo.access_token
					// "content-type": "application/x-www-form-urlencoded",
					// "accept": "application/json"
				},
				data: {
					"symbol": me.currentSymbolInfo.symbol,
					"exchange": me.currentSymbolInfo.exchange,
					"direction": me.selectedDirection,
					"type": me.selectedType,
					"volume": me.orderVolume,
					"price": me.orderPrice,
					"offset": me.selectedOffset,
					"reference": "WebTrader"
				},
				success: res => {
					console.log(res);
					if (res.statusCode == 200) {
						me.updateOrder();
						me.updateTick();
						uni.showToast({
							title: '下单成功',
							duration: 2000,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.data.detail,
							duration: 2000,
							icon: 'none'
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
			
		},
		
		updateTick(){
			var me = this;
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();
			var currentSymbolInfo = me.getCurrentSymbolInfo();
			//console.log(currentSymbolInfo);
			uni.request({
				url: serverUrl + '/tick',
				method: 'GET',
				header: {
					"Authorization": userInfo.token_type + ' ' + userInfo.access_token,
					"content-type": "application/x-www-form-urlencoded",
					"accept": "application/json"
				},
				success: res => {
					//console.log(res);
					if (res.statusCode == 200) {
						me.symbolList = res.data;
						if(me.symbolList.length > 0){
							//显示tick table
							me.tickShow = true;
							//查看currentSymbolInfo是否有值
							if(currentSymbolInfo === null){
								me.currentSymbolInfo = me.symbolList[0];
								uni.setStorageSync('currentSymbolInfo', me.symbolList[0]);
							}
							else {
								let listIncludeCurrentSymbol = false;
								for (let i = 0; i < me.symbolList.length; i++) {
									if (currentSymbolInfo.gateway_name === me.symbolList[i].gateway_name && currentSymbolInfo.exchange === me.symbolList[i].exchange && currentSymbolInfo.symbol === me.symbolList[i].symbol) {
										me.symbolIndex = i;
										//刷新me.currentProjectInfo信息并保存到内存
										me.currentSymbolInfo = me.symbolList[i];
										uni.setStorageSync('currentSymbolInfo', me.symbolList[i]);
										listIncludeCurrentSymbol = true;
									}
								}
								if(!listIncludeCurrentSymbol){
									me.currentSymbolInfo = me.symbolList[0];
									uni.setStorageSync('currentSymbolInfo', me.symbolList[0]);
								}
							}
						} else {
							//隐藏tick table
							me.tickShow = false;
							me.errorMessage = '未订阅tick，请到服务器订阅！';
							me.showErrorMessage = !me.showErrorMessage;
							return;
						}
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
					// setTimeout(function() {
					// 	uni.hideLoading();
					// }, 2000);
				}
			});
		},
		
		updateOrder(){
			var me = this;
			var userInfo = me.getCurrentUserInfo();
			var serverUrl = me.getServerUrl();
			var currentSymbolInfo = me.getCurrentSymbolInfo();
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
						if(res.data.length > 0){
							me.orderData = res.data;
							me.orderShow = true;
						}
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
					// setTimeout(function() {
					// 	uni.hideLoading();
					// }, 2000);
				}
			});
		},
		
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
				//读取ProjectList
				me.updateTick();
				me.updateOrder();

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
.scroll{
  overflow: auto;
}
.item{
  height: 50px;
  background: pink;
  border: 1px solid #ddd;
}
.bottom{
  height: 40px;
  line-height: 40px;
}	

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
