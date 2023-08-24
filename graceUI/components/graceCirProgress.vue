<template name="graceCirProgress">
	<view :style="{width:width+'px', height:width+'px'}">
		<slot></slot>
	</view>
</template>
<script>
export default {
	name: "graceCirProgress",
	props: {
		canvasId:{
			type:String, 
			default:'',
		},
		width : {
			type : Number,
			default : 200
		},
		lineWidth: {
			type: Number,
			default: 10
		},
		bgColor:{
			type : String,
			default : "#F1F1F1"
		},
		progressColor:{
			type: String,
			default: "#00C777"
		},
		fontColor: {
			type: String,
			default: "#00C777"
		},
		value : {
			type : Number,
			default : 0
		},
		fontSize : {
			type: Number,
			default: 30
		},
		speed : {
			type : Number,
			default : 20
		}
	},
	data() {
		return {
			ctx : null,
			sets : {},
			oldVal : 0,
			canvas : {}
		}
	},
	created:function(){
		var _self		 = this; 
		var sets		 = {};
		sets.center		 = this.width / 2; // 圆心
		sets.lineWidth   = this.lineWidth; // 外层圆环宽
		sets.r = (this.width / 2) - (sets.lineWidth / 2); // 背景半径 = 外层
		sets.lineWidth2  = sets.lineWidth - 2; // 内层圆环宽
		this.sets        = sets;
		// 创建画布
		this.ctx =  uni.createCanvasContext(this.canvasId);
		this.drawAnimate(this.value);
	},
	watch:{
		value(val, val2){
			this.drawAnimate(val);
		}
	},
	methods: {
		drawAnimate: function (num){
			var _self = this;
			var step = 0;
			if (_self.oldVal > num) {
				for (var i = _self.oldVal; i >= num; i--) {
					(function(i){setTimeout(function(){_self.draw(i);}, step);})(i);
					step += _self.speed;
				}
			} else {
				for (var i = _self.oldVal; i <= num; i++) {
					(function(i){setTimeout(function(){_self.draw(i);}, step);})(i);
					step += _self.speed;
				}
			}
			_self.oldVal = num;
		},
		draw : function (num){
			if (num < 0) { num = 0;}
			if(num > 100){num = 100;}
			// 背景圆
			this.ctx.setLineWidth(this.sets.lineWidth);
			this.ctx.setStrokeStyle(this.bgColor);
			this.ctx.setLineCap('round');
			this.ctx.beginPath();
			this.ctx.arc(this.sets.center, this.sets.center, this.sets.r, 0, 2 * Math.PI, false);
			this.ctx.stroke();

			// 进度圆
			this.ctx.setLineWidth(this.sets.lineWidth2);
			this.ctx.setStrokeStyle(this.progressColor);
			this.ctx.setLineCap('round')
			this.ctx.beginPath();//开始一个新的路径
			num = (num / 100);
			this.ctx.arc(this.sets.center, this.sets.center, this.sets.r, 0 * Math.PI, num * 2 * Math.PI, false);
			this.ctx.stroke();

			// 文字
			this.ctx.setFillStyle(this.fontColor);
			this.ctx.setFontSize(this.fontSize);
			this.ctx.setTextAlign("center");
			this.ctx.setTextBaseline('middle');
			this.ctx.fillText(Math.round(num * 100) + "%", this.sets.center, this.sets.center);
			
			this.ctx.draw();
		}
	}
}
</script>
<style scoped>
</style>