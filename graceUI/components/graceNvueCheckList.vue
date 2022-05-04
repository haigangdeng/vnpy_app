<template>
	<view class="check-list" :style="{height:height+'px'}">
		<scroll-view scroll-y="true" :style="{height:height+'px'}">
			<view v-for="(item, index) in dataIn" :key="index" class="check-list-item" :data-index="index" @tap.stop="choose">
				<text class="check-list-icon grace-icons" v-if="item.checked && batch" :style="{color:checkColor}">&#xe7f8;</text>
				<text class="check-list-icon grace-icons" v-if="!item.checked && batch" style="color:#D2D2D2;">&#xe762;</text>
				<view class="check-list-body" :class="[isBorder && index < dataIn.length - 1 ? 'grace-border-b':'']">
					<image :src="item.img" class="check-list-img" v-if="item.img" mode="widthFix" :style="{width:imgSize[0], height:imgSize[1],borderRadius:imgBordeRadius}"></image>
					<view class="check-list-content">
						<text class="check-list-content-title" :style="{fontSize:fontSize, color:itemColor}">{{item.title}}</text>
						<text class="check-list-content-desc" :style="{color:smallTextColor, fontSize:smallTextSize}">{{item.desc}}</text>
					</view>
				</view>
			</view>
			<view style="height:120rpx;" v-if="batch"></view>
		</scroll-view>
		<view class="check-list-footer" v-if="height > 0 && batch">
			<text class="grace-icons check-list-icon" v-if="sedAll" :style="{color:checkColor}" @tap.stop="selectAll">&#xe7f8;</text>
			<text class="grace-icons check-list-icon " v-if="!sedAll" @tap.stop="selectAll">&#xe762;</text>
			<text class="check-list-footer-text" @tap.stop="selectAll">全选 {{sedNumbers > 0 ? sedNumbers +'/'+ dataIn.length : ''}}</text>
			<view class="check-list-footer-btns"><slot></slot></view>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		height:{type:Number, default:0},
		lists : {type:Array, default:function(){return [];}},
		checkColor:{type:String, default:"#3688FF"},
		imgSize:{type:Array, default:function(){return ['68rpx','68rpx'];}},
		isBorder:{type:Boolean, default:true},
		fontSize:{type: String, default: "28rpx"},
		itemColor:{type:String, default:"#323232"},
		imgBordeRadius:{type: String, default: "8rpx"},
		smallTextColor:{type:String, default:"#999999"},
		smallTextSize:{type:String, default:"24rpx"},
		batch:{type:Boolean, default:false}
	},
	data() {
		return {
			dataIn: [],
			sedAll:false,
			sedNumbers:0
		}
	},
	created:function(){
		this.dataIn = this.lists;
	},
	watch:{
		lists:function(val){
			this.dataIn = val;
		},
		dataIn:function(val){
			var sedNumber = 0;
			for(let i = 0; i < this.dataIn.length; i++){
				if(this.dataIn[i].checked){
					sedNumber++;
				}
			}
			this.sedNumbers = sedNumber;
			if(sedNumber >= val.length){this.sedAll = true;}else{this.sedAll = false;}
		}
	},
	methods:{
		choose:function(e){
			var index = e.currentTarget.dataset.index;
			if(this.dataIn[index].checked){
				this.dataIn[index].checked = false;
				this.dataIn.splice(index, 1, this.dataIn[index]);
			}else{
				this.dataIn[index].checked = true;
				this.dataIn.splice(index, 1, this.dataIn[index]);
			}
			this.dataIn = this.dataIn;
			var sedArr = [];
			for(let i = 0; i < this.dataIn.length; i++){
				if(this.dataIn[i].checked){
					sedArr.push(i);
				}
			}
			this.$emit('change', sedArr);
		},
		selectAll : function(){
			if(this.sedAll){
				for(let i = 0; i < this.dataIn.length; i++){
					this.dataIn[i].checked = false;
					this.dataIn.splice(i, 1, this.dataIn[i]);
				}
				this.sedAll = false;
				this.$emit('change', []);
			}else{
				var sedArr = [];
				for(let i = 0; i < this.dataIn.length; i++){
					this.dataIn[i].checked = true;
					this.dataIn.splice(i, 1, this.dataIn[i]);
					sedArr.push(i);
				}
				this.sedAll = true;
				this.$emit('change', sedArr);
			}			
		}
	}
}
</script>
<style scoped>
.check-list{position:relative;}
.check-list-item{flex-direction:row; flex-wrap:nowrap; align-items:center; font-size:0; background-color:#FFFFFF; padding:0 25rpx;}
.check-list-icon{width:60rpx; line-height:50rpx; text-align:center; font-size:36rpx; color:#D2D2D2; font-weight:700; margin-right:15rpx;}
.check-list-img{border-radius:10rpx; margin-right:28rpx;}
.check-list-body{width:300rpx; flex:1; flex-wrap:nowrap; flex-direction:row; align-items:center;}
.check-list-content{width:200rpx; flex:1; overflow:hidden; padding:22rpx 0;}
.check-list-content-title{line-height:44rpx; font-size:28rpx;}
.check-list-content-desc{line-height:36rpx; font-size:22rpx;}
.grace-border-b{border-color:#F4F5F6;}
.check-list-footer{background-color:#FFFFFF; position:absolute; left:0; bottom:0; width:750rpx; padding-top:10rpx; padding-bottom:10rpx; padding-left:25rpx; padding-right:25rpx; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.check-list-footer-text{font-size:28rpx; color:#323232; line-height:36rpx;}
.check-list-footer-btns{width:200rpx; flex:1; margin-left:28rpx;}
</style>