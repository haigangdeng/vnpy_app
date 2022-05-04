<template>
	<view class="grace-nowrap grace-flex-vcenter" :style="{width:width}" @tap.stop="changeStatus">
		<view 
		:class="['grace-check-btn grace-icons', status ? 'grace-check-checked' : '']" 
		:style="{fontSize:size+'rpx', lineHeight:size+'rpx', color : status ? checkedColor : color}"></view>
		<view class="grace-check-lable"><slot></slot></view>
	</view>
</template>
<script>
export default {
	props: {
		width:{
			type:String,
			default:'100%'
		},
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
.grace-check-btn{color:#999999; flex-shrink:0;}
.grace-check-btn:after{content:"\e762";}
.grace-check-checked:after{content:"\e7f8";}
.grace-check-lable{color:#555555; margin-left:20rpx; font-size:26rpx; width:700rpx;}
</style>