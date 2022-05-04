<template>
	<view class="grace-editor-show">
		<view v-for="(item, index) in article" :key="index" class="grace-editor-show-item">
			<text class="grace-editor-show-txt" v-if="item.type == 'txt'">{{item.content}}</text>
			<view class="grace-flex-center" v-else-if="item.type == 'center'">
				<text class="grace-editor-show-center">{{item.content}}</text>
			</view>
			<image class="grace-editor-show-image" :src="item.content" :data-index="index" @load="imgLoad" 
			:style="{width:'700rpx', height:item.height?item.height:''}" 
			v-else-if="item.type == 'img'" :data-url="item.content" @tap="showImgs" mode="widthFix"></image>
			<text class="grace-editor-show-quote" v-else-if="item.type == 'quote' || item.type == 'pre'">{{item.content}}</text> 
			<text class="grace-editor-show-strong" v-else-if="item.type == 'strong'">{{item.content}}</text>
			<view class="grace-editor-show-link" v-else-if="item.type == 'link'">
				<graceLink :url="item.content" :title="item.content"></graceLink>
			</view>
			<text class="grace-editor-show-spline" v-else-if="item.type == 'spline'">● ● ●</text>
		</view>
	</view>
</template>
<script>
import graceLink from "../../graceUI/weexComponents/graceLink.nvue";
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
		imgLoad:function (e) {
			var index  = e.currentTarget.dataset.index;
			var width  = e.detail.width;
			var height = e.detail.height;
			this.article[index].height = (700 * (height / width)) + 'rpx';
			this.article.splice(index, 1, this.article[index]);
		},
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
.grace-editor-show-item{font-size:0;}
.grace-editor-show-txt{line-height:52rpx; font-size:26rpx; color:#333333;}
.grace-editor-show-image{margin:10rpx 0; width:700rpx;}
.grace-editor-show-quote{margin:10rpx 0; color:#333333; background-color:#F8F8F8; line-height:36rpx; font-size:26rpx; padding:20rpx;}
.grace-editor-show-strong{font-weight:bold; font-size:30rpx; line-height:45rpx; padding:10px 0; color:#3D3D3D;}
.grace-editor-show-spline{text-align:center; color:#8788A3; line-height:60rpx; font-size:20rpx; opacity:0.3;}
.grace-editor-show-center{text-align:center; font-size:28rpx; color:#333333; line-height:60rpx; padding:15rpx; border-bottom-width:1rpx; border-bottom-style:solid; border-bottom-color:#C1C1C1; font-weight:900;}
.grace-editor-show-link{line-height:60rpx; color:#007AFF;}
</style>