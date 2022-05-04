/*
graceUI-IM - IM 即时通讯工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海

版权声明 : 
GraceUI 的版权约束是不能转售或者将 GraceUI 直接发布到公开渠道！
侵权必究，请遵守版权约定！

*/

module.exports = {
	
	// 接收消息
	receiveMsg : function(res, _self){
		console.log(res);
		var msg = JSON.parse(res.data);
		// 注册消息
		if(msg.type == "regback"){
			try{
				uni.setStorageSync('imToken', msg.token);
			}catch(e){}
		}
		// 对话消息
		else if(msg.type == "msg"){
			_self.msgs.push(msg);
			// 滚动条处理
			setTimeout(function (){_self.graceIMScTOP = 99000 + Math.random();}, 1000);
		}
	},
	
	// 注册用户 
	register : function(user, group, grouptype){
		try {
			var imToken = uni.getStorageSync('imToken');
			if(imToken == ''){
				setTimeout(function(){_self.register(user, group, grouptype);}, 1000);
				return ;
			}
		} catch (e){}
		
		// 先发消息进行用户注册
		var _self     = this;
		var msg       = user;
		console.log(msg);
		msg.type      = 'reg'; // 消息类型 [reg : 注册用户及绑定分组、 msg : 普通消息]
		msg.group     = group; // 分组
		msg.grouptype = grouptype; // 分组类型 [group : 群聊、 private : 私聊]
		msg.token     = imToken;
		uni.sendSocketMessage({
			data : JSON.stringify(msg),
			// 如果注册失败等待im服务连接成功继续注册
			fail:function(e){
				setTimeout(function(){_self.register(user, group, grouptype);}, 1000);
			}
		});
	},
	
	// 发送消息
	sendMsg : function(user, msgType, content){
		try {var imToken = uni.getStorageSync('imToken');} catch (e) {}
		var msg         = user;
		msg.type        = 'msg';
		msg.contentType = msgType;
		msg.content     = content;
		msg.token       = imToken;
		uni.sendSocketMessage({data : JSON.stringify(msg)});
	}
}