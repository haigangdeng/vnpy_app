<template name="graceStart">
	<view class="grace-stars">
	  <view 
		class="grace-stars-items" v-for="(item, index) in totalstars" 
		:key="index" 
		@tap="changnum" 
		:data-val="index">
			<view class="grace-star-icon" :style="{'color': activecolor, 'font-size' : fontSize}" v-if="starnum > index"></view>
			<view class="grace-star-icon" :style="{'color': color, 'font-size' : fontSize}" v-else></view>
		</view>
	</view>
</template>
<script>
export default {
	name: "graceStart",
	props:{
		fontSize : {
			type : String,
			default : '50rpx'
		},
		totalstars : {
		  type : Number,
		  default : 5
		},
		starnum : {
		  type : Number,
		  default : 0
		},
		color : {
			type : String,
			default : '#E1E1E1'
		},
		activecolor :{
			type : String,
			default : '#F5C359'
		},
		cantap : {
		  type : Boolean,
		  default : true
		}
	},
	methods: {
		changnum : function(e){
			if (!this.cantap){return ;}
			var val = Number(e.currentTarget.dataset.val);
			this.$emit("starchange", Number(val + 1));
		}
	}
}
</script>
<style scoped>
.grace-stars{display:flex; flex-wrap:nowrap;}
.grace-stars-items{display:inline-block; text-align:center;}
.grace-star-icon{font-family:"grace-iconfont" !important; font-size:60rpx; font-style:normal;}
.grace-star-icon:before{content:"\e634";}
</style>