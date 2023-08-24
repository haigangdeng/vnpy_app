<template name="gracePopupMenu">
	<view>
		<view class="grace-popup-mask" @tap.stop="hideMenu" @touchmove.stop.prevent="stopfun" 
		:style="{background:background, zIndex:zIndex, top:showIn?'0px':'-3000px'}"></view>
		<view class="grace-popup-menu" 
		:class="[showIn?'grace-shade-in':'grace-shade-out']"
		:style="{top:top+'px', width:menuWidth, zIndex:zIndex+1, height:showIn?'':'0rpx'}">
			<view :class="['grace-rows', 'arrow-d-'+arrowDirection]" v-if="isArrow">
				<view class="arrow-up" :style="{borderBottomColor:bgColor, margin:arrowMargin}"></view>
			</view>
			<view :style="{background:bgColor, width:menuWidth, borderRadius:borderRadius}"><slot></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "gracePopupMenu",
	props: {
		show:{
			type : Boolean,
			default : false
		},
		top:{
			type : Number,
			default : 0
		},
		bgColor:{
			type : String,
			default :'#FFFFFF'
		},
		menuWidth :{
			type : String,
			default : '258rpx'
		},
		background : {
			type : String,
			default : 'rgba(0,0,0, 0.3)'
		},
		borderRadius:{
			type : String,
			default:'0rpx'
		},
		zIndex : {type:Number, default:3},
		isArrow:{type:Boolean, default:true},
		arrowDirection:{type:String, default:"right"},
		arrowMargin:{type:String, default:"0 12rpx"}
	},
	data() {
		return {
			showIn : false
		}
	},
	created:function(){
		if(this.show){this.open();}else{this.hide();}
	},
	watch:{
		show : function(val,oval){
			this.showIn = val;
		}
	},
	methods: {
		stopfun:function(){},
		hideMenu : function() {
			this.$emit('hideMenu');
		},
		open : function(){
			this.showIn = true;
		},
		hide:function(){
			this.showIn = false;
		}
	}
}
</script>
<style scoped>
.grace-popup-menu{width:258rpx; padding:10rpx; right:0px; overflow:hidden; top:0px; position:absolute; z-index:3; opacity:0;}
.grace-popup-mask{background:rgba(0,0,0, 0.3); width:100%; height:100%; position:fixed; left:0; top:-3000px; z-index:4;}
.arrow-up{width:0; height:0; border-left:18rpx solid transparent; border-right:18rpx solid transparent; border-bottom:18rpx solid #FFFFFF;}
.arrow-d-right{justify-content:flex-end;}
.arrow-d-center{justify-content:center;}
.arrow-d-left{justify-content:flex-start;}
.grace-shade-in{animation:grace-shade-in-a 150ms ease-in forwards;}
@keyframes grace-shade-in-a{0%{transform: scale(0.1); opacity:0;} 100%{transform: scale(1); opacity:1;}}
.grace-shade-out{animation:grace-shade-out-a 150ms ease-out forwards;}
@keyframes grace-shade-out-a{0%{opacity:1; height:'';} 100%{ opacity:0; height:0;}}
</style>