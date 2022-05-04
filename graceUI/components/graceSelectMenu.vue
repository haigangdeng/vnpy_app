<template>
	<view class="grace-select-menu-wrap">
		<view class="grace-select-menu-title" @click.stop="showMenu" id="menuMain">
			<text :style="{fontSize:fontSize}">{{items[currentIndex]}}</text>
			<text class="grace-select-menu-icon icon-allow-b" v-if="!show"></text>
			<text class="grace-select-menu-icon icon-allow-t" v-if="show"></text>
		</view>
		<view class="grace-select-menu" :style="{top : top +'px', height:heightIn+'px', zIndex:zIndex}" 
		@click.stop="close" @touchmove.stop.prevent="stopfun" v-if="show">
			<view style="height:92rpx; width:100%; flex-shrink:0;"></view>
			<scroll-view scroll-y class="grace-select-menus" :style="{padding:padding}">
				<view @tap.stop="stopfun" class="grace-select-item" v-if="isInput" 
				style="display:flex; flex-direction:row; flex-wrap:nowrap; align-items:center;">
					<view class="grace-select-input-wrap">
						<input type="text" v-model="inputVal" class="grace-select-input" @confirm="addTag" :placeholder="placeholder" />
					</view>
					<view class="grace-select-input-btn" @tap.stop="addTag">{{addBtnName}}</view>
				</view>
				<view :class="['grace-select-item', index == currentIndex ? 'grace-selected' : '']" 
				v-for="(item, index) in items" :style="{color : index == currentIndex ? activeColor : color}"
				:key="index" :data-index="index" @click.stop="select">
					<text class="grace-selected-icon" v-if="index == currentIndex"></text>
					<text :style="{fontSize:fontSize}">{{item}}</text>
				</view>
				<view style="height:100rpx; width:100%"></view>
			</scroll-view>
		</view>
	</view>
</template>
<script scoped>
export default {
	props:{
		items : {
			type : Array,
			default : function () { return [] }
		},
		show : {
			type : Boolean,
			default : false
		},
		height : {
			type : Number,
			default : 300
		},
		color : {
			type : String,
			default : "#333333"
		},
		activeColor : {
			type : String,
			default : "#3688FF"
		},
		selectIndex : {
			type : Number,
			default : 0
		},
		isH5header : {
			type : Boolean,
			default : true
		},
		fontSize : {
			type : String,
			default : '26rpx'
		},
		padding:{
			type : String,
			default : "0 20rpx"
		},
		zIndex:{
			type : Number,
			default : 9999
		},
		isInput:{type:Boolean, default:false},
		placeholder:{type:String, default:"自定义"},
		addBtnName:{type:String, default:"+ 添加"}
	},
	data() {
		return {
			currentIndex : 0,
			top          : 0,
			heightIn     : 200,
			showRes      : [],
			inputVal     : ''
		}
	},
	watch:{
		selectIndex : function () {
			this.currentIndex = this.selectIndex;
		}
	},
	created : function () {
		this.currentIndex = this.selectIndex;
	},
	methods:{
		stopfun : function () {},
		showMenu:function () {
			uni.createSelectorQuery().in(this).select('#menuMain').fields(
				{rect: true}, (res) => {
					var system = uni.getSystemInfoSync();
					var wHeight = system.windowHeight;
					this.top = res.top;
					this.heightIn  = wHeight - this.top;
					// #ifdef H5
					if(this.isH5header){
						this.top += 44;
						this.heightIn -= 44;
					}
					// #endif
				}
			).exec();
			this.$emit('showMenu');
		},
		close : function(){
			this.$emit('close');
		},
		select : function(e){
			var index = Number(e.currentTarget.dataset.index);
			this.currentIndex = index;
			this.$emit('select', index);
			this.close();
		},
		addTag : function () {
			if(this.inputVal == ''){return ;}
			this.$emit('submit', this.inputVal);
			this.inputVal = '';
		}
	}
}
</script>
<style scoped>
.grace-select-menu-wrap{width:100%; position:relative;}
.grace-select-menu-title{height:90rpx; line-height:90rpx; font-size:28rpx; color:#333333; width:100%; text-align:center; overflow:hidden;}
.grace-select-menu-icon{font-family:"grace-iconfont"; margin-left:10rpx; font-size:22rpx;}
.icon-allow-b:after{content:"\e603";}
.icon-allow-t:after{content:"\e654";}
.grace-select-menu{position:fixed; width:750rpx; left:0; top:0; box-sizing:border-box; z-index:9999; overflow:hidden; display:flex; flex-direction:column;}
.grace-select-menus{background:#FFFFFF; padding:0; height:300px; flex:1;}
.grace-select-item{line-height:100rpx; width:700rpx; padding:0 10rpx; font-size:28rpx; color:#333333; border-bottom:1px solid #F8F8F8;}
.grace-select-item:last-child{border:0;}
.grace-selected{font-weight:bold;}
.grace-selected-icon{margin-right:15rpx; font-family:"grace-iconfont";}
.grace-selected-icon:after{content:"\e7f8";}
.grace-select-input-wrap{width:700rpx;}
.grace-select-input{line-height:60rpx; padding:25rpx 0; font-size:28rpx;}
.grace-select-input-btn{width:120rpx; line-height:60rpx; height:60rpx; text-align:center; background:#F8F8F8; font-size:24rpx; border-radius:6rpx; color:#3688FF; flex-shrink:0;}
</style>