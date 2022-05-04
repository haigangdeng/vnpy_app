import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//获取App环境信息
Vue.prototype.getAppEnvironment = function(key) {
	//从本地缓存中获取
	try {
		//debugger;
		let appEnvironment = uni.getStorageSync('appEnvironment');
		if (appEnvironment != null && appEnvironment != "" && typeof appEnvironment != undefined) {
			return appEnvironment;
		} else {
			return 'production';
		}
	} catch (e) {
		//TODO handle the exception
		return 'production';
	}
}

//获取ServerUrl
Vue.prototype.getServerUrl = function(key) {
	let appEnvironment = this.getAppEnvironment();
	let serverList = uni.getStorageSync('serverList');
	if (appEnvironment === 'production') {
		return 'http://' + serverList.productionServer;
	} else if (appEnvironment === 'test') {
		return 'http://' + serverList.testServer;
	} else {
		return '';
	}
}

Vue.prototype.appKey = "Tony";
Vue.prototype.appSecret = "Tony";

Vue.prototype.getUserAcceptAgreement = function(key) {
	//从本地缓存中获取
	try {
		//debugger;
		let userAcceptAgreement = uni.getStorageSync('userAcceptAgreement');
		if (userAcceptAgreement != null && userAcceptAgreement != "" && typeof userAcceptAgreement != undefined) {
			return userAcceptAgreement;
		} else {
			return '';
		}
	} catch (e) {
		return '';
	}
}

//获取当前项目信息
Vue.prototype.getCurrentProjectInfo = function(key) {
	var currentProjectInfo = uni.getStorageSync("currentProjectInfo");
	if (currentProjectInfo != null && currentProjectInfo != "" && typeof currentProjectInfo != undefined) {
		return currentProjectInfo;
	} else {
		return null;
	}
}

Vue.prototype.getCurrentSymbolInfo = function(key) {
	var currentSymbolInfo = uni.getStorageSync("currentSymbolInfo");
	if (currentSymbolInfo != null && currentSymbolInfo != "" && typeof currentSymbolInfo != undefined) {
		return currentSymbolInfo;
	} else {
		return null;
	}
}

//获取AppKey
Vue.prototype.getCookieHours = function() {
	let cookieType = uni.getStorageSync("cookieType");
	if (cookieType === '1') {
		return 24;
	} else if (cookieType === '30') {
		return 720;
	} else {
		return 168;
	}
}

//获取当前登录用户信息
Vue.prototype.getCurrentUserInfo = function() {
	var userInfo = uni.getStorageSync("currentUserInfo");
	if (userInfo != null && userInfo != "" && typeof userInfo != undefined) {
		if (userInfo.expiredDate > new Date()) {
			return userInfo;
		} else {
			uni.removeStorageSync("currentUserInfo");
			return null;
		}
	} else {
		return null;
	}
}

import gracePage from "./graceUI/components/gracePage.vue";
Vue.component('gracePage', gracePage);
import graceHeaderAlert from './graceUI/components/graceHeaderAlert.vue';
Vue.component('graceHeaderAlert', graceHeaderAlert);
import graceDialog from './graceUI/components/graceDialog.vue';
Vue.component('graceDialog', graceDialog);
import graceNav from './graceUI/components/graceNavBar.vue';
Vue.component('graceNav', graceNav);

import './common/dateDiff.js'
import './common/util.js'

import uniRequest from './http/uniRequest.js'

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
