<template>
	<view class="grace-editor-show">
		<view v-for="(item, index) in article" :key="index" class="grace-editor-show-item">
			<text class="grace-editor-show-txt" v-if="item.type == 'txt'">{{item.content}}</text>
			<view class="grace-flex-center" v-else-if="item.type == 'center'">
				<text class="grace-editor-show-center">{{item.content}}</text>
			</view>
			<image class="grace-editor-show-image" :src="item.content" 
			v-else-if="item.type == 'img'" :data-url="item.content" @tap="showImgs" mode="widthFix"></image>
			<text class="grace-editor-show-quote" v-else-if="item.type == 'quote' || item.type == 'pre'">{{item.content}}</text> 
			<text class="grace-editor-show-strong" v-else-if="item.type == 'strong'">{{item.content}}</text>
			<view v-else-if="item.type == 'link'" class="grace-editor-show-link">
				<graceLink :url="item.content" :title="item.content"></graceLink>
			</view>
			<text class="grace-editor-show-spline" v-else-if="item.type == 'spline'">● ● ●</text>
		</view>
	</view>
</template>
<script>
import graceLink from "../../graceUI/components/graceLink.vue";
export default{
	props:{
		article:{
			type : Array,
			default : function(){return new Array();}
		}
	},
	components:{
		graceLink
	},
	methods: {
		showImgs:function(e){
			var currentUrl = e.currentTarget.dataset.url;
			var imgs       = [];
			var items      = this.article;
			for(let i = 0; i < items.length; i++){
				if(items[i].type ==  'img'){
					imgs.push(items[i].content);
				}
			}
			uni.previewImage({
				urls:imgs,
				current:currentUrl
			})
		}
	}
}
</script>
<style scoped>
.grace-editor-show{}
.grace-editor-show-item{line-height:1.8em; letter-spacing:1px; font-size:0;}
.grace-editor-show-txt{line-height:52rpx; font-size:26rpx; color:#333333;}
.grace-editor-show-image{width:100%; margin:10rpx 0;}
.grace-editor-show-quote{margin:10rpx 0; width:92%; color:#333333; background:#F8F8F8; line-height:36rpx; font-size:26rpx; padding:20rpx 4%; display:block;}
.grace-editor-show-strong{font-weight:bold; width:100%; font-size:30rpx; line-height:45rpx; padding:10px 0; color:#3D3D3D; display:block;}
.grace-editor-show-spline{padding:10px 0; display:block; text-align:center; line-height:50rpx; color:#8788A3; font-size:20rpx; opacity:0.3;}
.grace-editor-show-center{text-align:center; font-size:28rpx; color:#333333; line-height:60rpx; padding:15rpx; border-bottom:1px solid #C1C1C1; font-weight:bold;}
.grace-editor-show-link{line-height:32rpx; padding:10px 0; color:#007AFF;}
</style>