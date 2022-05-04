<template>
	<view class="select-list">
		<view v-for="(item, index) in dataIn" :key="index" class="select-list-item" :data-index="index" @tap.stop="choose">
			<image :src="item.img" class="select-list-img" v-if="item.img" mode="widthFix" 
			:style="{width:imgSize[0], height:imgSize[1], borderRadius:imgBorderRadius}"></image>
			<view class="select-list-body" :class="[isBorder?'grace-border-b':'']" 
			:style="{borderBottomColor:borderColor}">
				<view class="select-list-content">
					<text :style="{fontSize:fontSize, lineHeight:lineHeight, color:itemColor}">{{item.title}}</text>
					<text class="select-list-desc" v-if="item.desc">{{item.desc}}</text>
				</view>
				<text class="select-list-icon grace-icons" v-if="item.checked" :style="{color:item.checked ? checkColor : '#A5A7B2'}">&#xe60f;</text>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	props:{
		lists : {type:Array, default:function(){return [];}},
		checkColor:{type:String, default:"#3688FF"},
		type : { type: String, default: "radio"},
		imgSize:{type:Array, default:function(){return ['68rpx','68rpx'];}},
		imgBorderRadius:{type: String, default: "60rpx"},
		fontSize:{type: String, default: "28rpx"},
		isBorder:{type:Boolean, default:true},
		lineHeight:{type: String, default: "50rpx"},
		itemColor:{type:String, default:"#323232"},
		borderColor:{type:String, default:"#F6F6F6"},
		maxSize:{type:Number,default:0}
	},
	data() {
		return {
			dataIn: []
		}
	},
	created:function(){
		this.dataIn = this.lists;
	},
	watch:{
		lists:function(val){
			this.dataIn = val;
		}
	},
	methods:{
		choose:function(e){
			var index = e.currentTarget.dataset.index;
			if(this.type == 'radio'){
				if(this.dataIn[index].checked){
					this.dataIn[index].checked = false;
					this.$emit('change', -1);
				}else{
					for(let i = 0; i < this.dataIn.length; i++){
						this.dataIn[i].checked = false;
					}
					this.dataIn[index].checked = true;
					this.$emit('change', index);
				}
			}else{
				if(this.dataIn[index].checked){
					this.dataIn[index].checked = false;
				}else{
					if(this.maxSize > 0){
						var size = 0;
						this.dataIn.forEach((item)=>{
							if(item.checked){size++;}
						});
						size++;
						if(size > this.maxSize){this.$emit('maxSed'); return ;}
					}
					this.dataIn[index].checked = true;
				}
				var sedArr = [];
				for(let i = 0; i < this.dataIn.length; i++){
					if(this.dataIn[i].checked){
						sedArr.push(i);
					}
				}
				this.$emit('change', sedArr);
			}
		}
	}
}
</script>
<style scoped>
.select-list{}
.select-list-item{flex-direction:row; flex-wrap:nowrap; align-items:center; font-size:0;}
.select-list-icon{width:60rpx; line-height:60rpx; text-align:center; font-size:36rpx; color:#A5A7B2; font-weight:700; margin-left:28rpx;}
.select-list-img{border-radius:60rpx; margin-right:28rpx;}
.select-list-body{width:300rpx; flex:1; flex-wrap:nowrap; flex-direction:row; align-items:center;}
.select-list-content{width:200rpx; flex:1; overflow:hidden; margin-top:25rpx; margin-bottom:25rpx;}
.select-list-desc{font-size:22rpx; color:#828282; line-height:40rpx;}
</style>