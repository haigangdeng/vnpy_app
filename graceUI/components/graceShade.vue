<template>
	<view class="grace-shade" 
	:style="{zIndex:zIndex, background:background, height:shadeShow?'100%':'0px'}" 
	@tap.stop="closeShade" @touchmove.stop.prevent="stopfun">
		<view :class="[showInReal ? 'grace-shade-in' : 'grace-shade-out']"><slot></slot></view>
	</view>
</template>
<script>
export default{
	props:{
		background : {type:String, default:"rgba(0, 0, 0, 0.1)"},
		zIndex : {type:Number, default:1},
		show : {type:Boolean, default:false}
	},
	data() {
		return {
			shadeShow : false,
			showInReal : false
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
		stopfun : function(){},
		closeShade : function(){
			this.$emit('closeShade');
		},
		showIt : function(){
			this.shadeShow = true;
			setTimeout(()=>{
				this.showInReal = true;
			}, 50);
		},
		hideIt : function(){
			this.showInReal = false;
			setTimeout(()=>{
				this.shadeShow = false;
			}, 150);
		}
	}
}
</script>
<style scoped>
.grace-shade{position:fixed; width:100%; height:100%; left:0; top:0; bottom:0; overflow:hidden; display:flex; justify-content:center; align-items:center;}
.grace-shade-in{animation:grace-shade-in-a 150ms ease-in forwards;}
@keyframes grace-shade-in-a{0%{transform: scale(0.1); opacity:0;} 100%{transform: scale(1); opacity:1;}}
.grace-shade-out{animation:grace-shade-out-a 150ms ease-out forwards;}
@keyframes grace-shade-out-a{0%{transform: scale(1); opacity:1;} 100%{transform: scale(0.1); opacity:0;}}
</style>