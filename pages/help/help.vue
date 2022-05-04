<template>
	<gracePage :customHeader="false">
		<view slot="gBody" class="grace-body">
			
			<view class="grace-rows grace-flex-center grace-margin-top">
				<graceImg src="/static/img/help.png" :width="690"></graceImg>
			</view>
			
			<view class="grace-margin-top">
				<text class="grace-title">第一步：启动vnpy</text>
			</view>
			<view>
				<text  class="grace-text">登录服务器，运行VeighNa Station，勾选应用模块下的 WebTrader，点【启动】</text>
			</view>
			
			<view class="grace-margin-top">
				<text class="grace-title">第二步，启动Web服务</text>
			</view>
			<view>
				<text  class="grace-text">点Web服务的按钮，修改监听地址：0.0.0.0，端口号可以修改为自己喜欢的端口号，此端口号在云服务器安全策略组要打开，服务器内也要添加入站规则里添加允许，点【启动】</text>
				<graceImg src="/static/img/startweb.png" :width="690"></graceImg>
			</view>
			
			<view class="grace-margin-top">
				<text class="grace-title">第三步：用手机App操盘</text>
			</view>
			<view>
				<text  class="grace-text">在手机App添加刚才的服务器，格式为xxx.xxx.xxx.xxx:yyyy，后面的yyyy为第二步修改的端口号。在本App操作操作策略，实时查看策略运行成果及跟踪差异</text>
			</view>
			
			<view class="grace-margin-top">
				<text class="grace-title">有疑问，联系Tony</text>
			</view>
			<view>
				<text  class="grace-text">WeChat：540081584</text>
			</view>
			
			<view class="grace-margin-top">
				<text class="grace-title">问答</text>
			</view>
			<view>
				<text  class="grace-text">如何在App配置服务器地址？</text>
			</view>
			<view>
				<text  class="grace-text">点【我的】- 维护服务器地址，可以维护测试服务器，实盘服务器</text>
			</view>
			<view class="grace-margin-top">
				<text  class="grace-text">如何修改账户密码？</text>
			</view>
			<view>
				<text  class="grace-text">进入服务器，进入C:\Users\用户名\.vntrader，找到web_trader_setting.json，用写字板打开，对username和password进行修改，重启vnpy</text>
			</view>
			<view class="grace-margin-top">
				<text  class="grace-text">服务器端增加中间件</text>
			</view>
			<view>
				<text  class="grace-text">进入服务器，找到文件C:\veighna_studio\Lib\site-packages\vnpy_webtrader\web.py
					添加引用
					from fastapi.middleware.cors import CORSMiddleware
					第133行 app = FastAPI() 之后添加
					app.add_middleware(
						CORSMiddleware,
						allow_origins=["*"],
						allow_credentials=True,
						allow_methods=["*"],
						allow_headers=["*"],
					)
				</text>
			</view>
			
<!-- 			<view>
				<text class="grace-text" @click="phoneCall">电话：15301878797（马女士）</text>
			</view> -->

			<view style="height: 200rpx;"></view>

		</view>
	</gracePage>
</template>

<script>
	import gracePage from "../../graceUI/components/gracePage.vue";
	import graceImg from "../../graceUI/components/graceImg.vue";
	var graceRichText = require('../../graceUI/jsTools/richText.js');
export default {
	data() {
		return {

		};
	},
	onLoad() {
		
	},
	onShow() {

	},
	components:{
		gracePage, 
		graceImg
	},
	methods: {
		phoneCall(){
			uni.makePhoneCall({
			    phoneNumber: '13817631418'
			});
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

<style></style>
