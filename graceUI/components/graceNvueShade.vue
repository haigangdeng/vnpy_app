<template>
	<view class="grace-shade" ref="graceShade" 
	:style="{backgroundColor:background, left:left}" 
	@tap.stop="closeShade" @touchmove.stop.prevent="stopfun">
		<slot></slot>
	</view>
</template>
<script>
var animation = weex.requireModule('animation');
const dom = weex.requireModule('dom');
export default{
	props:{
		background : {type:String, default:"rgba(0, 0, 0, 0.1)"},
		zIndex : {type:Number, default:1},
		show : {type:Boolean, default:false}
	},
	data() {
		return {
			left : '-2000px'
		}
	},
	created:function(){
		if(this.show){ this.showIt(); }else{ this.hideIt();}
	},
	watch:{
		show:function(val){
			if(val){ this.showIt(); }else{ this.hideIt(); }
		}
	},
	methods:{
		stopfun : function () {
			
		},
		closeShade : function(){this.$emit('closeShade');},
		showIt : function(){
			this.left = '0px';
			var graceShade = this.$refs.graceShade;
			animation.transition(graceShade, {
				styles: {opacity:1},
				duration:280, 
				timingFunction: 'ease',
				needLayout:false,
				delay: 0 
			});
		},
		hideIt : function(){
			var graceShade = this.$refs.graceShade;
			animation.transition(graceShade, {
				styles: {opacity:0},
				duration:280, 
				timingFunction: 'ease',
				needLayout:false,
				delay: 0 
			});
			setTimeout(()=>{this.left = '-3000px';}, 280);
		}
	}
}
</script>
<style scoped>
.grace-shade{position:fixed; width:750rpx; left:-2000px; opacity:1; top:0; bottom:0; z-index:1; justify-content:center; align-items:center;}
</style>