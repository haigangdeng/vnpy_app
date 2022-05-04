<template>
	<view>
		<view class="grace-reload" ref="guiReload" :style="{backgroundColor:reloadBgColor[reloadStatus], width:width, marginLeft:marginLeft}">
			<text class="grace-reload-icon grace-icons" v-if="reloadStatus == 0" :style="{color:reloadColor[reloadStatus]}">&#xe633;</text>
			<view ref="loadingIcon" v-if="reloadStatus == 1"><text class="grace-reload-icon grace-icons" :style="{color:reloadColor[reloadStatus]}">&#xe9db;</text></view>
			<text class="grace-reload-icon grace-icons" v-if="reloadStatus == 2" :style="{color:reloadColor[reloadStatus]}">&#xe7f8;</text>
			<text class="grace-reload-text" :style="{color:reloadColor[reloadStatus]}">{{reloadTxt[reloadStatus]}}</text>
		</view>
	</view>
</template>
<script>
var animation = null;
export default{
	props:{
		reloadTxt    : {
			type : Array,
			default : function(){
				return ['松开手指开始刷新', '数据刷新中', '数据已经刷新']
			}
		},
		reloadBgColor : {
			type : Array,
			default : function(){
				return ['', '', '#63D2BC']
			}
		},
		reloadColor : {
			type : Array,
			default : function(){
				return ['#999999', '#63D2BC', '#FFFFFF']
			}
		},
		width : {
			type : String,
			default:'750rpx'
		},
		marginLeft : {
			type : String,
			default:'0rpx'
		}
	},
	data() {
		return {
			reloadStatus : 5,
			height : 0,
			startY : 0,
			startTime : 0,
			el:null
		}
	},
	watch:{
		reloadStatus : function (nval, oval) {
			if(nval == 1){
				setTimeout(()=>{this.rotate360();}, 300);
			}else if(nval == 0){
				var el = this.$refs.guiReload;
				animation = weex.requireModule('animation');
				animation.transition(el, {
					styles: {height:'50px', opacity:1},
					duration: 200,
					timingFunction: 'ease-in',
					needLayout:true,
					delay: 0
				});
			}else if(nval == 2){
				var el = this.$refs.guiReload;
				animation = weex.requireModule('animation');
				animation.transition(el, {
					styles: {height:'0', opacity:0},
					duration: 200,
					timingFunction: 'ease-in',
					needLayout:true,
					delay: 500
				});
			}
		}
	},
	methods:{
		/*
		刷新状态 : 
		5 无状态可以 进行下拉
		0 继续下拉刷新
		1 刷新中
		2 刷新结束
		3 不确认状态但下拉动作已经在执行
		*/
		touchstart:function (e) {
			// 如果滚动条位置不在最顶部禁止刷新
			if(e.scrollTop > 0){return ;}
			if(this.reloadStatus != 5){return ;}
			// 开始准备下拉
			this.reloadStatus = 3;
			this.startY = e.moveY;
			this.startTime = new Date().getTime();
		},
		touchmove:function (e) {
			if(this.reloadStatus == 3){
				// 检查时间是否够长
				var timer = new Date().getTime() - this.startTime;
				if(timer < 200){return ;}
				var moveY = e.moveY - this.startY;
				if(moveY > 100){
					this.reloadStatus = 0;
					this.height       = 100;
				}
			}
		},
		touchend:function (e) {
			switch(this.reloadStatus){
				case 0 :
					this.reloadStatus = 1; this.$emit('reload');
				break;
				case 1 :
				break;
				case 2 :
				break;
				case 3 :
					this.reloadStatus = 5;
				break;
			}
		},
		endReload : function(){
			this.reloadStatus = 2;
			setTimeout(()=>{
				this.height = 0;
				this.reloadStatus = 5;
			},1000)
		},
		rotate360 : function(){
			this.el = this.$refs.loadingIcon;
			animation = weex.requireModule('animation');
			animation.transition(this.el, {
				styles: {transform: 'rotate(7200deg)'},
				duration: 20000,
				timingFunction: 'linear',
				needLayout:false,
				delay: 0
				}
			);
		},
		stopReload : function () {
			this.height = 0;
			this.reloadStatus = 5;
		}
	}
}
</script>
<style scoped>
.grace-reload{width:750rpx; height:0px; overflow:hidden; flex-direction:row; justify-content:center; align-items:center; opacity:0;}
.grace-reload-icon{width:50rpx; height:50rpx; text-align:center; line-height:50rpx; font-size:44rpx;}
.grace-reload-text{margin-left:16rpx; line-height:50rpx; font-size:26rpx;}
.grace-reload-shade{position:fixed; width:750rpx; flex:1; left:0; top:0; bottom:0; background-color:rgba(255, 255, 255, 0); justify-content:center; align-items:center;}
</style>