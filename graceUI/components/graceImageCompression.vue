<template>
	<view>
		<canvas canvas-id="graceCanvas" id="graceCanvas" :style="{width:width+'px', height:height+'px'}"></canvas>
	</view>
</template>
<script>
export default{
	data() {
		return {
			width    : 700,
			height   : 500,
			imgFiles : [],
			resImgs  : []
		}
	},
	methods:{
		compress : function (imgFiles, width){
			this.width    = width;
			this.imgFiles = imgFiles;
			this.resImgs  = [];
			this.compressBase(0);
		},
		compressBase : function (index) {
			// 获取图片高度
			uni.getImageInfo({
				src:this.imgFiles[index],
				success: (e)=>{
					// 计算出压缩图片的宽度和高度
					this.height = ( this.width / e.width ) * e.height;
					// 初始化画布
					const ctx = uni.createCanvasContext('graceCanvas', this)
					ctx.drawImage(this.imgFiles[index], 0, 0, this.width, this.height);
					ctx.draw(true, ()=>{
						uni.canvasToTempFilePath({
							x         : 0,
							y         : 0,
							width     : this.width,
							height    : this.height,
							destWidth : this.width,
							destHeight: this.width,
							canvasId: 'graceCanvas',
							success:(res)=>{
								// 在H5平台下，tempFilePath 为 base64
								console.log(res.tempFilePath)
								//this.resImgs[index] = img;
							}
						})
					});
					
				},
				fail: () => {
					this.resImgs[index] = img;
				}
			})
		}
	}
}
</script>
<style>
.graceImgCompression{width:700rpx; height:500rpx; overflow:hidden;}
</style>