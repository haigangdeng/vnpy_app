/*
graceUI-JS - 时间转换函数工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！

*/

module.exports = {
	
	// 获取当前时间
	currentTime : function (returnType, addVal) {
		var dateObj = new Date();
		var cTime = dateObj.getTime();
		if(addVal){cTime += addVal;}
		if(!returnType){return cTime;}
		return this.formatDateTime(cTime / 1000, 'str');
	},
	
	// 时间戳转 YY-mm-dd HH:ii:ss
	formatDateTime : function(timeStamp, returnType){
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
	
	// 日期转时间戳
	dateTimeToTimeStamp : function(timeStamp){
		var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
		var res = timeStamp.match(reg);
		if (res == null){
			var reg2 = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res2 = timeStamp.match(reg2);
			if(res2 == null){
				console.log('时间格式错误 E001');
				return false;
			}else{
				var year  = parseInt(res2[3]);
				var month = parseInt(res2[1]);
				var day   = parseInt(res2[2]);
				var h     = parseInt(res2[4]);
				var i     = parseInt(res2[5]);
				var s     = parseInt(res2[6]);
			}
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
		return Date.parse(new Date(year, month - 1, day, h, i, s)) / 1000;
	},
	
	// 过去时间计算
	fromTimer : function (time){
	    var timer =  (new Date()).getTime() - (time * 1000);
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
	        return this.formatDateTime(time, 'str');
	    }
	}
}