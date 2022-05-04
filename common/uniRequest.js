 
module.exports = {
	get: function (url, data) {
		let serverUrl = this.getServerUrl();
		let userInfo = this.getCurrentUserInfo();
		let appKey = this.appKey;
		let appSecret = this.appSecret;
    uni.request({
        url: serverUrl + url,
		method: 'GET',
		header: {
			'appKey': appKey,
			'appSecret': appSecret,
			'userId': userInfo.Id,
			'openId': userInfo.OpenId
		},
        data: data,
        success: (res) => {
            if (res.data.Status) {
                // 设置返回的数据
                res(data.data)
            } else {
                // 干一些事情
            }
        }
    });
	},
	post : function(url, data, success, fail){
		let serverUrl = this.getServerUrl();
		let userInfo = this.getCurrentUserInfo();
		let appKey = this.appKey;
		let appSecret = this.appSecret;
		uni.showToast({
			title:'数据加载中',
			duration: 1500
		})
		uni.request({
			url      : serverUrl + url,
			
			method   : "POST",
			header: {
				'appKey': appKey,
				'appSecret': appSecret,
				'userId': userInfo.Id,
				'openId': userInfo.OpenId
			},
			data     : data,
			success  : (res) => {
				if (res.data.Status) {
					success(res.data);
				}
				},
			fail     : fail(),
			complete : () => {
				uni.hideLoading();
			}
		});
	}
}