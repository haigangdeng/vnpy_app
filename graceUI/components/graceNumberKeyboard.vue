<template>
	<view>
		<view class="grace-mask" @tap.stop="masktap" @touchmove.stop.prevent="stopFun" v-if="show"></view>
		<view class="grace-keyboard" v-if="show">
			<view class="grace-keyboard-res" v-if="showInputRes" 
			:style="{color:resultColor, fontSize:resultSize}">{{resVal}}</view>
			<view class="grace-keyboard-body">
				<view class="grace-keyboard-left">
					<view class="grace-keyboard-keys" 
					v-for="(item, index) in [1,2,3,4,5,6,7,8,9]" :key="index" 
					:data-keynumber="item" hover-class="keydown" hover-stay-time="100" 
					@tap.stop="inputNow">{{item}}</view>
					<view class="grace-keyboard-keys" 
					:style="{width:isPoint ? '259rpx':'538rpx'}" hover-class="keydown" hover-stay-time="100" 
					data-keynumber="0" @tap.stop="inputNow">0</view>
					<view v-if="isPoint" class="grace-keyboard-keys" 
					style="width:259rpx;" hover-class="keydown" hover-stay-time="100" 
					data-keynumber="." @tap.stop="inputNow">.</view>
				</view>
				<view class="grace-keyboard-right">
					<view class="grace-keyboard-keys grace-keyboard-delete grace-icons" 
					hover-class="keydown" hover-stay-time="100" @tap.stop="deleteNow"></view>
					<view class="grace-keyboard-keys grace-keyboard-done" @tap.stop="done" 
					:style="{background:confirmBtnColor}">{{doneBtnName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default {
	props: {
		show : { type : Boolean, default : false },
		doneBtnName   : { type : String, default : "完成" },
		isPoint       : { type : Boolean, default : true },
		showInputRes  : {type : Boolean, default : true},
		value         : {type:String, default:''},
		confirmBtnColor:{type:String, default:'#3688FF'},
		resultColor   : {type:String, default:'#323232'},
		resultSize    : {type:String, default:'32rpx'},
		closeByShade  : {type:Boolean, default:true}
	},
	data() {
		return {
			resVal: ''
		}
	},
	created:function(){
		this.resVal = this.value+'';
	},
	methods: {
		stopFun : function(){},
		inputNow : function (e){
			var k = e.currentTarget.dataset.keynumber;
			this.resVal += k+'';
			this.$emit('keyboardInput', k);
		},
		deleteNow : function (e){
			this.resVal = this.resVal.substring(0, this.resVal.length - 1);
			this.$emit('keyboardDelete');
		},
		done : function(e){
			this.$emit('keyboardDone');
		},
		setVal : function (val) {
			this.resVal = val;
		},
		masktap : function(){
			if(!this.closeByShade){return ;}
			this.done();
		}
	}
}
</script>
<style scoped>
.grace-mask{background:rgba(255, 255, 255, 0); position:fixed; width:100%; height:100%; left:0; top:0; z-index:1;}
.grace-keyboard{background:#F4F5F6; position:fixed; width:100%; height:auto; left:0; bottom:0; z-index:3;}
.grace-keyboard-body{display:flex; flex-direction:row; justify-content:space-between; padding:10px 0;}
.grace-keyboard-left{width:560rpx; display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-between;}
.grace-keyboard-right{width:188rpx; display:flex; flex-direction:column; justify-content:space-between;}
.grace-keyboard-keys{width:166rpx; height:100rpx; margin:10rpx; background:#FFFFFF; text-align:center; line-height:100rpx; border-radius:8rpx; font-weight:700; font-size:50rpx;}
.grace-keyboard-done{height:340rpx !important; line-height:340rpx !important; font-size:36rpx !important; font-weight:400 !important; color:#FFFFFF !important;}
.grace-keyboard-delete{font-family:"grace-iconfont";}
.grace-keyboard-delete:before{content:"\e623";}
.keydown{background:#3688FF !important; color:#FFFFFF !important;}
.grace-keyboard-res{line-height:60rpx; text-align:center; font-size:32rpx; font-weight:bold; padding-top:20rpx;}
</style>