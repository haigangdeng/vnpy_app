/*
graceUI-JS - 安卓 app 版本检查与更新
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！
*/

module.exports = {
	
	checkAndUpdate : function (url) {
		
		// url
		// 联网检查版本信息  此地址返回 json 形式的数据， 
		// 预定格式{version : 1.1, url:"h5更新页面地址", apkurl : "最新版本 apk 安装文件地址", note : "更新说明"}
		
		// 连接服务器比对版本
		uni.request({
			url: url,
			method: 'GET',
			data: {},
			success: res => {
				
				// 获取 app 版本 [ 此版本在打包时设置 ]
				var currentVersion =  plus.runtime.version;
				// 本地版本与服务器版本不一致进行更新
				if(res.data.version != currentVersion){
					uni.showModal({ //提醒用户更新  
						title: "更新提示",  
						content: res.data.note,
						confirmText : "立即更新",
						success: (res2) => {  
							if (res2.confirm) {
								
								// 获取手机操作系统
								var vendor =  plus.os.vendor;
								console.log(vendor);
								//Android - 2.2+ (支持): 返回字符串“Google”
								//iOS - 4.3+ (支持): 返回字符串“Apple”
								//可以根据操作系统进行具体的操作
								
								// 第 1 种方式 [ 浏览器打开更新页面 ]
								// 跳转到 h5 页面进行下载及更新
								plus.runtime.openURL(res.data.url);
								
								/* 第2 种方式 [ 直接下载安装 只适合 安卓]
								var dtask = plus.downloader.createDownload(res.data.apkurl, {method:"GET"}, function(d, status){
									if(status == 200){
										uni.showToast({
											title :'新版本下载成功，开始安装',
											icon  :"none"
										});
										plus.runtime.install(d.filename);
									}
								});
								dtask.start();
								*/
							}  
						}  
					})
				}
			}
		});
	} 
}