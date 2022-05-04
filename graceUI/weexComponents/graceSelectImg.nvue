<template>
	<view class="grace-add-list">
		<view class="grace-add-list-items" v-for="(item, index) in imgLists" :key="index">
			<image :src="item.url" :data-imgurl="item.url" @tap="showImgs" class="grace-add-list-img" :mode="imgMode"></image>
			<text class="grace-add-list-remove grace-icons" @tap="removeImg" :id="'grace-items-img-'+index" :style="{color:closeBtnColor}">&#xe632;</text>
		</view>
		<view class="grace-add-list-items grace-add-list-btn" @tap="addImg" v-if="imgLists.length < maxFileNumber">
			<text class="grace-add-list-btn-icon">+</text>
			<text class="grace-add-list-btn-text">{{btnName}}</text>
		</view>
	</view>
</template>
<script>
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
		imgMode:{
			type:String,
			default:'widthFix'
		}
	},
	data() {
		return {
			imgLists : []
		}
	},
	created:function () {
		this.initImgs();
	},
	watch:{
		items:function(){this.initImgs();}
	},
    methods:{
		initImgs : function(){
			var imgs = [];
			for(let i = 0; i < this.items.length; i++){
				imgs.push({url:this.items[i],  progress : 100});
			}
			this.imgLists = imgs;
		},
        addImg : function(){
            var num = this.maxFileNumber - this.imgLists.length;
            if(num < 1){return false;}
            uni.chooseImage({
                count: num,
                sizeType: ['compressed'],
                success:(res) => {
					for(let i = 0; i < res.tempFilePaths.length; i++){
						this.imgLists.push({url:res.tempFilePaths[i], progress:0})
					}
                    this.$emit('change', this.imgLists);
                },
				fail:function(){
					//uni.hideLoading();
				}
            });
        },
        removeImg : function(e){
            var index = e.currentTarget.id.replace('grace-items-img-', '');
			var removeImg =  this.imgLists.splice(index, 1);
			this.$emit('removeImg', removeImg[0]);
			this.$emit('change', this.imgLists);
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
.grace-add-list{flex-wrap:wrap; flex-direction:row;}
.grace-add-list-btn{flex-direction:column; align-items:center; justify-content:center;}
.grace-add-list-btn-text{font-size:26rpx; line-height:36rpx; text-align:center; color:#999999;}
.grace-add-list-btn-icon{font-size:70rpx; height:80rpx; line-height:80rpx; color:#999999;}
.grace-add-list-items{width:222rpx; height:222rpx; overflow:hidden; margin-bottom:12rpx; margin-right:11rpx; background-color:#F6F7F8; font-size:0; border-radius:10rpx;}
.grace-add-list-image{width:222rpx; height:222rpx;}
.grace-add-list-remove{width:50rpx; height:50rpx; line-height:50rpx; text-align:center; font-size:40rpx; position:absolute; right:0; bottom:0; color:#888888;}
.grace-add-list-img{width:222rpx; height:222rpx;}
</style>