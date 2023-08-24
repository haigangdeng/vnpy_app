<template>
	<list class="grace-swipe-list" :style="{width:width+'rpx'}">
		<cell class="grace-swipe-list-item" :style="{width:width+'rpx'}" 
		v-for="(item, index) in msgsIn" :key="index">
			<view class="grace-swipe-list-item-body" :style="{width:width+'rpx', marginLeft:(moveIndex != index ? 0 : (x * -1) )+ 'px'}">
				<view class="grace-swipe-list-img" :style="{width:imgSize[0], height:imgSize[1]}" @tap="itemTap(index)">
					<image :src="item.img" mode="widthFix" :style="{width:imgSize[0], height:imgSize[1], borderRadius:'6rpx'}"></image>
					<text class="grace-swipe-list-point" v-if="item.msgnumber > 0">{{item.msgnumber}}</text>
				</view>
				<view class="grace-swipe-list-content">
					<graceTouch @thStart="thStart" @thMove="thMove" @thEnd="thEnd" :datas="[index]" @tapme="tapin">
						<view class="grace-swipe-list-title">
							<text class="grace-swipe-list-title-text" :style="{fontSize:fontSizes[0], color:fontColors[0], flex:1}">{{item.title}}</text>
							<text class="grace-swipe-list-title-text" :style="{fontSize:fontSizes[1], color:fontColors[1], marginLeft:'25rpx', marginRight:'25rpx'}">{{item.time}}</text>
						</view>
						<text class="grace-swipe-list-desc" :style="{fontSize:fontSizes[2], color:fontColors[2], marginTop:'6rpx'}">{{item.content}}</text>
					</graceTouch>
				</view>
			</view>
			<view class="grace-swipe-btns" :style="{width:(moveIndex != index ? 0 : x) +'px'}">
				<view class="grace-swipe-btn" v-for="(btn, btnIndex) in item.btns" :key="btnIndex" 
				:style="{backgroundColor:btn.bgColor}" @tap.stop="btnTap(index, btnIndex)">
					<text class="grace-swipe-btn-text">{{btn.name}}</text>
				</view>
			</view>
		</cell>		
	</list>
</template>
<script>
import graceTouch from "./graceTouch.nvue";
export default{
	props:{
		width:{type:Number, default:750},
		msgs:{type:Array,default:function(){return [];}},
		imgSize:{type:Array,default:function(){return ['80rpx', '80rpx'];}},
		fontSizes:{type:Array,default:function(){return ['28rpx','22rpx', '22rpx'];}},
		fontColors:{type:Array,default:function(){return ['#323232','#888888', '#888888'];}},
		btnWidth:{type:Number, default:160}
	},
	data() {
		return {
			msgsIn    : [],
			damping   : 0.1,
			moveIndex : -1,
			x         : 0
		}
	},
	created:function(){
		this.init(this.msgs);
	},
	watch:{
		msgs : function(nv){
			this.init(nv);
		}
	},
	methods:{
		
		init:function(msgs){
			this.moveIndex = -1;
			this.msgsIn    = msgs;
		},
		thStart : function(e, index){
			this.moveIndex = index[0];
			this.oX        = this.x;
			this.x         = 0;
			this.damping   = 0.1;
		},
		thMove : function (e, index){
			this.x -= e[0][0] * this.damping;
			if(this.x > this.btnWidth){this.x = this.btnWidth;}
			if(this.x < 0){this.x = 0;}
			this.damping   *= 1.02;
		},
		thEnd : function(e, index){
			if(this.x < this.btnWidth / 3){
				this.x = 0;
			}else{
				this.x = this.btnWidth;
			}
		},
		btnTap : function (index, indexBtn) {
			this.$emit('btnTap',index, indexBtn);
		},
		itemTap :function (index) {
			this.$emit('itemTap',index);
		},
		tapin : function () {
			if(this.oX < 30){this.$emit('itemTap',this.moveIndex);}
		}
	},
	components:{
		graceTouch
	}
}
</script>
<style scoped>
.grace-swipe-list{overflow:hidden;}
.grace-swipe-list-item{overflow:hidden; position:relative;}
.grace-swipe-list-item-body{flex-direction:row; flex-wrap:nowrap; font-size:0; align-items:center;}
.grace-swipe-list-img{flex-shrink:0; margin-left:25rpx; font-size:0;}
.grace-swipe-list-point{border-radius:32rpx; height:30rpx; line-height:30rpx; padding:0 10rpx; font-size:20rpx; background-color:#FF0036; color:#FFFFFF; position:absolute; z-index:1; right:0; top:0;}
.grace-swipe-list-content{width:500rpx; flex:1; overflow:hidden; padding-top:25rpx; padding-bottom:25rpx; margin-left:22rpx; border-bottom-width:1px; border-style:solid; border-color:#F1F2F3;}
.grace-swipe-list-title{flex-direction:row; flex-wrap:nowrap; justify-content:space-between; overflow:hidden;}
.grace-swipe-list-title-text{line-height:38rpx; height:38rpx; overflow:hidden;}
.grace-swipe-list-desc{line-height:32rpx; height:32rpx; overflow:hidden; padding-right:25rpx;}
.grace-swipe-btns{width:0rpx; position:absolute; z-index:1; right:0; top:0; height:116rpx; flex-direction:row; flex-wrap:nowrap;}
.grace-swipe-btn{width:100rpx; flex:1; height:125rpx; flex-direction:row; flex-wrap:nowrap; justify-content:center; align-items:center; padding:20rpx; overflow:hidden;}
.grace-swipe-btn-text{line-height:36rpx; height:36rpx; overflow:hidden; font-size:28rpx; color:#FFFFFF;}
</style>