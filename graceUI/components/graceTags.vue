<template>
	<view class="gui-tags">
		<view class="gui-tags-item" v-for="(item, index) in items" :key="index" @tap="removeTag(index)" 
		:style="{background:bgColor, borderRadius:borderRadius, marginRight:margin+'rpx', marginBottom:margin+'rpx'}">
			<text class="grace-icons gui-tags-remove" :style="{fontSize:fontSize+'rpx', lineHeight:(fontSize*1.5)+'rpx', color:color}">{{item}}</text>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		fontSize:{type:Number, default:26},
		color:{type:String, default:'#333333'},
		bgColor:{type:String, default:'#F6F7F8'},
		borderRadius:{type:String, default:'6rpx'},
		items:{type:Array, default:function(){return [];}},
		margin:{type:Number, default:20}
	},
	data() {
		return {}
	},
	methods:{
		removeTag : function (index) {
			this.$emit('removeTag', index);
		}
	}
}
</script>
<style scoped>
.gui-tags{display:flex; flex-direction:row; flex-wrap:wrap;}
.gui-tags-item{padding:12rpx 20rpx; line-height:38rpx; font-size:26rpx; position:relative;}
.gui-tags-remove:after{content:"\e610"; padding-left:15rpx;}
</style>
