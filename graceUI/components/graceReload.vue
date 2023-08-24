<template>
	<view class="">
		<view class="grace-reload" 
		:class="[reloadStatus == 0 ? 'gload-show' : '', reloadStatus == 2 ? 'gload-hide' : '']" 
		:style="{background:reloadBgColor[reloadStatus], height:height+'rpx', width:width, marginLeft:marginLeft}">
			<text class="grace-reload-icon icon-pulldown" v-if="reloadStatus == 0" :style="{color:reloadColor[reloadStatus]}"></text>
			<text class="grace-reload-icon icon-loading grace-rotate360" v-if="reloadStatus == 1" :style="{color:reloadColor[reloadStatus]}"></text>
			<text class="grace-reload-icon icon-ok" v-if="reloadStatus == 2" :style="{color:reloadColor[reloadStatus]}"></text>
			<text class="grace-reload-text" :style="{color:reloadColor[reloadStatus]}">{{reloadTxt[reloadStatus]}}</text>
		</view>
	</view>
</template>
<script>
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
			startTime : 0
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
				this.height       = 0;
				this.reloadStatus = 5;
			},1000);
		},
		stopReload : function () {
			this.height       = 0;
			this.reloadStatus = 5;
		}
	}
}
</script>
<style scoped>
.grace-reload{width:100%; height:0px; overflow:hidden; display:flex; flex-direction:row; justify-content:center; align-items:center;}
.grace-reload-icon{width:50rpx; height:50rpx; text-align:center; line-height:50rpx; display:block; font-family:"grace-iconfont"; font-size:44rpx;}
.icon-pulldown:before{content:"\e633";}
.icon-loading:before{content:"\e9db";}
.icon-ok:before{content:"\e7f8";}
.grace-reload-text{margin-left:16rpx; line-height:50rpx; font-size:26rpx;}
@keyframes gload-show{0%{opacity:0; height:0;} 100%{opacity:1; height:100rpx;}}
.gload-show{animation:gload-show 300ms linear;}
@keyframes gload-hide{0%{opacity:1; height:100rpx;} 65%{opacity:1; height:100rpx;} 100%{opacity:0; height:0rpx;}}
.gload-hide{animation:gload-hide 1000ms linear;}
@keyframes grace-rotate360{0%{transform:rotate(0deg);} 50%{transform:rotate(180deg);} 100%{transform:rotate(360deg);}}
.grace-rotate360{animation:grace-rotate360 1200ms infinite linear;}
.grace-reload-shade{position:fixed; width:100%; height:100%; left:0; top:0; bottom:0; z-index:9999; background:rgba(255, 255, 255, 0); display:flex; justify-content:center; align-items:center;}
</style>