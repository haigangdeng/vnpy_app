<template>
	<view>
		<view @tap.stop="open"><slot></slot></view>
		<view class="graceDateTimeBT" v-if="show" @touchmove.stop.prevent="stopfun" @tap.self="close" 
		:style="{backgroundColor:background}"></view>
		<view class="graceDateTimeBT-body" :class="[show?'gdIn':'gdOut']" @touchmove.stop.prevent="stopfun" 
		:style="{paddingBottom:paddingBottom}">
			<view class="graceDateTimeBT-header grace-space-between">
				<text class="graceDateTime-header-btn" 
				:style="{color:cancelTColor}" @tap="close">{{cancelText}}</text>
				<text class="graceDateTime-header-btn" 
				:style="{textAlign:'right', color:confirmColor}" @tap="confirm">{{confirmText}}</text>
			</view>
			<view>
				<text class="graceDateTimeBT-text">{{titles[0]}}</text>
			</view>
			<view>
				<graceDateTimeBetweenBase  :value="startValue" :isTime="isTime" @change="chang1" 
				:isSecond="isSecond" :startYear="startYear" :endYear="endYear" :units="units"></graceDateTimeBetweenBase>
			</view>
			<view>
				<text class="graceDateTimeBT-text">{{titles[1]}}</text>
			</view>
			<view>
				<graceDateTimeBetweenBase :value="endValue" :isTime="isTime" @change="chang2" 
				:isSecond="isSecond" :startYear="startYear" :endYear="endYear" :units="units"></graceDateTimeBetweenBase>
			</view>
		</view>
	</view>
</template>
<script>
import graceDateTimeBetweenBase from "./graceDateTimeBetweenBase.vue";
export default {
	components:{
		graceDateTimeBetweenBase
	},
	props: {
		background:{ type : String, default : 'rgba(0, 0, 0, 0.5)' },
		cancelText : { type : String, default : '取消' },
		cancelTColor : { type : String, default : '#888888' },
		confirmText : { type : String, default : '确定' },
		confirmColor : { type : String, default : '#3688FF' },
		startValue : { type : String , default:''},
		endValue : { type : String , default:''},
		isTime : {type : Boolean, default : true},
		isSecond : {type : Boolean, default : true},
		startYear : {type : Number, default : 1980},
		endYear : {type : Number, default : 2050},
		units : {type : Array , default:function(){return new Array('年','月','日','时','分','秒')}},
		titles : {type : Array , default:function(){return new Array('请选择开始时间','请选择结束时间')}},
		paddingBottom:{type : String , default:'0rpx'}
	},
	data() {
		return {
			show:false,
			indicatorStyle : 'height:35px',
			defaultVal     : [0,0,0,0,0,0],
			sDate:[[],[],[],[],[],[]],
			recDate:[[],[]]
		}
	},
	methods:{
		stopfun:function(){},
		open : function () {
			this.show = true;
		},
		close : function () {
			this.show = false;
		},
		confirm : function(){
			this.show = false;
			this.$emit('confirm', this.recDate);
		},
		chang1 : function(res){
			this.recDate[0] = res;
		},
		chang2 : function(res){
			this.recDate[1] = res;
		}
	}
}
</script>
<style scoped>
.graceDateTimeBT{position:fixed; width:100%; height:100%; top:0; left:0; bottom:0; z-index:998;}
.graceDateTimeBT-body{background-color:#FFFFFF; position:fixed; z-index:999; bottom:-1000px; left:0; width:100%;}
.graceDateTimeBT-header{padding:25rpx;}
.graceDateTimeBT-header-btn{width:200rpx; line-height:38rpx; height:38rpx; display:block; font-size:28rpx;}
.graceDateTimeBT-text{display:block; box-sizing:border-box; padding:15rpx; background-color:#FFFFFF; width:100%; line-height:60rpx; height:100rpx; color:#666666; font-size:28rpx;}
@keyframes gdIn{ from {bottom:-1000px; } 100% { bottom: 0px; }}
.gdIn {animation:gdIn 200ms ease-in forwards;}
@keyframes gdOut{ from {bottom:0px;} 100% { bottom:-1000px; }}
.gdOut {animation:gdOut 200ms ease-out forwards;}
</style>
