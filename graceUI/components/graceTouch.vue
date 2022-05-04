<template>
	<view @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @tap="tapmd">
		<slot></slot>
	</view>
</template>
<script>
export default{
	props:{
		datas:{type:Array, default:function(){return [];}}
	},
	data() {
		return {
			toucheTimer  : 0,
			fingerRes    : [],
			distance     : 0,
			isTap        : true
		}
	},
	methods:{
		toInt : function(arr){
			var res = [];
			arr.forEach((item)=>{
				item.pageX = parseInt(item.pageX);
				item.pageY = parseInt(item.pageY);
				res.push(item);
			});
			return res;
		},
		touchstart : function(e){
			this.isTap        = true;
			this.fingerRes    = this.toInt(e.changedTouches);
			if(this.fingerRes.length > 2){return ;}
			this.toucheTimer  = new Date().getTime();
			var moves = [], i = 0;
			this.fingerRes.forEach((finger)=>{
				var xTouch = finger.pageX;
				var yTouch = finger.pageY;
				moves.push([xTouch, yTouch]);
				i++;
			});
			this.$emit('thStart', moves, this.datas);
		},
		touchmove : function(e){
			setTimeout(()=>{this.isTap = false;}, 100);
			var touches = this.toInt(e.changedTouches);
			if(touches.length > 2){return ;}
			if(touches.length == 1){
				var i = 0, moves = [];
				touches.forEach((finger)=>{
					var xTouch = finger.pageX - this.fingerRes[i].pageX;
					var yTouch = finger.pageY - this.fingerRes[i].pageY;
					moves.push([xTouch, yTouch]);
					i++;
				});
				this.$emit('thMove', moves, this.datas);
			}
			else if(touches.length == 2){
				if(this.distance == 0){
					this.distance = parseInt(this.getDistance(touches[0].pageX,touches[0].pageY, touches[1].pageX, touches[1].pageY));
				}else{
					var distance1 = parseInt(this.getDistance(touches[0].pageX,touches[0].pageY, touches[1].pageX, touches[1].pageY));
					var scale = distance1 / this.distance;
					scale = Math.floor(scale * 100) / 100;
					this.$emit('scale', scale, this.datas);
				}
			}
		},
		touchend : function (e){
			if(this.isTap){this.$emit('tapme'); return ;}
			var touches   = this.toInt(e.changedTouches);
			this.distance = 0;
			if(touches.length == 1){
				var i = 0, moves = [];
				touches.forEach((finger)=>{
					var xTouch = finger.pageX - this.fingerRes[i].pageX;
					var yTouch = finger.pageY - this.fingerRes[i].pageY;
					moves.push([xTouch, yTouch]);
					i++;
				});
				var timer = new Date().getTime() - this.toucheTimer;
				moves.push(timer);
				this.$emit('thEnd', moves, this.datas);
				// 根据时间及距离决定滑动时间
				if(timer < 300){
					var mx = Math.abs(moves[0][0]);
					var my = Math.abs(moves[0][1]);
					if(mx > my){
						if(mx >= 50){
							if(moves[0][0] > 0){
								this.$emit('swipe', 'right', this.datas);
							}else{
								this.$emit('swipe', 'left', this.datas);
							}
						}
					}else{
						if(my >= 50){
							if(moves[0][1] > 0){
								this.$emit('swipe', 'down', this.datas);
							}else{
								this.$emit('swipe', 'up', this.datas);
							}
						}
					}
				}
			}
		},
		getDistance : function (lat1,  lng1,  lat2,  lng2){
			var radLat1  = lat1*Math.PI / 180.0;
			var radLat2  = lat2*Math.PI / 180.0;
			var a        = radLat1 - radLat2;
			var b        = lng1*Math.PI / 180.0 - lng2*Math.PI / 180.0;
			var s        = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
			s            = s * 6378.137;
			return Math.round(s * 10000) / 10000;
		},
		tapmd : function(){
			this.isTap = false;
		}
	}
}
</script>
<style scoped>
</style>