/*
link   : http://grace.hcoder.net
author : 刘海君 5213606@qq.com 
verson : grace.js 字符串处理工具
last update date : 2020-09-09
*/
module.exports = {
	
	// 字符串长度计算
	count : function(str, countSpace = true){
		if(countSpace){return str.length;}
		return this.removeAllSpace(str).length;
	},
	
	// 去除全部空格
	removeAllSpace : function(str){
		return str.replace(/\s+/g, "");
	},
	
	// 去除首尾空格
	trim : function(str){
	  return str.trim();
	},
	
	// 去除左侧空格
	trimL : function(str){
	  return str.replace(/^\s+/g, "");
	},
	
	// 去除右侧空格
	trimR : function(str){
	  return str.replace(/\s+$/g, "");
	},
	
	// 字符串搜索
	search : function (str, kwd, caseSensitive = true) {
		if(!caseSensitive){
			kwd = kwd.toLowerCase();
			str = str.toLowerCase();
		}
		return str.indexOf(kwd);
	},
	
	// 获取 扩展名
	getExtension : function (str) {
		str = str.split('.');
		return str.pop();
	}
}