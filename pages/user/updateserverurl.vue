<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			<view class="grace-form grace-margin-top">
				<view class="grace-items">
					<text class="grace-icons icon-address icon grace-blue"></text>
					<view class="grace-label">实盘：</view>
					<input type="text" class="input text-align-left" name="privateServer" v-model="productionServer" placeholder="格式:xxx.xxx.xxx.xxx:yyyy" />
					<!-- #ifndef H5 -->
					<view class="grace-icons icon-photograph icon grace-blue" @tap="scanProduction"></view>
					<!-- #endif -->
				</view>
				
				<view class="grace-items">
					<text class="grace-icons icon-address icon grace-blue"></text>
					<view class="grace-label">测试：</view>
					<input type="text" class="input text-align-left" name="privateServer" v-model="testServer" placeholder="格式:xxx.xxx.xxx.xxx:yyyy" />
					<!-- #ifndef H5 -->
					<view class="grace-icons icon-photograph icon grace-blue" @tap="scanTest"></view>
					<!-- #endif -->
				</view>
				

				<view class="grace-margin-top"><button type="primary" class="grace-button" @click="saveServer">保存服务器地址</button></view>
			</view>
		</view>
	</gracePage>
</template>

<script>
export default {
	data() {
		return {
			productionServer: '',
			testServer: '',
			returnUrl: ''
		};
	},
	onLoad: function(parameters) {
		var me = this;
		var serverList = uni.getStorageSync('serverList');
		me.productionServer = serverList.productionServer;
		me.testServer = serverList.testServer;
		var returnUrl = parameters.returnurl;
		if (returnUrl == null || typeof returnUrl == undefined) {
			uni.reLaunch({
				url: 'login'
			});
		} else {
			me.returnUrl = returnUrl;
		}
	},
	methods: {
		saveServer() {
			var me = this;
			// if(me.productionServer != ''){
			// 	if(!me.isIP(me.productionServer)){
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '实盘服务器IP错误！'
			// 		})
			// 		return;
			// 	}
			// }
			// if(me.testServer != ''){
			// 	if(!me.isIP(me.testServer)){
			// 		uni.showToast({
			// 			icon: 'none',
			// 			title: '测试服务器IP错误！'
			// 		})
			// 		return;
			// 	}
			// }
			
			var serverList = {
				productionServer: me.productionServer,
				testServer: me.testServer
			};
			uni.setStorageSync('serverList', serverList);
			uni.reLaunch({
				url: me.returnUrl
			}); 
		},
		isIP(ip){
			var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
			return re.test(ip);
		},
		scanProduction() {
			var me = this;
			uni.scanCode({
				//onlyFromCamera: true,
				success: function(res) {
					me.productionServer = res.result;
				}
			});
		},
		scanTest() {
			var me = this;
			uni.scanCode({
				//onlyFromCamera: true,
				success: function(res) {
					me.testServer = res.result;
				}
			});
		},
		onNavigationBarButtonTap(e) {
			if (e.type == 'back') {
				uni.reLaunch({
					url: 'login'
				});
			}
		}
	}
};
</script>

<style></style>
