<template>
	<view class="">
		<view class="grace-btdialog-shade" 
		@tap.self="closeDialog" @touchmove.stop.prevent="stopFun" 
		:style="{backgroundColor:background, left:showIn?'0':'-2000px'}"></view>
		<view class="grace-btdialog-shade-dialog" @tap.stop.prevent="stopFun" v-if="showIn" 
		:style="{borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius,width:width,left:showIn?'0':'-2000px'}">
			<view class="title"><slot name="btns"></slot></view>
			<view class="content" @tap.stop.prevent="stopFun">
				<slot name="content"></slot>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		width:{type:String,default:'750rpx'},
		left          : { type : String , default : '0rpx'},
		show          : { type : Boolean, default : false },
		background    : { type : String , default : 'rgba(0, 0, 0, 0.5)' },
		borderRadius  : { type : String , default : '0rpx' }
	},
	data() {
		return { showIn : false }
	},
	created:function(){
		this.showIn = this.show;
	},
	watch:{
		show:function(val){
			if(val){this.open();}else{this.hide();}
		}
	},
	methods:{
		closeDialog : function(){
			this.$emit('closeDialog');
		},
		stopFun : function(){},
		open:function(){this.showIn = true;},
		hide:function(){this.showIn = false;}
	}
}
</script>
<style scoped>
.grace-btdialog-shade{position:fixed; width:750rpx; left:0; top:0; bottom:0; background-color:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade-dialog{position:fixed; width:750rpx; background-color:#FFFFFF; bottom:0; left:0;}
.grace-btdialog-shade-title{flex-direction:row; flex-wrap:nowrap; justify-content:space-between;}
.grace-btdialog-shade-content{}
</style>