<template name="graceCountDown">
	<view class="grace-countdown" v-if="show">
		<view class="grace-countdown-numbers" :style="{borderColor:borderColor, width:width, height:width, fontSize:fontSize, lineHeight:width, color:fontColor, background:bgrColor}" v-if="d > 0">{{d}}</view>
		<view class="grace-countdown-splitor" :style="{color:splitorColor, lineHeight:width, fontSize:fontSize}" v-if="d > 0">{{splitorText[0]}}</view>
		<view class="grace-countdown-numbers" :style="{borderColor:borderColor, width:width, height:width, fontSize:fontSize, lineHeight:width, color:fontColor, background:bgrColor}" v-if="(h != '00' || zeroShow)">{{h}}</view>
		<view class="grace-countdown-splitor" :style="{color:splitorColor, lineHeight:width, fontSize:fontSize}" v-if="(h != '00' || zeroShow)">{{splitorText[1]}}</view>
		<view class="grace-countdown-numbers" :style="{borderColor:borderColor, width:width, height:width, fontSize:fontSize, lineHeight:width, color:fontColor, background:bgrColor}">{{i}}</view>
		<view class="grace-countdown-splitor" :style="{color:splitorColor, lineHeight:width, fontSize:fontSize}">{{splitorText[2]}}</view>
		<view class="grace-countdown-numbers" :style="{borderColor:borderColor, width:width, height:width, fontSize:fontSize, lineHeight:width, color:fontColor, background:bgrColor}">{{s}}</view>
		<view class="grace-countdown-splitor" :style="{color:splitorColor, lineHeight:width, fontSize:fontSize}">{{splitorText[3]}}</view>
	</view>
</template>
<script>
export default {
	name: "graceCountDown",
	props: {
		bgrColor: {
			type: String,
			default: "#FFFFFF"
		},
		borderColor:{
			type:String,
			default : "#000000"
		},
		fontColor: {
			type: String,
			default: "#000000"
		},
		fontSize: {
			type: String,
			default: "22rpx"
		},
		splitorColor: {
			type: String,
			default: "#000000"
		},
		timer:{
			type:String,
			default:""
		},
		width : {
			type:String,
			default:"40rpx"
		},
		splitorText : {
			type : Array,
			default : function () {
				return [':', ':', ':', '']
			}
		},
		show:{type:Boolean, default:true},
		zeroShow:{type:Boolean, default:true}
	},
	data() {
		return {
			d        : 0,
			h        : "",
			i        : "",
			s        : "",
			leftTime : 0,
			outTimer : null,
			timerIn  : '',
			leftTimeNum : 0
		}
	},
	created:function(){
		this.timerIn = this.timer;
		this.runbase();
	},
	methods: {
		runbase : function(){
			var reg = /^([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
			var res = this.timerIn.match(reg);
			if (res == null){this.outTimer = setTimeout(() => { this.runbase(); }, 1000); return false; }
			var year = parseInt(res[1]);
			if (year < 1000) { return false; }
			var month = parseInt(res[2]);
			var day = parseInt(res[3]);
			var h = parseInt(res[4]);
			if (h < 0 || h > 24) { return false; }
			var i = parseInt(res[5]);
			if (i < 0 || i > 60) { return false; }
			var s = parseInt(res[6]);
			if (s < 0 || s > 60) { return false; }
			var leftTime = new Date(year, month - 1, day, h, i, s);
			this.leftTime = leftTime;
			clearTimeout(this.outTimer);
			this.countDown();
		},
		countDown: function (){
			var leftTime = this.leftTime - new Date();
			this.leftTimeNum = leftTime;
			if (leftTime > 0) {
				var day     = parseInt(leftTime / (1000 * 60 * 60 * 24));
				var hours   = parseInt((leftTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				var minutes = parseInt((leftTime % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = parseInt((leftTime % (1000 * 60)) / 1000);
				if (hours   < 10) { hours = '0' + hours;}
				if (minutes < 10) { minutes = '0' + minutes; }
				if (seconds < 10) { seconds = '0' + seconds; }
				this.h = hours; this.i = minutes; this.s = seconds; this.d = day;
				this.outTimer = setTimeout(()=>{this.countDown();}, 1000);
			}else{
				clearTimeout(this.outTimer);
				this.h = '00'; this.i = '00'; this.s = '00'; this.d = 0;
				this.$emit('endDo');
			}
		},
		reSetTimer : function(timer){
			clearTimeout(this.outTimer);
			this.timerIn = timer;
			this.runbase();
		},
		getTimeRemaining : function(){
			if(this.leftTimeNum < 0){return 0;}
			return parseInt(this.leftTimeNum / 1000);
		}
	}
}
</script>
<style scoped>
.grace-countdown{display:flex; flex-wrap:nowrap; justify-content:center;}
.grace-countdown-splitor{justify-content:center; padding:0 5rpx;}
.grace-countdown-numbers{border-radius:8rpx; margin:0 5rpx; text-align:center; border:1px solid #000000; font-size:22rpx;}
</style>