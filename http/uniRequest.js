import global from '../utils/global.js'

export default function uniRequest(url, param, method){
	return new Promise((resolve, reject) => {
		var serverUrl = global.getServerUrl();
		var appKey = global.appKey;
		var appSecret = global.appSecret;
		var userInfo = global.getUserInfo();
		
		var errInfo = {};
		//发送前拦截,用户是否登录,url是否正确
		if(userInfo == null){
			//清空缓存
			//uni.removeStorageSync();
			uni.removeStorageSync('currentUserInfo');
			errInfo.code = 0;
			errInfo.message = '用户未登录';
			return reject(errInfo);
		}
		
		uni.request({
			url: serverUrl + url + param,
			method: method,
			header: {
				'appKey': appKey,
				'appSecret': appSecret,
				'userId': userInfo.Id,
				'openId': userInfo.OpenId
			},
			success: res => {
				if (res.data.Status) {
					//全局拦截
					if (res.data.StatusCode == 'UserNotLogin') {
						uni.removeStorageSync('currentUserInfo');
						errInfo.code = 0;
						errInfo.message = '用户异地登录';
						reject(errInfo);
					} else {
						//console.log(res);
						resolve(res);
					}
				} else {
					errInfo.code = 1;
					errInfo.message = res.data.StatusMessage;
					reject(errInfo);
				}
			},
			fail: error => {
				errInfo.code = 1;
				errInfo.message = '网络异常请重试';
				reject(errInfo);
				}
		});
		
		
	})
}
