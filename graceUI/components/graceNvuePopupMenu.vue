<template name="gracePopupMenu">
	<view  class="grace-popup-mask" v-if="showIn" @tap.stop="hideMenu" @touchmove.stop.prevent="stopfun"
	:style="{backgroundColor:background}">
		<view class="grace-popup-menu" 
		:style="{top:top+'px', right:right, backgroundColor:bgColor, width:menuWidth, borderRadius:borderRadius}">
			<slot></slot>
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
		right:{
			type : String,
			default:'0rpx'
		},
		borderRadius:{
			type : String,
			default:'0rpx'
		}
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
		stopfun : function () {},
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
.grace-popup-menu{background-color:#FFFFFF; width:258rpx; padding:10rpx; right:0px; top:0px; position:absolute;}
.grace-popup-mask{background-color:rgba(0,0,0, 0.3); width:750rpx; position:fixed; left:0; top:0; bottom:0;}
</style>