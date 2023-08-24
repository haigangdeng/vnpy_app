<template>
	<view v-if="showIn">
		<view class="grace-drawer-shade" @click.stop="closeDrawer" @touchmove.stop.prevent="stopFun" 
		:style="{backgroundColor:background}"></view>
		<list ref="graceDrawerMenu" :show-scrollbar="false" 
		class="grace-drawer-nav" @tap.stop="stopFun" v-if="direction == 'left'"
		:style="{width:width+'rpx', left:(width*-1)+'rpx', top:top+'px', backgroundColor:slotBg}">
			<cell class="grace-drawer-main"><slot name="links"></slot></cell>
		</list>
		<list ref="graceDrawerMenu" class="grace-drawer-nav" @tap.stop="stopFun" v-if="direction == 'right'"
		:style="{width:width+'rpx', top:top+'px', right:(width*-1)+'rpx', backgroundColor:slotBg}">
			<cell class="grace-drawer-main"><slot name="links"></slot></cell>
		</list>
	</view>
</template>
<script>
export default {
	name: "graceDrawer",
	props: {
		width : {
			type : Number,
			default : 500
		},
		show : {
			type : Boolean,
			default : false
		},
		direction : {
			type : String,
			default : 'left'
		},
		background:{
			type : String,
			default : 'rgba(0, 0, 0, 0.5)'
		},
		slotBg:{
			type : String,
			default : 'rgba(255, 255, 255, 1)'
		},
		padding : {
			type : String,
			default : '30rpx'
		},
		top:{type:Number, default:0}
	},
	data() {
		return {
			showIn: false
		}
	},
	created:function(){
		this.showIn = this.show;
	},
	updated:function(){
		if(this.showIn){
			setTimeout(()=>{
				var moveX = this.direction == 'left' ? uni.upx2px(this.width) + 'px' : (uni.upx2px(this.width) * -1) + 'px';
				var animation = weex.requireModule('animation');
				animation.transition(this.$refs.graceDrawerMenu, {
					styles: {transform:'translate('+moveX+', 0)'},
					duration:200, 
					timingFunction: 'linear',
					needLayout:false,
					delay: 0 
					}, function (){}
				);
			}, 100);
		}
	},
	methods:{
		closeDrawer : function(){this.$emit('closeDrawer');},
		open:function(){this.showIn = true;},
		hide:function(){this.showIn = false;},
		stopFun : function(){}
	}
}
</script>
<style scoped>
.grace-drawer-shade{position:fixed; width:750rpx; bottom:0; top:0; left:0; background-color:rgba(0, 0, 0, 0.5);}
.grace-drawer-nav{background-color:#FFFFFF; position:fixed; bottom:0; top:0;}
.grace-drawer-main{}
</style>