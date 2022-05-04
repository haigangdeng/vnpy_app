<template>
<view class="grace-editor">
	<textarea class="grace-editor-title" v-model="article.title" placeholder="# 请输入标题" auto-height />
	<!-- 内容区域 -->
	<view v-for="(item, index) in article.contents" :key="index" class="grace-editor-items">
	<!-- 普通文本 -->
	<textarea class="grace-editor-txt" maxlength="-1" :data-index="index" v-if="item.type == 'txt'" 
	@input="graceEditorInput" :value="item.content" placeholder="# 请在此处输入文本内容" auto-height />
	<!-- 居中标题 -->
	<input type="text" class="grace-editor-center" maxlength="-1" :data-index="index" 
	@input="graceEditorInput" :value="item.content" placeholder="# 输入居中题目" v-else-if="item.type == 'center'" />
	<!-- 图片 -->
	<view class="grace-editor-img-wrap" v-else-if="item.type == 'img'">
		<image :src="item.content" class="grace-editor-img" :data-index="index" mode="widthFix" @tap="deleteItem"></image>
		<view class="grace-editor-img-error" v-if="item.error">
			<view class="grace-flex-center">
				<text class="grace-editor-img-error-text grace-red" style="font-size:32rpx;">图片上传失败！</text>
			</view>
			<view class="grace-flex-center grace-margin-top">
				<text class="grace-editor-img-error-text grace-green">点击发布按钮重新上传</text>
				<text class="grace-editor-img-error-text">或</text>
				<text class="grace-editor-img-error-text grace-red" :data-index="index" @tap.stop="deleteItem">删除图片</text>
			</view>
		</view>
	</view>
	<!-- 引用 -->
	<textarea class="grace-editor-quote" maxlength="-1" :data-index="index" v-else-if="item.type == 'quote'" 
	@input="graceEditorInput" :value="item.content" placeholder="# 请在此处输入引用内容" auto-height />
	<!-- 加粗 -->
	<textarea class="grace-editor-strong" :data-index="index" maxlength="-1" v-else-if="item.type == 'strong'" 
	@input="graceEditorInput" :value="item.content" placeholder="# 请在此处输入加粗内容" auto-height />
	<!-- 链接 -->
	<input type="text" class="grace-editor-link" :data-index="index" v-else-if="item.type == 'link'" 
	@input="graceEditorInput" :value="item.content" placeholder="# 输入连接地址" />
	<!-- 分割 -->
	<text class="grace-editor-spline" :data-index="index" @tap="deleteItem" v-else-if="item.type == 'spline'">● ● ●</text>
	</view>
	<!-- 选项类型选择 -->
	<view class="grace-space-between grace-editor-menus" :style="{paddingBottom:ipxHeight}">
		<text class="grace-editor-icons grace-icons" data-type="txt" @tap="graceEditorAddItem">&#xe9e4;</text>
		<text class="grace-editor-icons grace-icons" data-type="center" @tap="graceEditorAddItem">&#xe621;</text>
		<text class="grace-editor-icons grace-icons" data-type="img" @tap="graceEditorAddItem">&#xe63d;</text>
		<text class="grace-editor-icons grace-icons" data-type="quote" @tap="graceEditorAddItem">&#xe620;</text>
		<text class="grace-editor-icons grace-icons" data-type="strong" @tap="graceEditorAddItem">&#xe640;</text>
		<text class="grace-editor-icons grace-icons" data-type="link" @tap="graceEditorAddItem">&#xe61e;</text>
		<text class="grace-editor-icons grace-icons" data-type="spline" @tap="graceEditorAddItem">&#xe61b;</text>
	</view>
	<!-- 底部占位 -->
	<view style="height:200rpx; width:100%"></view>
</view>
</template>
<script>
export default{
	data() {
		return {
			article : {title:'', contents:[]},
			ipxHeight : 0
		}
	},
	methods:{
		graceEditorAddItem : function(e){
			var type = e.currentTarget.dataset.type;
			if(type == 'img'){
				uni.chooseImage({
					success:(e)=>{
						var imgs = e.tempFilePaths;
						for(let i = 0; i < imgs.length; i++){
							this.article.contents.push({type:type,content:imgs[i]});
						}
						this.returnArt();
					}
				});
			}else{
				this.article.contents.push({type:type,content:''});
				this.returnArt();
			}
		},
		graceEditorInput : function(e){
			var index = e.currentTarget.dataset.index;
			var val   = e.detail.value;
			if(val == ''){
				this.article.contents.splice(index, 1);
			}else{
				this.article.contents[index].content = val;
			}
			this.returnArt();
		},
		deleteItem : function(e){
			var index = e.currentTarget.dataset.index;
			uni.showModal({
				title:"提示",
				content:"确定要删除项目吗?",
				success:(e)=>{
					if(e.confirm){this.article.contents.splice(index, 1); this.returnArt();}
				}
			})
		},
		returnArt : function(){
			this.$emit('change', this.article);
		},
		setError : function(index){
			this.article.contents[index].error = true;
			this.article.contents.splice(index, 1, this.article.contents[index]);
		},
		setDefault : function (article) {
			this.article = article;
			this.returnArt();
		}
	}
}
</script>
<style scoped>
/* 编辑器 */
.grace-editor{padding:10rpx 25rpx; width:750rpx;}
.grace-editor-title{padding:25rpx 0; border-bottom-width:1px; border-bottom-style:solid; border-color:#F1F2F3; width:700rpx; font-size:36rpx; font-weight:bold; line-height:50rpx; color:#555555;}
.grace-editor-menus{width:750rpx; position:fixed; left:0; background-color:#F8F8F8; bottom:0; border-top-width:1px; border-top-style:solid; border-color:#F1F2F3; padding:0 25rpx;}
.grace-editor-icons{width:700rpx; flex:1; height:88rpx; color:#666666; line-height:88rpx; text-align:center; font-size:38rpx !important;}
.grace-editor-items{margin-top:10rpx; flex-direction:row; justify-content:center;}
.grace-editor-txt{width:700rpx; font-size:26rpx; margin-top:15rpx; margin-bottom:15rpx;}
.grace-editor-center{width:300rpx; text-align:center; font-size:28rpx; color:#333333; line-height:60rpx; padding:10rpx; border-bottom-width:1px; border-bottom-style:solid; border-color:#F1F2F3; font-weight:bold;}
.grace-editor-img-wrap{width:700rpx; height:300rpx; overflow:hidden;  margin:10rpx 0; position:relative; font-size:0;}
.grace-editor-img{width:700rpx; height:300rpx;}
.grace-editor-img-error{position:absolute; width:700rpx; height:300rpx; left:0; top:0; background-color:rgba(0,0,0,0.5); flex-direction:column; align-items:center; justify-content:center;}
.grace-editor-img-error-text{font-size:28rpx; margin:0 15rpx; color:#FFFFFF;}
.grace-editor-quote{border-radius:8rpx; width:700rpx; color:#333333; background-color:#F8F8F8; margin-top:15rpx; margin-bottom:15rpx; font-size:26rpx;}
.grace-editor-strong{width:700rpx; font-weight:bold; font-size:26rpx; margin-top:15rpx; margin-bottom:15rpx;}
.grace-editor-link{width:700rpx; font-size:26rpx; margin-top:15rpx; margin-bottom:15rpx; color:#007AFF;}
.grace-editor-spline{width:700rpx; line-height:60rpx; text-align:center; color:#8788A3; font-size:28rpx; opacity:0.6;}
</style>