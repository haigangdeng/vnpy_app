<template>
	<view class="grace-article-list">
		<view class="grace-article-list-item" v-for="(item, index) in articles" :key="index" @tap="newstap(item.id)">
			<view style="width:100%;">
				<text class="grace-article-list-title" 
				:style="{lineHeight:titleStyle.lineHeight, fontSize:titleStyle.fontSize, color:titleStyle.color}">{{item.title}}</text>
			</view>
			<view class="grace-article-list-img1" v-if="item.imgs.length == 1">
				<gImg :src="item.imgs[0]" :width="440" :height="300"></gImg>
			</view>
			<view class="grace-article-list-more-imgs" v-if="item.imgs.length == 2">
				<view class="grace-article-list-img2-in">
					<gImg :src="item.imgs[0]" :width="335" :height="200"></gImg>
				</view>
				<view class="grace-article-list-img2-in">
					<gImg :src="item.imgs[1]" :width="335" :height="200"></gImg>
				</view>
			</view>
			<view class="grace-article-list-more-imgs" v-if="item.imgs.length >= 3">
				<view class="grace-article-list-img3-in">
					<gImg :src="item.imgs[0]" :width="220" :height="150"></gImg>
				</view>
				<view class="grace-article-list-img3-in">
					<gImg :src="item.imgs[1]" :width="220" :height="150"></gImg>
				</view>
				<view class="grace-article-list-img3-in">
					<gImg :src="item.imgs[2]" :width="220" :height="150"></gImg>
				</view>
			</view>
			<view class="grace-article-list-footer">
				<text class="grace-article-list-footer-items grace-icons">&#xe69e; {{item.author}}</text>
				<text class="grace-article-list-footer-items grace-icons grace-text-center">&#xe609; {{item.views}}</text>
				<text class="grace-article-list-footer-items grace-icons grace-text-right">&#xe64c; {{item.createTime}}</text>
			</view>
		</view>
	</view>
</template>
<script>
import gImg from "./graceImg.vue";
export default{
	props:{
		articles   : {type:Array, default:function(){return [];}},
		titleStyle : {type:Object, default:function(){return {'lineHeight':'50rpx', 'fontSize':'36rpx', 'color':'#323232'};}}
	},
	methods:{
		newstap : function(id){
			this.$emit('newstap', id);
		}
	},
	components:{gImg}
}
</script>
<style scoped>
.grace-article-list{}
.grace-article-list-item{width:100%; overflow:hidden; padding:25rpx; border-bottom:25rpx solid #F8F8F8; box-sizing:border-box;}
.grace-article-list-title{display:block; width:100%; overflow:hidden;}
.grace-article-list-img1{margin-top:15rpx;}
.grace-article-list-more-imgs{display:flex; flex-direction:row; justify-content:space-between; flex-wrap:nowrap;}
.grace-article-list-img2-in{width:335rpx; height:200rpx; padding:20rpx 0;}
.grace-article-list-img3-in{width:220rpx; height:150rpx; padding:20rpx 0;}
.grace-article-list-footer{display:flex; flex-direction:row; justify-content:space-between; padding-top:20rpx;}
.grace-article-list-footer-items{width:33.3%; line-height:50rpx; font-size:26rpx; color:#888888; display:block;}
</style>