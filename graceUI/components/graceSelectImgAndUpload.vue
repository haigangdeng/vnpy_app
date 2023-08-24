<template>
	<view class="grace-add-list">
		<view class="grace-add-list-items" v-for="(item, index) in imgLists" :key="index">
			<image :src="item.url" :data-imgurl="item.url" @tap="showImgs" class="grace-add-list-img" :mode="imgMode"></image>
			<view class="grace-add-list-remove grace-icons icon-close" 
			:style="{color:closeBtnColor}" @tap.stop="removeImg" :id="'grace-items-img-'+index"></view>
			<view class="upload-progress">
			   <progress :percent="item.progress" 
			   :stroke-width="progressSize" :activeColor="progressColor" :backgroundColor="progressBGColor" />	
			</view>
			<view class="grace-add-list-reup" @tap.stop="retry" :data-index="index" v-if="item.error">
				<text class="grace-add-list-reup-icon grace-icons icon-retry"></text>
				<text class="grace-add-list-reup-text">失败重试</text>
			</view>
		</view>
		<view class="grace-add-list-items grace-add-list-btn" @tap="addImg" v-if="imgLists.length < maxFileNumber">
			<view class="grace-add-list-btn-icon">+</view>
			<view class="grace-add-list-btn-text">{{btnName}}</view>
		</view>
	</view>
</template>
<script>
var graceJS = require('@/Grace.JS/grace.js');
export default {
	props:{
		maxFileNumber : {
			type : Number,
			default : 9
		},
		btnName : {
			type : String,
			default : "添加照片"
		},
		items : {
			type : Array,
			default : function () {
				return [];
			}
		},
		closeBtnColor : {
			type : String,
			default : "#666666"
		},
		uploadServerUrl : {
			type : String,
			default : ''
		},
		progressSize :{
			type:Number,
			default:1
		},
		progressColor :{
			type:String,
			default:'#27BD81'
		},
		progressBGColor :{
			type:String,
			default:'#F8F8F8'
		},
		fileName : {type:String, default:'img'},
		formData : {type:Object, default:function(){return {};}},
		imgMode:{ type:String, default:'widthFix'},
		header:{type:Object, default:function(){return {};}},
		save2uniCloud:{type:Boolean, default:false}
	},
	data() {
		return {
			imgLists : [],
			updatting : false
		}
	},
	watch:{
		imgLists : function(newVal, oldVal){
			if(!this.updatting){this.$emit('change', newVal);}
		}
	},
    methods:{
		clearAllImgs : function(){
			this.imgLists = [];
		},
        addImg : function(){
            var num = this.maxFileNumber - this.imgLists.length;
            if(num < 1){return false;}
            //uni.showLoading({title:""});
            uni.chooseImage({
                count: num,
                sizeType: ['compressed'],
                success:(res) => {
					for(let i = 0; i < res.tempFilePaths.length; i++){
						this.imgLists.push({url : res.tempFilePaths[i], progress : 0, error : false});
					}
                },
				complete:function(){},
				fail:function(){}
            });
        },
        removeImg : function(e){
            var index = e.currentTarget.id.replace('grace-items-img-', '');
            var removeImg =  this.imgLists.splice(index, 1);
			this.$emit('removeImg', removeImg[0]);
        },
        showImgs : function(e){
            var currentImg = e.currentTarget.dataset.imgurl;
        	var imgs = [];
        	for(let i = 0; i < this.imgLists.length; i++){
        		imgs.push(this.imgLists[i].url);
        	}
            uni.previewImage({
              urls: imgs,
              current : currentImg
            })
        },
		upload : function(index){
			if(this.updatting){return ;}
			this.updatting = true;
			if(!index){index = 0;}
			uni.showLoading({title:"图片上传中" });
			if(this.save2uniCloud){
				this.upload2cloud(index);
			}else{
				this.uploadBase(index);
			}
		},
		upload2cloud:function (index) {
			// 全部上传完成
			if(index > (this.imgLists.length - 1)){
				uni.hideLoading();
				this.updatting = false;
				this.$emit('uploaded', this.imgLists);
				return ;
			}
			// 检查是否是默认值
			if(this.imgLists[index].progress >= 1){
				this.upload2cloud(index+1);
				return ;
			}
			this.imgLists[index].error = false;
			// 创建上传对象
			uniCloud.uploadFile({
				filePath  : this.imgLists[index].url,
				cloudPath : graceJS.uuid() + '.png',
				onUploadProgress:(progressEvent) => {
					var percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					this.imgLists[index].progress = percentCompleted;
					this.imgLists.splice(index, 1, this.imgLists[index]);
				},
				success : (uploadRes)=>{
					//上传图片成功
					this.imgLists[index].progress = 100;
					this.imgLists[index].url      = uploadRes.fileID;
					this.imgLists[index].result   = uploadRes;
					this.upload2cloud(index+1);
				},
				fail : ()=>{
					uni.showToast({title:"上传失败", icon:"none"});
					this.error(index);
				}
			});
		},
		retry : function (e) {
			var index = e.currentTarget.dataset.index;
			this.upload(index);
		},
		uploadBase : function (index) {
			// 全部上传完成
			if(index > (this.imgLists.length - 1)){
				uni.hideLoading();
				this.updatting = false;
				this.$emit('uploaded', this.imgLists);
				return ;
			}
			// 验证后端
			if(this.uploadServerUrl == ''){
				uni.showToast({title:"请设置上传服务器地址", icon:"none"});
				return ;
			}
			// 检查是否是默认值
			if(this.imgLists[index].progress >= 1){
				this.uploadBase(index+1);
				return ;
			}
			this.imgLists[index].error = false;
			// 创建上传对象
			const task = uni.uploadFile({
				url      : this.uploadServerUrl,
				filePath : this.imgLists[index].url,
				name     : this.fileName,
				formData : this.formData,
				header   : this.header,
				success  : (uploadRes) => {
					uploadRes = JSON.parse(uploadRes.data);
					if(uploadRes.status != 'ok'){
						uni.showToast({title:"上传失败 : "+uploadRes.data, icon:"none"});
						this.error(index);
					}else{
						//上传图片成功
						this.imgLists[index].progress = 100;
						this.imgLists[index].url      = uploadRes.data;
						this.imgLists[index].result   = uploadRes;
						this.uploadBase(index+1);
					}
				},
				fail    : (e) => {
					uni.showToast({title:"上传失败，请点击图片重试", icon:"none"});
					this.error(index);
					
				}
			});
			task.onProgressUpdate((res) => {
				if(res.progress > 0){
					this.imgLists[index].progress = res.progress;
					this.imgLists.splice(index, 1, this.imgLists[index]);
				}
			});
		},
		// 上传错误
		error : function(index){
			this.updatting = false;
			setTimeout(()=>{
				this.imgLists[index].progress = 0;
				this.imgLists[index].error    = true;
				this.$emit('uploaderror');
			}, 500);
		},
		// 设置默认值
		setItems : function(items){
			this.imgLists = [];
			for(let i = 0; i < items.length; i++){
				this.imgLists.push({url : items[i], progress : 100});
			}
		}
    }
}
</script>
<style scoped>
.grace-add-list{display:flex; flex-wrap:wrap;}
.grace-add-list-btn{display:flex; flex-direction:column; align-items:center; justify-content:center;}
.grace-add-list-btn-text{font-size:26rpx; line-height:36rpx; text-align:center; color:#999999; width:100%;}
.grace-add-list-btn-icon{font-size:80rpx; height:80rpx; line-height:80rpx; margin-bottom:20rpx; color:#999999;}
.grace-add-list-items{width:222rpx; height:222rpx; overflow:hidden; margin-bottom:10rpx; margin-right:11rpx; background:#F6F7F8; font-size:0; position:relative; border-radius:10rpx;}
.grace-add-list-image{width:222rpx;}
.grace-add-list-remove{width:50rpx; height:50rpx; line-height:50rpx; text-align:center; font-size:40rpx; position:absolute; z-index:5; right:10rpx; top:10rpx; color:#888888;}
.upload-progress{position:absolute; z-index:2; left:0; bottom:10rpx; width:180rpx; padding:0 21rpx;}
.grace-add-list-reup{position:absolute; z-index:3; left:0; top:0rpx; width:222rpx; height:222rpx; display:flex; justify-content:center; align-items:center; background-color:rgba(0,0,0,0.3);flex-direction:column;}
.grace-add-list-reup-icon{text-align:center; width:100%; color:#FFFFFF; display:block; font-size:80rpx; line-height:100rpx;}
.grace-add-list-reup-text{text-align:center; width:100%; color:#FFFFFF; display:block; font-size:20rpx; line-height:30rpx;}
.grace-add-list-img{width:222rpx;}
</style>