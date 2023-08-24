<template name="graceSup">
	<view class="grace-sup">
		<view class="text" 
			:style="{'font-size':textSize, 'color':textColor,'font-weight':isBold ? '700' : '400'}">
			{{text}}
		</view>
		<view class="sup" 
		:style="{'font-size':supSize, 'line-height':supSize, 'color':supColor}">{{sup}}</view>
	</view>
</template>
<script>
	export default {
		props: {
			text:{
				type : String,
				default : "..."
			},
			textSize : {
				type : String,
				default : "30upx"
			},
			textColor : {
				type : String,
				default : "#0E151D"
			},
			sup:{
				type : String,
				default : "..."
			},
			supSize : {
				type : String,
				default : "22upx"
			},
			supColor : {
				type : String,
				default : "#A5A7B2"
			},
			isBold:{
				type : Boolean,
				default : false
			}
		}
	}
</script>
<style scoped>
.grace-sup{padding:0; display:flex; flex-wrap:nowrap; align-items:flex-start;}
.grace-sup .text{font-size:32upx; line-height:56upx;}
.grace-sup .sup{font-size:26upx; line-height:26upx; margin-left:10upx; margin-top:6upx;}
</style>
