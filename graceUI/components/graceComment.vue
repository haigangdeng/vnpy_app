<template>
	<graceBottomDialog ref="graceBottomDialog" @closeDialog="hide">
		<view slot="content" style="padding:20rpx 0;">
			<view class="grace-comments">
				<view class="grace-comments-at grace-icons icon-at" v-if="comment.at != ''">{{comment.at}}</view>
				<view class="grace-space-between">
					<view class="grace-comments-img" v-if="comment.img != ''">
						<image :src="comment.img" class="grace-comments-img-in" mode="widthFix"></image>
						<view class="grace-comments-img-remove grace-icons" @tap="removeImg">&#xe78a;</view>
					</view>
					<textarea :show-confirm-bar="false" cursor-spacing="200" v-model="comment.content" 
					class="grace-comments-textarea" :placeholder="placeholder" />
				</view>
			</view>
			<view class="grace-comments-btn grace-rows grace-space-between">
				<view class=""><view class="grace-comments-btns grace-icons" @tap="selectImg" v-if="isImg">&#xe63d;</view></view>
				<view class="grace-comments-btns grace-comments-submit grace-icons" @tap="submit">提交</view>
			</view>
		</view>
	</graceBottomDialog>
</template>
<script>
import graceBottomDialog from './graceBottomDialog.vue';
export default{
	props:{
		placeholder:{type:String, default:"说点什么吧"},
		isImg : {type:Boolean, default:true}
	},
	data() {
		return {
			comment:{img:'', content:'',at:''}
		}
	},
	methods:{
		open : function () {this.$refs.graceBottomDialog.open()},
		hide : function () {this.$refs.graceBottomDialog.hide()},
		submit:function () {
			this.$emit('submit', this.comment); 
			this.hide();
			this.comment = {img:'', content:'',at:''}
		},
		selectImg:function(){
			uni.chooseImage({
				count:1,
				success:(res)=>{this.comment.img = res.tempFilePaths[0];}
			});
		},
		removeImg:function () {
			this.comment.img = ''
		},
		setAt:function(name){
			this.comment.at = name
		}
	},
	components:{graceBottomDialog}
}
</script>
<style scoped>
.grace-comments{padding:10rpx 25rpx;}
.grace-comments-at{line-height:80rpx; font-size:28rpx; color:#3688FF; font-weight:bold; margin-bottom:3px;}
.grace-comments-at::before{padding-right:10rpx;}
.grace-comments-textarea{width:700rpx; border-radius:8rpx; padding:15rpx; font-size:26rpx; line-height:40rpx; height:130rpx; background-color:#F8F8F8;}
.grace-comments-img{width:160rpx; height:160rpx; margin-right:25rpx; font-size:0; overflow:hidden; flex-shrink:0; border-radius:8rpx; position:relative;}
.grace-comments-img-in{width:160rpx;}
.grace-comments-img-remove{width:60rpx; height:60rpx; line-height:60rpx; position:absolute; z-index:99; right:0; top:0; text-align:center; font-size:50rpx; color:#FF0036;}
.grace-comments-btn{}
.grace-comments-btns{width:96rpx; height:80rpx; line-height:80rpx; font-size:44rpx; color:#898989; text-align:left; margin-left:25rpx;}
.grace-comments-submit{width:180rpx !important; text-align:right !important; font-size:30rpx; color:#3688FF; margin-right:25rpx;}
</style>