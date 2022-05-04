<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-list grace-margin-top">
				<graceDialog title="服务协议和隐私政策" :show="showPrivacyDialog" v-on:closeDialog="doNotAcceptPrivacy">
					<view class="contentPrivacyDialog" slot="content">
						<text>请务必审慎阅读、充分理解《服务协议》和《隐私政策》各项条款，包括但不限于：为了向您提供服务，我们需要收集您的设备信息，操作日志等个人信息，您可以通过链接<text @click="openAgreement()"
							 class="grace-red">《服务协议》</text>和<text @click="openPrivacy()" class="grace-red">《隐私政策》</text>阅读了解详细信息。如您同意，请点击“同意”开始接受我们的服务。</text>
					</view>
					<view slot="btns" class="grace-space-between">
						<text class="grace-dialog-buttons" @tap="doNotAcceptPrivacy">不同意</text>
						<text class="grace-dialog-buttons grace-blue" @tap="acceptPrivacy">同意</text>
					</view>
				</graceDialog>
			</view>
			<view class="grace-margin-top grace-margin-bottom"></view>
			<view class="img grace-flex-center grace-wrap">
				<image src="../../static/img/logo.png" mode="widthFix" style="width: 100px;"></image>
			</view>

			<view class="grace-form grace-margin-top">
				<view class="grace-items">
					<text class="dotnet-icons icon-wms-user-c icon grace-blue"></text>
					<view class="grace-label">用户</view>
					<input type="text" class="input text-align-left" name="userName" v-model="userName" placeholder="请输入您的用户名"></input>
					<view class="grace-form-funs grace-icons icon-close" @tap="clearUserName" v-if="userName.length > 0"></view>
				</view>
				<view class="grace-items">
					<text class="dotnet-icons icon-wms-key icon grace-blue"></text>
					<view class="grace-label">密码</view>
					<input :type="showPassword?'text':'password'" class="input text-align-left" name="password" v-model="password"
					 placeholder="请输入您的密码" />
					<view class="grace-form-funs grace-icons icon-eye" :style="{color:showPassword?'#007aff':''}" @tap="showPassword = !showPassword"></view>
				</view>

				<view class="grace-items">
					<text class="grace-icons icon-address icon grace-blue"></text>
					<view class="grace-label">服务器</view>

					<view class="grace-items-login">
						<input type="text" class="input text-align-left" name="serverUrlName" v-model="serverUrlName" @tap="bindServerUrlChange"
						 placeholder="请输入服务器IP地址" disabled="true"></input>
					</view>
				</view>
				<view class="grace-items">
					<text class="dotnet-icons icon-wms-question-b icon grace-blue"></text>
					<view class="grace-label">保持在线</view>
					<view class="grace-select-tags">
						<radio-group @change="cookieTypeSelectChange" name="cookieType">
							<label v-for="(item, index) in cookieTypes" :key="index" :class="[item.checked ? 'grace-checked' : '']">
								<radio :value="item.value" :checked="item.checked"></radio> {{item.name}}
							</label>
						</radio-group>
					</view>
				</view>

			</view>

			<view class="grace-margin-top grace-margin-bottom">
				<button type="default" class="grace-border-radius grace-bg-blue" @tap="bindLogin">登录<text class="grace-icons icon-arrow-right"></text></button>
			</view>
			<view class="grace-margin-top grace-margin-bottom"></view>
			<view class="grace-flex-center grace-wrap">
				<!-- <navigator open-type="reLaunch" url="register" class="grace-padding">注册新用户</navigator> -->
				<!-- <navigator open-type="reLaunch" url="forgetpassword" class="grace-padding">忘记密码</navigator> -->
				<navigator open-type="reLaunch" url="/pages/help/help" class="grace-padding">不知道账户密码？点此查看帮助</navigator>
			</view>

			<view class="serverurllinkspace"></view>
			<view class="grace-margin-top grace-margin-bottom"></view>
			<view class="grace-flex-center grace-wrap">
				<navigator open-type="reLaunch" url="updateserverurl?returnurl=login">维护服务器IP地址</navigator>
			</view>

			<graceHeaderAlert :show="showErrorMessage" background="#FF0036">
				<text class="grace-h5 grace-white">{{errorMessage}}</text>
			</graceHeaderAlert>

		</view>
	</gracePage>
</template>

<script>
	export default {
		props: {
			focus: {
				type: [Boolean, String],
				default: false
			}
		},
		data() {
			return {
				showPrivacyDialog: true,
				cookieTypes: [{
						name: '1天',
						value: '1',
						checked: false
					},
					{
						name: '1周',
						value: '7',
						checked: true
					},
					{
						name: '1月',
						value: '30',
						checked: false
					}
				],
				userName: '',
				password: '',
				positionTop: 0,
				showPassword: false,
				serverUrlName: '测试服务器', // Local
				showErrorMessage: false,
				errorMessage: ''
			}
		},
		onLoad() {
			var me = this;
			var appEnvironment = me.getAppEnvironment();
			if (appEnvironment == 'production') {
				me.serverUrlName = "实盘服务器";
			} else if (appEnvironment == 'test') {
				me.serverUrlName = "测试服务器";
			} else {
				me.serverUrlName = "实盘服务器";
			}
			var userInfo = me.getCurrentUserInfo();
			//console.log(userInfo);
			if (userInfo != null) {
				uni.reLaunch({
					url: '../main/main'
				})
			}
			uni.getSystemInfo({
				success: (res) => {
					// console.log(res.platform);
					//检测当前平台，如果是安卓则强制弹窗用户协议及隐私条款  
					if (res.platform == "android") {
						// me.showPrivacyDialog = true;
						var userAcceptAgreement = me.getUserAcceptAgreement();
						me.showPrivacyDialog = userAcceptAgreement == '' ? true : false;
					} else {
						me.showPrivacyDialog = false;
					}
				}
			})
		},
		methods: {
			initPosition() {
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			openAgreement() {
				uni.reLaunch({
					url: 'agreement'
				})
			},
			openPrivacy() {
				uni.reLaunch({
					url: 'privacy'
				})
			},
			acceptPrivacy: function() {
				var me = this;
				uni.setStorageSync('userAcceptAgreement', "Y");
				me.showPrivacyDialog = false;
			},
			doNotAcceptPrivacy: function() {
				var me = this;
				me.errorMessage = '请选择同意后继续！';
				me.showErrorMessage = !me.showErrorMessage;
			},
			clearUserName: function() {
				this.userName = '';
			},
			// 单选示例
			cookieTypeSelectChange: function(e) {
				var checkVal = e.detail.value;
				for (var i = 0; i < this.cookieTypes.length; i++) {
					if (checkVal == this.cookieTypes[i].value) {
						this.cookieTypes[i].checked = true;
						//保存信息到本地
						uni.setStorageSync("cookieType", this.cookieTypes[i].value);
						//console.log(this.cookieTypes[i].value);
					} else {
						this.cookieTypes[i].checked = false;
					}
				}
				this.cookieTypes = this.cookieTypes;
			},
			bindServerUrlChange() {
				//this.showServerUrl = !this.showServerUrl;
				let me = this;
				let serverList = uni.getStorageSync('serverList');
				uni.showActionSheet({
					itemList: ['实盘服务器', '测试服务器'],
					success: function(res) {
						if (res.tapIndex === 0) {
							uni.setStorageSync("appEnvironment", "production");
							me.serverUrlName = "实盘服务器";
							if (serverList.productionServer != null && serverList.productionServer != "" && typeof(serverList.productionServer) != undefined) {
								//console.log("production不为空");
							} else {
								uni.reLaunch({
									url: 'updateserverurl?returnurl=login'
								})
							}
						} else {
							uni.setStorageSync("appEnvironment", "test");
							me.serverUrlName = "测试服务器";
							if (serverList.testServer != null && serverList.testServer != "" && typeof(serverList.testServer) != undefined) {
								//console.log("production不为空");
							} else {
								uni.reLaunch({
									url: 'updateserverurl?returnurl=login'
								})
							}
						} 
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});

			},
			bindLogin() {
				var me = this;
				if (me.userName.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '用户名最短为 3 个字符'
					});
					return;
				}
				if (me.password.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 3 个字符'
					});
					return;
				}
				
				var userName = me.userName;
				var password = me.password;
				var serverUrl = me.getServerUrl();
				if(serverUrl == ''){
					me.errorMessage = '请检查服务器IP是否正确';
					me.showErrorMessage = !me.showErrorMessage;
					// uni.showToast({
					// 	icon: 'none',
					// 	title: '请维护服务器IP地址！'
					// });
					return;
				}
				//console.log(serverUrl);
				
				uni.showLoading({
					title: '登录中...'
				});
				
				uni.request({
					url: serverUrl + '/token',
					method: "POST",
					header: {
						"content-type": "application/x-www-form-urlencoded",
						"accept": "application/json"
					},
					data:{
						"username": userName, 
						"password": password
					},
					success: (res) => {
						//console.log(res);
						if (res.statusCode == 200) {
							var userInfo = res.data;
							//向userInfo添加过期日期
							var cookieHours = me.getCookieHours();
							var timeNow = new Date();
							var expiredDate = timeNow.setTime(timeNow.setHours(timeNow.getHours() + cookieHours));
							userInfo.expiredDate = expiredDate;
							userInfo.UserName = userName;
							// 保存用户信息到全局的缓存中
							uni.setStorageSync("currentUserInfo", userInfo);
							
							// uni.reLaunch({
							// 	url: "../pages/main/asset"									
							// });
							uni.switchTab({
								url:"../main/asset"
							});
							console.log(userInfo);
							console.log(uni.getStorageInfoSync("currentUserInfo"))
						} else {
							me.errorMessage = res.data.detail;
							me.showErrorMessage = !me.showErrorMessage;
							//return;
						}
					},
					fail: (res) => {
						//console.log(res);
						me.errorMessage = '请检查服务器IP是否正确';
						me.showErrorMessage = !me.showErrorMessage;
						// uni.showToast({
						// 	title: '网络异常请重试',
						// 	duration: 2000,
						// 	icon: 'none'
						// });
					},
					complete: function() {
						setTimeout(function() {
							uni.hideLoading();
						}, 2000);
					}
				});

			},
			register() {
				uni.reLaunch({
					url: 'register'
				})
			}
		},
		onReady() {
			this.initPosition();
		},
		components: {

		},
		onShareAppMessage(res) {
			return {
				title: 'VeighNa - 基于Python的开源量化交易平台开发框架',
				path: '/pages/help/help'
			};
		}
	}
</script>

<style>
	.contentPrivacyDialog {
		padding: 30rpx;
		padding-right: 80rpx;
		line-height: 50rpx;
		font-size: 26rpx;
	}

	.demo {
		margin-top: 30upx;
		display: flex;
		flex-wrap: nowrap;
	}

	.demo view {
		width: 100%;
		text-align: center;
		padding: 10upx 2%;
	}

	.demo .btnLogin {
		width: 45%;
		min-width: 230upx;
	}

	.grace-button {
		display: block;
		white-space: nowrap;
		width: 125rpx;
		height: 80upx;
		text-align: center;
	}

	.grace-button-new {
		display: block;
		white-space: nowrap;
		width: 200rpx;
		height: 80upx;
		text-align: center;
		font-size: 14upx;
	}

	.grace-items-login {
		display: flex;
		width: 100%;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: space-between;
		padding: 10rpx 0;
	}

	.serverurllinkspace {
		margin: 120rpx;
	}
</style>
