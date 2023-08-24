<template>
	<view class="grace-btdialog-shade" 
	@tap.stop="closeDialog" @touchmove.stop.prevent="stopFun" 
	:style="{backgroundColor:background, zIndex:zIndex, top:realShow?'0rpx':'-3000px'}">
		<view :class="['dialog', isIpx && !isSwitchPage ? 'grace-ipx-bottom' : '', isOut ? 'gdOut' : 'gdIn']" 
		:style="{width:width,left:left,borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius}" 
		@tap.stop="stopFun">
			<view><slot name="btns"></slot></view>
			<view @tap.stop="stopFun"><slot name="content"></slot></view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		width:{type:String,default:'750rpx'},
		left:{type:String,default:'0rpx'},
		show : {type : Boolean,default : false},
		background:{type : String,default : 'rgba(0, 0, 0, 0.5)'},
		borderRadius : {type : String,default : '0rpx'},
		zIndex:{type : Number,default : 99},
		isSwitchPage:{type:Boolean, default:false}
	},
	data() {
		return {
			realShow:false,
			isIpx:false,
			isOut :true
		}
	},
	watch:{
		show : function (vn, vo) {
			if(vn){
				this.isOut = false;
				this.realShow = vn;
			}else{
				this.isOut = true;
				setTimeout(()=>{this.realShow = false;}, 120);
			}
		}
	},
	created : function(){
		this.realShow = this.show;
		// #ifndef APP-PLUS
		try {
		    var res = uni.getSystemInfoSync();
			res.model = res.model.replace(' ', '');
			res.model = res.model.toLowerCase();
			if(res.model.indexOf('iphonex') != -1 || res.model.indexOf('iphone11') != -1){
				this.isIpx = true;
			}
		} catch (e){return null;}
		// #endif
	},
	methods:{
		closeDialog : function(){this.$emit('closeDialog');},
		stopFun : function(){},
		open:function(){
			this.realShow = true;
			this.isOut = false;
		},
		hide:function(){
			this.isOut = true;
			setTimeout(()=>{this.realShow = false;}, 120);
		}
	}
}
</script>
<style scoped>
@keyframes gdIn{ from {bottom:-2000px; } 100% { bottom: var(--window-bottom); }}
.gdIn {animation:gdIn 200ms linear forwards;}
@keyframes gdOut{ from {bottom:0px;} 100% { bottom:-2000px; }}
.gdOut {animation:gdOut 200ms linear forwards;}
.grace-btdialog-shade{position:fixed; width:100%; height:100%; left:0; top:0; z-index:9; overflow:hidden; background:rgba(0, 0, 0, 0.5);}
.grace-btdialog-shade .dialog{width:100%; height:auto; background:#FFFFFF; position:fixed; bottom:-2000px; left:0;}
.grace-ipx-bottom{padding-bottom:50rpx !important;}
</style>