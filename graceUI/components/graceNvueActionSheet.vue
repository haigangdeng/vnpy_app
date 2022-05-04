<template>
	<view class="">
	<view class="graceActionSheet" @tap.stop="closeByShade" @touchmove.stop.prevent="stopFun" 
	:style="{backgroundColor:background}" v-if="realShow"></view>
	<view :class="['graceActionSheetBody', isIpx ? 'grace-ipx-bottom' : '']"
	:style="{
		width:realShow ? width : '0rpx',left:left,
		borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius}" 
	@tap.stop="stopFun" v-if="realShow">
		<text class="graceActionSheetTitle border-bottom" :style="{color:titleColor}">{{title}}</text>
		<scroll-view scroll-y="true" :style="{height:height}">
			<text class="graceActionSheetList border-bottom" 
			v-for="(item, index) in items" :key="index" @tap.stop="selected" :data-index="index"
			:style="{color:listColor, lineHeight:listLineHeight, fontSize:listFontSize}">{{item}}</text>
		</scroll-view>
		<text class="graceActionSheetList" v-if="isCancelBtn" :style="{border:'none', color:cancelBtnColor}" @tap.stop="cancel">{{cancelBtnName}}</text>
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
		cancelBtnColor:{type:String, default:'#999999'}
	},
	data() {
		return {
			realShow : false,
			isIpx:false
		}
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
.graceActionSheet{position:fixed; width:750rpx; left:0; top:0; bottom:0;}
.graceActionSheetBody{background-color:#FFFFFF; position:fixed; bottom:0; left:0; overflow:hidden;}
.graceActionSheetTitle{text-align:center; font-size:26rpx; line-height:120rpx; height:120rpx; margin:0 30rpx; font-weight:bold;}
.grace-ipx-bottom{padding-bottom:50rpx !important;}
.graceActionSheetList{line-height:120rpx; font-size:26rpx; font-weight:600; overflow:hidden; text-align:center; margin:0 30rpx;}
.border-bottom{border-bottom-width:1px; border-style:solid; border-color:#F8F8F8;}
</style>