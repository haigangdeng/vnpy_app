<template>
	<view class="grace-select-menu-wrap">
		<view class="grace-select-menu-title" @click.stop="showMenu" id="menumain">
			<text class="grace-select-menu-title-txt" :style="{fontSize:fontSize}">{{items[currentIndex]}}</text>
			<text class="grace-select-menu-title-icon grace-icons" v-if="!show">&#xe603;</text>
			<text class="grace-select-menu-title-icon grace-icons" v-if="show">&#xe654;</text>
		</view>
		<view class="grace-select-menu" @click.stop="close" @touchmove.stop.prevent="stopfun" v-if="show">
			<scroll-view class="grace-select-menus" scroll-y :style="{padding:padding, height:height+'rpx'}">
				<view @tap.stop="stopfun" class="grace-select-item" v-if="isInput"
				style="flex-direction:row; flex-wrap:nowrap; align-items:center;">
					<view class="grace-select-input-wrap">
						<input type="text" v-model="inputVal" class="grace-select-input" @confirm="addTag" :placeholder="placeholder" />
					</view>
					<text class="grace-select-input-btn" @tap.stop="addTag" @touchmove.stop.prevent="stopfun">{{addBtnName}}</text>
				</view>
				<view class="grace-select-item" v-for="(item, index) in items" :key="index" :data-index="index" @click.stop="select">
					<text class="grace-selected-icon grace-icons" :style="{color : index == currentIndex ? activeColor : color}" v-if="index == currentIndex">&#xe7f8;</text>
					<text class="grace-selected-text" :style="{color : index == currentIndex ? activeColor : color, fontSize:fontSize}">{{item}}</text>
				</view>
			</scroll-view>
		</view>
	</view>
</template>
<script>
export default {
	props:{
		items : {
			type : Array,
			default : function () {
				return []
			}
		},
		show : {
			type : Boolean,
			default : false
		},
		height : {
			type : Number,
			default : 500
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
		fontSize : {
			type : String,
			default : '26rpx'
		},
		padding:{
			type : String,
			default : "20rpx"
		},
		isInput:{type:Boolean, default:false},
		placeholder:{type:String, default:"自定义"},
		addBtnName:{type:String, default:"+ 添加"}
	},
	data() {
		return {
			currentIndex : 0,
			top : 0
		}
	},
	created : function () {
		this.currentIndex = this.selectIndex;
	},
	watch:{
		selectIndex : function () {
			this.currentIndex = this.selectIndex;
		}
	},
	methods:{
		showMenu:function () {
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
		},
		stopfun : function () {}
	}
}
</script>
<style scoped>
.grace-select-menu-wrap{}
.grace-select-menu-title{flex-direction:row; justify-content:center; flex-wrap:nowrap; align-items:center;}
.grace-select-menu-title-txt{font-size:28rpx; line-height:92rpx;}
.grace-select-menu-title-icon{margin-left:10rpx; font-size:22rpx; line-height:92rpx;}
.grace-select-menu{position:fixed; width:750rpx; left:0; top:0; bottom:0; background-color:rgba(0,0,0,0.2); flex-direction:column; align-items:flex-end;}
.grace-select-menus{width:750rpx; position:absolute; left:0; bottom:0; background-color:#FFFFFF;}
.grace-select-item{padding:10rpx; background-color:#FFFFFF; font-size:28rpx; color:#333333; border-bottom-width:1px; border-bottom-style:solid; border-bottom-color:#F8F8F8; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-selected-icon{font-size:28rpx; line-height:80rpx; margin-right:20rpx;}
.grace-selected-text{font-size:28rpx; line-height:80rpx;}
.grace-select-input-wrap{width:200rpx; flex:1;}
.grace-select-input{line-height:60rpx; height:60rpx; font-size:28rpx; margin-top:20rpx;margin-bottom:20rpx;}
.grace-select-input-btn{width:120rpx; line-height:60rpx; height:60rpx; text-align:center; background-color:#F8F8F8; font-size:24rpx; border-radius:6rpx; color:#3688FF;}
</style>