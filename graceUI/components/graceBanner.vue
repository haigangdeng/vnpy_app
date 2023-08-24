<template name="graceBanner">
	<view style="margin-top:20px;">
		<grace-sup text="graceui" textColor="#A5A7B2" textSize="24px"  sup="2.0" supSize="14px" :isBold="true"></grace-sup>
		<view class="grace-banner">
			<view class="logo">
				<image src="https://graceui.oss-cn-beijing.aliyuncs.com/logo.png" mode="widthFix"></image>
			</view>
			<view class="body">
				<view class="title">{{title}}</view>
				<view class="desc">{{desc}}</view>
			</view>
		</view>
	</view>
</template>
<script>
import graceSup from './graceSup.vue';
export default {
	components:{
		'grace-sup' : graceSup
	},
	props: {
		title:{
			type : String,
			default : "..."
		},
		desc:{
			type : String,
			default : "再出发 更轻快 更漂亮 更丰富"
		},
	}
}
</script>
<style scoped>
.grace-banner{display:flex; flex-wrap:nowrap; justify-content:center; background:#FFFFFF; padding:30upx; box-shadow:0px 0px 8px #D5D6D8; margin-top:20px; border-radius:8px;}
.grace-banner .logo{width:100upx; height:100upx; margin-right:30upx; font-size:0;}
.grace-banner .logo image{width:100upx; height:100upx;}
.grace-banner .body{width:auto; display:inline-block; margin-right:30px;}
.grace-banner .body .title{font-size:32upx; font-weight:700; color:#3688FF; line-height:1.5em;}
.grace-banner .body .desc{font-size:22upx; color:#A5A7B2; line-height:1.5em; margin-top:5px;}
</style>
