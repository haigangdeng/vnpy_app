<template name="graceIMMsg">
	<view class='grace-im'>
		<block v-for="(item, index) in msgs" :key="index">
			<block v-if="item.group == group">
				<!-- 文本消息 -->
				<view class="grace-im-msg" 
				:class="[userid == item.uindex ? 'grace-im-msg-right' : 'grace-im-msg-left']" 
				v-if="item.contentType == 'txt'">
					<view class="face"><image :src="item.uface" mode="widthFix"></image></view>
					<view class="grace-im-content-in">
						<view class="grace-im-name">{{item.uname}}</view>
						<view><view class="content">{{item.content}}</view></view>
						<view class="timer"><text>{{item.date}}</text></view>
					</view>
				</view>
				<!-- 图片消息 -->
				<view class="grace-im-msg" 
				:class="[userid == item.uindex ? 'grace-im-msg-right' : 'grace-im-msg-left']" 
				v-if="item.contentType == 'img'">
					<view class="face"><image :src="item.uface" mode="widthFix"></image></view>
					<view class="grace-im-content-in">
						<view class="grace-im-name">{{item.uname}}</view>
						<view>
							<view class="content img">
								<image :src="item.content" :data-img="item.content" @tap="showImgs" mode="widthFix"></image>
							</view>
						</view>
						<view class="timer"><text>{{item.date}}</text></view>
					</view>
				</view>
				<!-- 语音消息 -->
				<view class="grace-im-msg" 
				:class="[userid == item.uindex ? 'grace-im-msg-right' : 'grace-im-msg-left']" 
				v-if="item.contentType == 'voice'">
					<view class="face"><image :src="item.uface" mode="widthFix"></image></view>
					<view class="grace-im-content-in">
						<view class="grace-im-name">{{item.uname}}</view>
						<view>
							<view :class="['content', 'grace-im-voice-msg', index == playIndex ? 'grace-im-playing' : '']" 
								:data-voice="item.content" 
								:data-index='index' @tap='playVoice' :style="{'min-width':'50px', 'width':(item.length*3)+'px'}">
								<text class="graceIMFont icon-audio"></text>{{item.length}}"
							</view>
						</view>
						<view class="timer"><text>{{item.date}}</text></view>
					</view>
				</view>
				<!-- 系统消息 -->
				<view class="grace-im-msg" v-if="item.ctype == 'system'">
					<view class="grace-im-system-msg">{{item.msg}}</view>
				</view>
				<view></view>
			</block>
		</block>
		<view style="height:100px;"></view>
	</view>
</template>
<script>
export default {
	name: "graceIMMsg",
	props: {
		msgs : {
			type : Array,
			default : function(){
				return []
			},
		},
		userid: {
			type: String,
			default:'',
		},
		scrollTop : {
			type: Number,
			default: 99999,
		},
		group :{
			type : String,
			default : ""
		}
	},
	data() {
		return {
			player : null,
			playIndex : -1
		}
	},
	created: function(){
		var _self = this;
		// #ifndef H5
		this.player = uni.createInnerAudioContext();
		this.player.onPlay(() => {console.log('play');});
		this.player.onEnded(function(){
			console.log('end');
			var cIndex     = _self.playIndex;
			if(cIndex < 0){return false;}
			_self.playIndex = -1;
			for (var i = cIndex + 1; i < _self.msgs.length; i++) {
				if (_self.msgs[i].contentType == 'voice') {
					_self.playNow(_self.msgs[i].content, i);
					break;
					return;
				}
			}
		});
		this.player.onError((E)=>{console.log(E);});
		// #endif
  },
  methods: {
		// 播放语音
		playVoice: function (e) {
			// #ifdef H5
			uni.showToast({title:"请使用 APP 或 小程序聆听语音", icon:"none"});
			return ;
			// #endif
			var voicelUrl = e.currentTarget.dataset.voice;
			var index = e.currentTarget.dataset.index;
			if (this.playIndex == -1){return this.playNow(voicelUrl, index);}
			if (this.playIndex == index) {
				if(this.player.paused){
					this.player.play();
				}else{
					this.player.pause();
				}
			} else {
				this.player.stop();
				this.playNow(voicelUrl, index);
			}
		},
		// 语音播放基础函数
		playNow: function (voicelUrl, index){
			this.playIndex = index;
			this.player.src = voicelUrl;
			//this.player.title = "graceUI";
			this.player.play();
			return true;
		},
		// 图片预览
		showImgs : function(e){
			var imgs        = [];
			var imgsCurrent = e.currentTarget.dataset.img;
			for (var i = 0; i < this.msgs.length; i++) {
				if (this.msgs[i].contentType == 'img') {
					imgs.push(this.msgs[i].content);
				}
			}
			uni.previewImage({urls : imgs, current : imgsCurrent});
		}
	}
}
</script>
<style scoped>
.grace-im{padding:0 10px;}
.grace-im-system-msg{background:#C1C1C1; width:auto; color:#FFF; font-size:12px; line-height:1.5em; padding:5px 10px; margin:0 auto; display:inline-block; border-radius:3px;}
.grace-im-msg{margin:15px 0; flex-wrap:nowrap; display:flex;}
.grace-im-msg .face{width:44px; height:44px; overflow:hidden; flex-shrink:0;}
.grace-im-msg .face image{width:44px; height:44px; border-radius:4px;}
.grace-im-name{line-height:15px; height:15px; font-size:11px; color:#3688FF; text-indent:10px;}
.grace-im-content-in{margin:0 5px; width:100%; overflow:hidden;}
.grace-im-content-in > view{width:100%; overflow:hidden;}
.grace-im-content-in .content{padding:8px 15px; margin-top:6px; background:#FFF; line-height:1.5em; border-radius:3px; word-break:break-all; display:inline-block; position:relative;}
.grace-im-content-in .content::after{content:""; position:absolute; height:10px; width:10px; background:#FFFFFF; top:12px; transform: translate(0,-50%) rotate(45deg); z-index:2;}
.grace-im-content-in .timer{margin-top:5px; line-height:15px;}
.grace-im-content-in .timer text{font-size:10px; margin-left:10px; color:#8788A3;}
.grace-im-msg-left .content{margin-left:10px;}
.grace-im-msg-left .content::after{left:-4px;}

.grace-im-msg-right .content{margin-right:10px;}
.grace-im-msg-right .content::after{right:-4px; background:#00B26A;}
.grace-im-msg-right{flex-direction:row-reverse;}
.grace-im-msg-right .grace-im-name{display:none;}
.grace-im-msg-right .content{float:right; background:#00B26A; color:#FFFFFF; margin-top:0;}
.grace-im-msg-right .timer{text-align:right;}
.grace-im-msg-right .timer text{text-align:right; margin-right:10px;}

.grace-im-content-in .img{padding:0 !important; font-size:0; background:#FFF;}
.grace-im-content-in .img::after{width:0 !important; height:0 !important;}
.grace-im-content-in .img image{width:400upx; border-radius:5px;}

.grace-im-voice-msg{font-size:10px; line-height:22px !important;}
.grace-im-voice-msg text{font-size:20px;}
.grace-im-playing{background:#007AFF !important; color:#FFF;}
.grace-im-playing text{color:#FFF;}
.grace-im-playing::after{background:#007AFF !important;}


@font-face {
	font-family: "graceIMFont"; 
	src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAARIAAsAAAAABpAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY+dknyY21hcAAAAYAAAABKAAABcOkou6pnbHlmAAABzAAAAJgAAACcsQjN8WhlYWQAAAJkAAAALwAAADYTkbRlaGhlYQAAApQAAAAcAAAAJAfeA4NobXR4AAACsAAAAAgAAAAICAAAAGxvY2EAAAK4AAAABgAAAAYATgAAbWF4cAAAAsAAAAAgAAAAIAEQADxuYW1lAAAC4AAAAUUAAAJtPlT+fXBvc3QAAAQoAAAAHgAAAC/RhmVweJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGBxeMLxgYG7438AQw9zA0AAUZgTJAQDdeQvneJztkLENgDAQA8/KQ4EYgSo1s1Cxf80WycfAFrF0lnz66oEFKMmZBOhGjFxpZV/Y7IPqmxj+obW/c4cbrczs7uNb/tUL6i3WCXEAAHicY2BhYPj/mVmKmZeBj0GaQZ1Bn4GBkY+RXdyO0URNH0jLMTIbKBmLmwmAOGIC7CKm4mYmYLaIOoShxHSL0dNNJyA4OIBZl8XN8xsTk25VFbMuc+ppXX9/Fh1muzpFReaQcFbGhuQtnroBpx+fBCpkdt/8b7FOA6N3HbMOS86/l2ysrLrBt8KAHOfljMqxyszBwQAGoSFheJxjYGRgYADih0telMfz23xl4GZhAIEblhYmCPr/ZxYGZl4gl4OBCSQKAC7VCZ8AeJxjYGRgYG7438AQw8IAAkCSkQEVMAEARwgCawQAAAAEAAAAAAAAAABOAAAAAQAAAAIAMAAEAAAAAAACAAAACgAKAAAA/wAAAAAAAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nGNgYoAALgbsgImRiZGZgTWxNCUzn4EBAAzjAi0AAA=='); /* iOS 4.1- */
}
.graceIMFont {font-family:"graceIMFont" !important; font-size:16px;}
.icon-audio:before {content:"\e800";}
</style>