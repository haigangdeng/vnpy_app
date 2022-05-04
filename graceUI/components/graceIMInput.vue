<template name="graceIMMsg">
	<view>
		<view class="grace-im-footer" :style="{paddingBottom:paddingB}">
			<view class="grace-im-menus graceIMFonts icon-voice" 
				v-if="voiceBtnShow" 
				@tap="showRec"></view>
			<view class="grace-im-menus graceIMFonts icon-photograph" @tap="chooseImg"></view>
			<view class="grace-im-input">
				<input type="text" v-model="inputMsg" @confirm="sendTextMsg" />
			</view>
			<view class="grace-items" style="padding:0 8px; margin-right:6px;" @tap="sendTextMsg">发送</view>
		</view>
		<!-- 语音输入 -->
		<view class="grace-im-record" v-if="recShow">
			<view class="grace-im-record-txt">
				{{recTxt}}<text v-if="recing">已录音 : {{recLength}} s</text>
			</view>
			<view class="grace-im-record-btn"  @tap="rec" :class="[recing ? 'grace-im-recording' : '']"></view>
			<view class="grace-im-send-voice" v-if="tmpVoice != ''">
				<text @tap="playVoice">{{playTxt}}</text>| <text @tap="sendVoiceMsg">发送语音</text>
			</view>
			<view class="grace-im-record-close graceIMFonts icon-close" @tap="closeRec" v-if="!recing"></view>
		</view>
	</view>
</template>
<script>
var bgAudioMannager = {};
export default {
	name: "graceIMMsg",
	props: {
		user : {
			type : Object,
			default : function(){return {};}
		},
		token : {
			type : String,
			default : ""
		},
		config :{
			type : Object,
			default : function(){return {};}
		}
	},
	data() {
		return {
			paddingB        : '0',
			uploading       : false,
			recShow         : false,
			recTxt          : "请点击绿色按钮开始录音",
			inputMsg        : "",
			recorderManager : null,
			recing          : false,
			recLength       : 1,
			recTimer        : null,
			tmpVoice        : '',
			voiceLen        : 0,
			voiceBtnShow    : false,
			// 播放相关
			player          : null,
			playTxt         : "试听语音"
		}
	},
	created : function(){
		var _self = this;
		// #ifndef H5
		this.voiceBtnShow = true;
		this.recorderManager = uni.getRecorderManager();
		this.recorderManager.onStop((res) => {
			_self.tmpVoice     = res.tempFilePath;
			this.recing = false;
			this.recTxt   =  "... 已录音 "+this.recLength+"s, 点击绿色按钮重新录音 ...";
			clearInterval(this.recTimer);
		});
		this.recorderManager.onError(function () {
			uni.showToast({ title: '录音失败', icon: 'none' });
			_self.recing = false;
			_self.recTxt   = "请点击绿色按钮开始录音",
			clearInterval(_self.recTimer);
		});
		// #endif
		// #ifdef MP
		try {
		    var res = uni.getSystemInfoSync();
			res.model = res.model.replace(' ', '');
			res.model = res.model.toLowerCase();
			if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
				this.paddingB = uni.upx2px(50)+'px';
			}
		} catch (e){return null;}
		// #endif
	},
	methods:{
		// 录音
		rec : function(){
			if (this.recing){
				this.recorderManager.stop();
				this.recing = false;
				this.recTxt   =  "... 已录音 "+this.recLength+"s, 点击绿色按钮重新录音 ...";
				clearInterval(this.recTimer);
			} else {
				this.recorderManager.start({duration:60000, format:'mp3' });
				this.recing     = true;
				this.recTxt     =  "... 正在录音 ...";
				this.recLength  = 1;
				this.recTimer   = setInterval(function(){this.recLength++;}.bind(this), 1000);
			}
		},
		// 播放录音
		playVoice : function(){
			var _self = this;
			if(this.playTxt == '正在播放'){
				this.playTxt = '试听语音';
				bgAudioMannager.stop();
				return ;
			}
			bgAudioMannager = uni.getBackgroundAudioManager();
			this.playTxt      = '正在播放';
			bgAudioMannager.src   = this.tmpVoice;
			bgAudioMannager.onEnded(function(){
				_self.playTxt = "试听语音";
			});
			bgAudioMannager.onStop(function(){
				_self.playTxt = "试听语音";
			});
			
		},
		// 发送录音
		sendVoiceMsg : function(){
			var _self = this;
			if (_self.tmpVoice == '') {
				uni.showToast({ title: "请先录制一段语音", icon: "none" });
				return;
			}
			// 关闭界面
			this.recShow = false;
			uni.showLoading({ title:"正在发送" });
			const uploadTask = uni.uploadFile({
				url      : _self.config.serverUrl+'?c=uploadFile&token='+_self.token,
				filePath : _self.tmpVoice,
				name     : 'gChatUploadFile',
				success   : function (uploadFileRes) {
					var res = JSON.parse(uploadFileRes.data);
					if(res.status == 'ok'){
						var msg         = _self.user;
						msg.type        = 'msg';
						msg.contentType = 'voice';
						msg.content     = res.msg;
						msg.length      = _self.recLength;
						uni.sendSocketMessage({
							data : JSON.stringify(msg),
							complete:function(){
								setTimeout(function(){
									_self.uploading = false;
									uni.hideLoading();
									_self.tmpVoice = '';
								}, 500);
							},
							fail:function(e){
								_self.uploading = false;
								console.log('消息发送失败');
							}
						});
					}else{
						setTimeout(function(){uni.hideLoading();}, 1000);
					}
					
				},
				fail:function(e){
					_self.uploading = false;
					console.log(e);
				}
			});
		},
		// 展示录音界面
		showRec : function(){this.recShow = true;},
		// 关闭录音界面
		closeRec: function (){this.recShow = false;},
		// 发送文本消息
		sendTextMsg: function () {
			if (this.inputMsg < 1) {return false;}
			var msg         = this.user;
			msg.type        = 'msg';
			msg.contentType = 'txt';
			msg.content     = this.inputMsg;
			msg.token       = this.token;
			console.log(msg,33);
			uni.sendSocketMessage({
				data : JSON.stringify(msg),
				fail:function(e){console.log('消息发送失败 ...');}
			});
			this.inputMsg = '';
		},
		// 选择图片
		chooseImg : function(){
			if(this.uploading){ return false;}
			var _self = this;
			uni.showLoading({title:"选择图片"});
			this.uploading = true;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				sourceType: ['album', 'camera'],
				success : function(res){
					uni.showLoading({title:"图片发送中"});
					const tempFilePaths = res.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url      : _self.config.serverUrl+'?c=uploadFile&token='+_self.token,
						filePath : tempFilePaths[0],
						name     : 'gChatUploadFile',
						success   : function (uploadFileRes) {
							var res = JSON.parse(uploadFileRes.data);
							if(res.status == 'ok'){
								var msg         = _self.user;
								msg.type        = 'msg';
								msg.contentType = 'img';
								msg.content     = res.msg;
								uni.sendSocketMessage({
									data : JSON.stringify(msg),
									complete:function(){
										setTimeout(function(){
											_self.uploading = false;
											uni.hideLoading();
										}, 500);
									},
									fail:function(e){
										_self.uploading = false;
										console.log('消息发送失败');
									}
								});
							}else{
								setTimeout(function(){uni.hideLoading();}, 500);
							}
							
						},
						fail:function(e){
							_self.uploading = false;
							console.log(e);
						}
					});
				},
				fail:function(){uni.hideLoading();}
			});
		}
	}
}
</script>
<style scoped>
@font-face {font-family: "graceIMFonts"; src:url('data:font/truetype;charset=utf-8;base64,d09GMgABAAAAAASoAAsAAAAACpAAAARbAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqILIZ4ATYCJAMUCwwABCAFhG0HSxsHCcgOJQUABgUAAMBk8EB6fW8yk/3Z7Cd4BLPXQW6vA9B99wc4f67lvzL5jC8R2YVkAS+XAsN4QPB1pPqF+wfHUj8K/8Hyvu1BXjGyLDq25lGBDagb1ySRuNkEfcvRGr5iXEVcDQGYRBOJS2OXykbwRoFqQYpmTZc48HZYUBEkgaF3BBypENvQMbT12hNgq/b24g35wgANXYLX6jelSITc52EvKqRlDzJKWljFuYDbcSCBTAAFYkGgZxZuhipT05hBv+dOLYCJgYb2POx50vPyFxW2DZaiQzqT/8MDDYlCgHCAGk+KrY0reB4m8aDB8yQeJDwv50HBiwrZtGh0ur0JhAGiEhCdYIisoERHonui2lcmOM2zJHp7m6a+suXpoNZng9tfDG17vkyohugi+3dbns4wdwWyFuTaGyL2DH1o+v/RweMTg2Y6LqngIEk2qXNSr6zPX9naOrilZVBb25D29qFN+/Nh99riT7Z3vdsad6xlyKkr1tWNZ09eGz6kkbRWS7iliav7hBVp1hm64Q4O3rMhcFCzzBa4ywoa3MgWtHtjyNAmVUhYR3kdd6O7DasHDfpeN2jwb7vbQFjoV6Fa7o6VK9v0qChdVrZdRURhRbwW3rqlUHWLS5mMreMeM3nRSDO2TbYUy16uGosg002pTpZwphre5b7iZKa3S1VPqnNboCS+PE4Hmd9c9SJ2Lk+1zG3JjnAsPmH0XBpvDWJl+WX186e6zIWKSG6z0np0qthYRZSdTEQULL34fb9uJZ66RKiru0eP4K4lSXcWecR/xPf20/WbFi0Bz/8qJrcUz0VLHq9jd7SqyEjVyoWKSFZYZV4TL99QQihCuiGEghgP3sLyqYFyCAlv/7hDnEsCyWXFCOnjZkAVINnlhrLtTEJFJEusvRjRsGVZpxpGRH+psDBFlC1MRCRsj0k9bjZvPtcjYrOpiXamCVUROssu7hLWO2VNhdl5+yxFRU/Z8/pcBwNGkpu2yNAKAPaY/CNXAvak/CmXAfaM/CYXH8o/w6M7d+aODar8ZrgUAB2fJ5zRauxBhbTgeNSSWHrgShOOqa8crbp6d0qSt09n10Gh0T6LTOBwDfjzrxh7EEUmBAZBFmh4EAUSg0SkwmaCjotCcGBQAyYZlBzvIgCKG0I5gXTGAAS+nIKGN9dB4ssnUmH/QCeY/+DAV0gwGSICzugiWUw3GxZgjmER8V1IESyTCDvz1YvrsdSmc9Qu18jNmDqVIIrLznUnS7CJaRH7ONuleMYIItQyUDFcD+u6hWxqqVhg0TJjdnpMzpSgJ4oWLAN8aYCC4WBgRBA8XSAUBCxMiLIww9fz+vVgJNrQ4aARXT/8zWAoTpTVI+KIJjYBskRjJuralEon7UjEw2iEgCC3QgsDRDF1YXQes0DYwZupYAQY0cgZIjbpxNDJSFJNdPU6Yx5LT5ueeAZdaEIKJXThwGPGdM60RcRz0WJbUY1TF8sb8IrH8sVdigkAAA==') format('truetype');}
.graceIMFonts {font-family:"graceIMFonts" !important; font-size:15px; font-style:normal; color:#5E5E5E;}
.icon-voice:before{content: "\e63a";}
.icon-photograph:before {content:"\e619";}
.icon-close:before {content:"\e625";}
.icon-kbd{content:"\e73b";}

.grace-im-footer{display:flex; background:#FFFFFF; width:100%; position:fixed; left:0; bottom:0; height:50px; flex-wrap:nowrap; overflow:hidden; box-shadow:1px 1px 6px #888;}
.grace-im-footer .grace-items{width:auto; line-height:50px; flex-shrink:0;}
.grace-im-menus{width:44px; height:50px; flex-shrink:0; line-height:50px; text-align:center; font-size:28px;}
.grace-im-input{width:100%; margin:5px; padding:0 8px; background:#F4F5F6; border-radius:5px; height:40px; flex-wrap:nowrap; margin-left:10px;}
.grace-im-input input{width:100%; background:#F4F5F6; height:20px; margin:8px 0; line-height:20px; border-radius:5px;}

.grace-im-record{width:100%; position:fixed; left:0; bottom:0; background:#FFF; padding:30px 0; padding-bottom:50px; z-index:11; box-shadow:1px 1px 6px #888;}
.grace-im-record-close{width:50px; height:50px; position:absolute; top:0px; right:0px; z-index:100; text-align:center; line-height:50px; color:#ccc; font-size:20px;}
.grace-im-record-txt{text-align:center; line-height:30px; padding-bottom:10px; color:#ccc;}
.grace-im-record-btn{width:60px; height:60px; margin:0 auto; border:5px solid #F1F2F3; border-radius:100%; background:#00B26A;}
.grace-im-recording{background:#FF0000; animation:fade linear 2s infinite;}
@keyframes fade{from{opacity:0.1;} 50%{opacity:1;} to{opacity:0.1;}}
.grace-im-record-txt text{color:#00B26A; padding:0 12px;}

.grace-im-send-voice{margin-top:12px; color:#00BA62; text-align:center;}
.grace-im-send-voice text{margin:0 15px; color:#00BA62;}
</style>