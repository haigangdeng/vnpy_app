/*
link   : http://grace.hcoder.net
author : 刘海君 5213606@qq.com 
verson : 1.01
last update date : 2020-03-19
*/
module.exports = {
	// 版本检查
	verson : function(){
		var currentVersion = '1.0';
		console.log(currentVersion);
	},
	// --- 页面跳转相关 ---
	// 页面跳转
	navigate:function (url, type, success, fail, complete) {
		if(!type){type = 'navigateTo';}
		if(!success){success = function(){};}
		if(!fail){fail = function(){};}
		if(!complete){complete = function(){};}
		switch(type){
			case 'navigateTo' : 
			uni.navigateTo({url:url, success:success, fail:fail, complete:complete});
			break;
			case 'redirectTo' : 
			uni.redirectTo({url:url, success:success, fail:fail, complete:complete});
			break;
			case 'switchTab' : 
			uni.switchTab({url:url, success:success, fail:fail, complete:complete});
			break;
			case 'reLaunch' : 
			uni.reLaunch({url:url, success:success, fail:fail, complete:complete});
			break;
		}
	},
	// 返回
	back:function(delta){
		if(!delta){delta = 1;}
		uni.navigateBack({delta:delta});
	},
	
	// --- 网络请求 ---
	// get
	get : function(url, data, headers, success, fail){
		if(!fail){fail = () => {this.msg("网络请求失败");}}
		if(!headers){headers={};}
		if(this.__before != null){this.__before(); this.__before = null;}
		uni.request({
			url      : url,
			data     : data,
			method   : "GET",
			dataType : "json",
			header   : headers,
			success  : (res) => {success(res.data);},
			fail     : fail,
			complete : () => {if(this.__after != null){this.__after(); this.__after = null;}}
		});
	},
	// post
	post : function(url, data, contentType, headers, success, fail){
		if(!fail){fail = () => {this.msg("网络请求失败");}}
		if(!headers){headers={};}
		if(!contentType){contentType = 'form';}
		if(this.__before != null){this.__before(); this.__before = null;}
		switch(contentType){
			case "form" : 
			headers['content-type'] = 'application/x-www-form-urlencoded';
			break;
			case "json" : 
			headers['content-type'] = 'application/json';
			break;
			default :
			headers['content-type'] = 'application/x-www-form-urlencoded';
		}
		uni.request({
			url      : url,
			data     : data,
			method   : "POST",
			dataType : "json",
			header   : headers,
			success  : (res) => {success(res.data);},
			fail     : fail,
			complete : () => {if(this.__after != null){this.__after(); this.__after = null;}}
		});
	},
	// 请求前置函数
	__before : null,
	setBefore : function(func){
		this.__before = func;
	},
	// 请求后置函数
	__after : null,
	setAfter : function(func){
		this.__after = func;
	},
	
	// --- 数据缓存 ---
	setStorage : function(data){
		try {
			for(let k in data){uni.setStorageSync(k, data[k]+'');}
			return true;
		} catch (e){return false;}
	},
	getStorage : function(keyName){
		try {
			var tmpVal = uni.getStorageSync(keyName);
			if(tmpVal == ''){return false;}
			return tmpVal;
		} catch (e){return false;}
	},
	removeStorage : function(keyName){
		try {
			uni.removeStorageSync(keyName);
			return true;
		} catch (e){return false;}
	},
	clearStorage : function(){
		try { uni.clearStorageSync(); } catch (e) {}
	},
	
	// --- 图片相关 ---
	chooseImgs : function(sets, success, fail, complete) {
		if(!sets.count){sets.count = 1;}
		if(!sets.sizeType){sets.sizeType = ['original', 'compressed'];}
		if(!sets.sourceType){sets.sourceType = ['album', 'camera'];}
		uni.chooseImage({
		    count: sets.count, //默认9
		    sizeType: sets.sizeType, //可以指定是原图还是压缩图，默认二者都有
		    sourceType: sets.sourceType, //从相册选择
		    success:(res) => {success(res.tempFilePaths);},
			fail: (e) => { if(fail){fail(e);}},
			complete: (e) => { if(complete){complete(e);}}
		});
	},
	getImageInfo : function(imgUrl, success, fail, complete){
		uni.getImageInfo({
			src: imgUrl,
			success: function (info) {success(info);},
			fail: (e) => { if(fail){fail(e);}},
			complete: (e) => { if(complete){complete(e);}}
		});
	},
	previewImage : function (items, currentImg) {
		uni.previewImage({ urls: items, current:currentImg});
	},
	
	// --- 系统信息 ---
	system : function () {
		try {
		    var res = uni.getSystemInfoSync();
			var iPhoneXBottom = 0;
			res.model = res.model.replace(' ', '');
			res.model = res.model.toLowerCase();
			if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
				res.iPhoneXBottomHeightRpx = 50;
				res.iPhoneXBottomHeightPx = uni.upx2px(50);
			}else{
				res.iPhoneXBottomHeightRpx = 0;
				res.iPhoneXBottomHeightPx  = 0;
			}
			return res;
		} catch (e){
		    return null;
		}
	},
	
	// --- 消息弹框 ---
	msg : function(msg){uni.showToast({title:msg, icon:"none"});},
	showLoading : function (title) {uni.showLoading({  title:title });},
	
	// --- 导航条设置 ---
	setNavBar : function(sets){
		if(sets.title){uni.setNavigationBarTitle({title:sets.title});}
		if(sets.color){
			uni.setNavigationBarColor({
			    frontColor: sets.color.frontColor,
			    backgroundColor:sets.color.backgroundColor,
			    animation: {
			        duration: 400,
			        timingFunc: 'easeIn'
			    }
			});
		}
		if(sets.loading){
			uni.showNavigationBarLoading();
		}else{
			uni.hideNavigationBarLoading();
		}
	},
	
	// --- 元素选择 ---
	// 单个元素选择
	select : function (selector, callBack) {
		uni.createSelectorQuery().select(selector).boundingClientRect().exec((res)=>{callBack(res[0]);});
	},
	// 多个元素获取
	selectAll : function (selector, callBack) {
		uni.createSelectorQuery().selectAll(selector).boundingClientRect().exec((res)=>{callBack(res[0]);});
	},
	
	// --- 数组操作 ---
	// 数组合并
	arrayConcat : function(){
		var tmpArr = [];
		for(let i = 0; i < arguments.length; i++){tmpArr = tmpArr.concat(arguments[i]);}
		return tmpArr;
	},
	arrayDrop : function(array, index, howmany){
		if(!index){index = 0;}
		if(!howmany){howmany = 1;}
		array.splice(index, howmany);
		return array;
	},
	arrayIndexOf : function(arr, needFind){
		var index = -1;
		for(let i = 0; i < arr.length; i++){
			if(arr[i] == needFind){index = i; return i;}
		}
		return index;
	},
	arrayDifference : function(a, b){
		const set = new Set(b);
		return a.filter(x => !set.has(x));
	},
	arrayShuffle : function (arr) {
		let l = arr.length;
		while (l) {
			const i = Math.floor(Math.random() * l--);
			[arr[l], arr[i]] = [arr[i], arr[l]];
			console.log(i);
		}
		return arr;
	},
	arraySum: function(arr){
		return arr.reduce((acc, val) => acc + val, 0);
	},
	arrayAvg: function(arr){
		return arr.reduce((acc, val) => acc + val, 0) / arr.length;
	},
	arrayEach : function(arr, fun){
		for(let i = 0; i < arr.length; i++) {fun(arr[i], i);}
	},
	
	// 2数之间的随机数
	random : function(min, max){ 
		switch(arguments.length){ 
			case 1: 
			return parseInt(Math.random() * min + 1,10); 
			break;
			case 2: 
			return parseInt(Math.random() * (max - min + 1 ) + min, 10); 
			break;
			default: 
			return 0;
		}
	},
	
	// UUID
	uuid : function(len){
		var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    var uuid = [], i;
	    if(len){
	        for (i = 0; i < len; i++){uuid[i] = chars[0 | Math.random() * chars.length];}
	    }else{
	        var r;
	        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	        uuid[14] = '4';
	        for(i = 0; i < 36; i++){
	            if (!uuid[i]){
	                r = 0 | Math.random() * 16;
	                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	            }
	        }
	    }
	    return uuid.join('');
	},
	
	// --- 日期时间 ---
	now : function (type, addTime) {
		var dateObj = new Date();
		var cTime = dateObj.getTime();
		if(addTime){cTime += addTime;}
		if(!type){type = 'number';}
		if(type == 'number'){return cTime;}
		return this.toDate(cTime / 1000, 'str');
	},
	// 时间戳转 YY-mm-dd HH:ii:ss
	toDate : function(timeStamp, returnType){
		timeStamp = parseInt(timeStamp);
		var date = new Date();
		if(timeStamp < 90000000000 ){
			date.setTime(timeStamp * 1000);
		}else{
			date.setTime(timeStamp );
		}
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if(returnType == 'str'){return y + '-' + m + '-' + d + ' '+ h +':' + minute + ':' + second;}
		return [y, m, d, h, minute, second];
	},
	// 字符串转时间戳
	toTimeStamp : function(timeStamp){
		var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
		var res = timeStamp.match(reg);
		if (res == null){
			var reg2 = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res2 = timeStamp.match(reg2);
			if(res2 == null){ console.log('时间格式错误 E001'); return false;}
			var year  = parseInt(res2[3]);
			var month = parseInt(res2[1]);
			var day   = parseInt(res2[2]);
			var h     = parseInt(res2[4]);
			var i     = parseInt(res2[5]);
			var s     = parseInt(res2[6]);
		}else{
			var year  = parseInt(res[1]);
			var month = parseInt(res[2]);
			var day   = parseInt(res[3]);
			var h     = parseInt(res[4]);
			var i     = parseInt(res[5]);
			var s     = parseInt(res[6]);
		}
		if (year < 1000) { console.log('时间格式错误'); return false; }
		if (h < 0 || h > 24) { console.log('时间格式错误'); return false; }
		if (i < 0 || i > 60) { console.log('时间格式错误'); return false; }
		if (s < 0 || s > 60) { console.log('时间格式错误'); return false; }
		return Date.parse(new Date(year, month - 1, day, h, i, s));
	},
	// 根据时间戳计算多少分钟/小时/天之前
	fromTime : function (time){
		if(time < 90000000000 ){time *= 1000;}
	    var timer = new Date().getTime() - time;
		timer = parseInt(timer / 1000);
	    if(timer < 180){
	        return '刚刚';
	    }else if(timer >= 180 && timer < 3600){
	        return parseInt(timer / 60) + '分钟前';
	    }else if(timer >= 3600 && timer < 86400){
	        return parseInt(timer / 3600) + '小时前';
	    }else if(timer >= 86400 && timer < 2592000){
	        return parseInt(timer / 86400) + '天前';
	    }else{
	        return this.toDate(time, 'str');
	    }
	},
	
	// 延迟操作
	delay:function (timer, func){
		return setTimeout(func, timer);
	},
	// 间隔指定时间循环某个函数
	interval:function (timer, func){
		return setInterval(func, timer);
	},
	
	// 对象操作
	assign : function (obj, key, val) {obj[key] = val;},
	removeByKey : function (obj, key) {delete obj[key];},
	each : function(obj, func){
		for(let k in obj){func(k, obj[k]);}
	},
	isEmptyObj : function(obj){return JSON.stringify(obj) === '{}';}
}