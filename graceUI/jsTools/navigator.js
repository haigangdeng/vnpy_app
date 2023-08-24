module.exports = {
	
	navigateTo : function(obj){
		this.setParameters(obj.url);
		uni.navigateTo(obj);
	},
	
	redirectTo : function(obj){
		this.setParameters(obj.url);
		uni.redirectTo(obj);
	},
	
	reLaunch : function(obj){
		this.setParameters(obj.url);
		uni.reLaunch(obj);
	},
	
	switchTab : function(obj){
		uni.switchTab(obj);
	},
	
	navigateBack : function(){
		uni.switchTab(navigateBack);
	},
	
	setParameters : function(url){
		var urls = url.split('?');
		if(urls.length < 2){return false;}
		var parameters = {};
		urls = urls[1];
		urls = urls.split('&');
		for(let i = 0; i < urls.length; i++){
			var arr = urls[i].split('=');
			parameters[arr[0]] = arr[1];
		}
		try{
			uni.setStorageSync('graceUIPageParameters', JSON.stringify(parameters));
		}catch(e){
			//TODO handle the exception
		}
	},
	
	getParameters : function(){
		try{
			return JSON.parse(uni.getStorageSync('graceUIPageParameters'));
		}catch(e){
			return null;
		}
	}
}