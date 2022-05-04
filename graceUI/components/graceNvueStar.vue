<template name="graceStart">
	<view class="grace-stars">
	  <view 
		class="grace-stars-items" v-for="(item, index) in totalstars" 
		:key="index" 
		@tap="changnum" 
		:data-val="index">
			<text class="grace-icons" :style="{'color': activecolor, 'font-size' : fontSize}" v-if="starnum > index">&#xe634;</text>
			<text class="grace-icons" :style="{'color': color, 'font-size' : fontSize}" v-else>&#xe634;</text>
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
.grace-stars{flex-wrap:nowrap; flex-direction:row;}
.grace-stars-items{text-align:center;}
</style>