<template>
	<view class="gap" @touchmove.stop.prevent="stopFun" @tap.stop="stopFun" 
	:style="{backgroundColor:background, left:realshow?'0':'-2000px'}">
		<view class="gap-body">
			<view class="gap-header grace-space-between">
				<text class="gap-header-btn" :style="{color:cancelTColor}" @tap="close">{{cancelText}}</text>
				<text class="gap-header-btn" :style="{textAlign:'right', color:confirmColor}" @tap="confirm">{{confirmText}}</text>
			</view>
			<picker-view :indicator-style="indicatorStyle" class="gap-main" :value="defaultVal" @change="change">
				<picker-view-column v-if="level >= 1">
					<text class="gap-item" v-for="(item, index) in province" :key="index">{{item.label}}</text>
				</picker-view-column>
				<picker-view-column v-if="level >= 2">
					<text class="gap-item" v-for="(item, index) in city[defaultVal[0]]" :key="index">{{item.label}}</text>
				</picker-view-column>
				<picker-view-column v-if="level >= 3">
					<text class="gap-item" v-for="(item, index) in area[defaultVal[0]][defaultVal[1]]" :key="index">{{item.label}}</text>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>
<script>
import provinceData from '../data/city-data/province.js';
import cityData     from '../data/city-data/city.js';
import areaData     from '../data/city-data/area.js';
export default {
	name: "graceAddressPicker",
	props: {
		show          : { type : Boolean, default : false },
		background    : { type : String,  default : 'rgba(0, 0, 0, 0.5)' },
		cancelText    : { type : String,  default : '取消' },
		cancelTColor  : { type : String,  default : '#888888' },
		confirmText   : { type : String,  default : '确定' },
		confirmColor  : { type : String,  default : '#3688FF' },
		value         : { type : Array ,  default () { return ['', '', ''] }},
		level         : { type : Number,  default : 3}
	},
	data() {
		return {
			indicatorStyle : 'height:35px',
			province       : provinceData,
			city           : cityData,
			area           : areaData,
			defaultVal     : [0,0,0],
			realshow       : false
		}
	},
	created() {
		this.setDefault();
		this.realshow = this.show;
	},
	watch:{
		value:function(nv, ov){this.setDefault();},
		defaultVal : function(nv, ov){
			if(ov[0] != nv[0]){
				this.defaultVal.splice(1,1,0);
				this.defaultVal.splice(2,1,0);
			}else if(ov[1] != nv[1]){
				this.defaultVal.splice(2,1,0);
			}
		},
		show:function(v){if(v){this.open();}else{this.hide();}}
	},
	methods: {
		stopFun : function () {},
		setDefault:function(){
			if(this.value[0] == ''){return ;}
			this.$nextTick(() => {
				this.defaultVal.splice(0, 1, this.arrayIndexOf(this.province, this.value[0]));
				if(this.value[1] == ''){return ;}
				this.$nextTick(() => {
					this.defaultVal.splice(1,1, this.arrayIndexOf(this.city[this.defaultVal[0]], this.value[1]));
					if(this.value[2] == ''){return ;}
					this.$nextTick(() => {
						this.defaultVal.splice(2,1, this.arrayIndexOf(this.area[this.defaultVal[0]][this.defaultVal[1]], this.value[2]));
					})
				})
			});
		},
		arrayIndexOf : function(arr, needFind){
			var index = 0;
			for(let i = 0; i < arr.length; i++){if(arr[i].label == needFind){index = i; return i;}}
			return index;
		},
		change : function (e) {
			var res = e.detail.value;
			if(!res[0]){res[0] = 0;}
			if(!res[1]){res[1] = 0;}
			if(!res[2]){res[2] = 0;}
			this.defaultVal = res;
		},
		confirm:function () {
			var codes = [
				provinceData[this.defaultVal[0]].value,
				cityData[this.defaultVal[0]][this.defaultVal[1]].value,
				areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].value : 0
			];
			var names = [
				provinceData[this.defaultVal[0]].label,
				cityData[this.defaultVal[0]][this.defaultVal[1]].label,
				areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label ? areaData[this.defaultVal[0]][this.defaultVal[1]][this.defaultVal[2]].label : ''
			];
			codes = codes.splice(0, this.level);
			names = names.splice(0, this.level);
			var res = {codes : codes, names : names, indexs : this.defaultVal};
			this.$emit('confirm', res);
		},
		close : function () {
			this.$emit('close');
		},
		open : function () {
			this.realshow = true;
		},
		hide : function () {
			this.realshow = false;
		}
	}
}
</script>
<style scoped>
.gap{position:fixed; width:750rpx; flex:1; top:0; left:0; bottom:0;}
.gap-body{background-color:#FFFFFF; position:absolute; bottom:0; left:0; width:750rpx;}
.gap-header{padding:25rpx;}
.gap-header-btn{width:200rpx; line-height:38rpx; height:38rpx; font-size:28rpx;}
.gap-main{width:750rpx; height:280px;}
.gap-item{height:35px; font-size:12px; line-height:35px; overflow:hidden; text-align:center;}
</style>