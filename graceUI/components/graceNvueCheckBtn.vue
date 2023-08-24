<template>
	<view class="grace-nowrap grace-flex-vcenter" @tap.stop="changeStatus">
		<text v-if="status" class="grace-check-btn grace-icons" :style="{fontSize:size+'rpx', lineHeight:size+'rpx', color : checkedColor}">&#xe7f8;</text>
		<text v-else class="grace-check-btn grace-icons" :style="{fontSize:size+'rpx', lineHeight:size+'rpx', color : color}">&#xe762;</text>
		<view class="grace-check-lable"><slot></slot></view>
	</view>
</template>
<script>
export default {
	props: {
		size : {
			type : Number,
			default : 38
		},
		color : {
			type : String,
			default : '#EEEEEE'
		},
		checked : {
			type : Boolean,
			default : false
		},
		checkedColor : {
			type : String,
			default : '#FF0036'
		},
		parameter : {
			type : Array,
			default : function () {
				return []
			}
		}
	},
	data() {
		return {
			status : false
		}
	},
	watch: {
		checked : function (val, old) {
			this.status = val;
		}
	},
	created : function(){
		this.status = this.checked;
	},
	methods:{
		changeStatus : function(){
			this.status = !this.status;
			this.$emit('change', [this.status, this.parameter]);
		}
	}
}
</script>
<style scoped>
.grace-check-btn{color:#999999;}
.grace-check-lable{color:#555555; margin-left:20rpx; font-size:26rpx; width:700rpx; flex:1;}
</style>