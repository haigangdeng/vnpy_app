<template>
	<view class="graceActionSheet" @tap.stop="closeByShade" @touchmove.stop.prevent="stopFun" 
	:style="{backgroundColor:background, zIndex:zIndex, width:realShow ? '750rpx' : '0rpx'}">
		<view :class="['graceActionSheetBody', isIpx && !isSwitchPage ? 'grace-ipx-bottom' : '', realShow?'grace-shade-in':'']" 
		:style="{
			width:realShow?width:'0rpx',left:left,
			borderTopLeftRadius:borderRadius,
			borderTopRightRadius:borderRadius,
			zIndex:zIndex+1}" 
		@tap.stop="stopFun">
			<view class="graceActionSheetTitle" :style="{color:titleColor}">{{title}}</view>
			<scroll-view scroll-y :style="{height:height}">
				<view class="graceActionSheetList" 
				v-for="(item, index) in items" :key="index" 
				@tap.stop="selected" :data-index="index" 
				:style="{
					color:listColor, 
					lineHeight:listLineHeight, 
					fontSize:listFontSize}">{{item}}</view>
			</scroll-view>
			<view class="graceActionSheetList" :style="{border:'none', color:cancelBtnColor}" v-if="isCancelBtn" @tap.stop="cancel">{{cancelBtnName}}</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		width:{type:String,default:'720rpx'},
		height:{type:String,default:'500rpx'},
		left:{type:String,default:'15rpx'},
		background:{type : String,default : 'rgba(0, 0, 0, 0.3)'},
		borderRadius : {type : String,default : '10rpx'},
		zIndex:{type : Number,default : 99},
		title:{type:String,default:''},
		titleColor:{type:String, default:'#323232'},
		items:{type:Array, default:function(){return [];}},
		listColor:{type:String, default:'#3688FF'},
		listLineHeight:{type:String, default:'100rpx'},
		listFontSize:{type:String, default:'30rpx'},
		isCancelBtn:{type:Boolean, default:true},
		cancelBtnName:{type:String,default:'取消'},
		cancelBtnColor:{type:String, default:'#999999'},
		isSwitchPage:{type:Boolean, default:true}
	},
	data() {
		return {
			realShow : false,
			isIpx:false
		}
	},
	created : function(){
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
		cancel:function(){
			this.realShow = false;
			this.$emit('cancel')
		},
		closeByShade: function(){this.cancel();},
		stopFun : function(){},
		selected:function (e) {
			this.$emit('selected', e.currentTarget.dataset.index);
			this.close();
		},
		close:function(){this.realShow = false;},
		show:function(){this.realShow = true;}
	}
}
</script>
<style scoped>
.grace-shade-in{animation:grace-shade-in-a 280ms ease-in forwards;}
@keyframes grace-shade-in-a{0%{bottom:-500px; opacity:0;} 100%{bottom:var(--window-bottom); opacity:1;}}
.graceActionSheet{position:fixed; width:100%; height:100%; left:0; top:0;}
.graceActionSheetBody{background:#FFFFFF; position:absolute; bottom:var(--window-bottom); left:0; overflow:hidden;}
.graceActionSheetTitle{text-align:center; font-size:26rpx; line-height:120rpx; height:120rpx; font-weight:bold; border-bottom:1px solid #F8F8F8;}
.grace-ipx-bottom{padding-bottom:50rpx !important;}
.graceActionSheetList{line-height:120rpx; font-weight:600; overflow:hidden; text-align:center; margin:0 30rpx; border-bottom:1px solid #F8F8F8;}
</style>