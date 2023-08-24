<template>
	<view class="grace-select-tags">
		<text class="grace-select-tag" 
		:style="{
			width : itemWidth, 'background-color' : item.checked ? selectedColor : bgColor, 
			fontSize:fontSize, borderRadius:borderRadius, height:height, lineHeight:height, 
			color : item.checked ? fontActiveColor : fontColor
		}" 
		@tap.stop="graceSelectChange(index)" v-for="(item, index) in tagsData" :key="index">{{item.name}}</text>
	</view>
</template>
<script>
export default {
	props: {
		itemWidth : {type: String, default:"200rpx"},
		type : { type: String, default: ""},
		selectedColor : { type: String, default: "#3688FF"},
		fontSize : { type: String, default: "26rpx"},
		items : { type: Array, default : function(){return []}},
		datas : { type: Array, default : function(){return []}},
		bgColor :  { type: String, default: "#F6F7F8"},
		height:{type: String, default:"68rpx"},
		borderRadius : {type: String, default:"10rpx"},
		fontColor:{type: String, default:"#323232"},
		fontActiveColor:{type: String, default:"#FFFFFF"}
	},
	created : function(){
		this.tagsData = this.items == null ? [] : this.items;
		this.initChange();
	},
	data() {
		return {
			tagsData : []
		}
	},
	watch:{
		items:function(val){
			this.tagsData = val;
			this.initChange();
		}
	},
	methods:{
		initChange : function () {
			if(this.type == 'radio'){
				var selectIndex = -1;
				var selectVal   = '';
				for (var i = 0; i < this.tagsData.length; i++){
					if(this.tagsData[i].checked){
						selectIndex = i;
						selectVal   = this.tagsData[i].value;
					}
				}
				//this.$emit("change", selectVal, this.datas, selectIndex);
			}else{
				var sedRes = [], indexs = [];
				for (var i = 0; i < this.tagsData.length; i++){
					if(this.tagsData[i].checked){
						sedRes.push(this.tagsData[i].value);
						indexs.push(i);
					}
				}
				//this.$emit("change", sedRes, this.datas, indexs);
			}
		},
		graceSelectChange : function(index){
			// 单选
			if(this.type == 'radio'){
				for (var i = 0; i < this.tagsData.length; i++){
					this.tagsData[i].checked = false;
					this.tagsData.splice(i,1,this.tagsData[i]);
				}
				this.tagsData[index].checked = true;
				this.tagsData.splice(index,1,this.tagsData[index]);
				this.$emit("change", this.tagsData[index].value, this.datas, index);
			}
			//  多选
			else{
				if(this.tagsData[index].checked){
					this.tagsData[index].checked = false;
				}else{
					this.tagsData[index].checked = true;
				}
				this.tagsData.splice(index,1,this.tagsData[index]);
				var sedRes = [], indexs = [];
				for (var i = 0; i < this.tagsData.length; i++){
					if(this.tagsData[i].checked){
						sedRes.push(this.tagsData[i].value);
						indexs.push(i);
					}
				}
				this.$emit("change", sedRes, this.datas, indexs);
			}
		},
		// 设置新的选项
		setItems : function(items){
			this.tagsData = items;
			this.initChange();
		},
		// 全不选
		clearSelected:function(){
			var newData = [];
			for(let i = 0; i < this.tagsData.length; i++){
				this.tagsData[i].checked = false;
				newData.push(this.tagsData[i]);
			}
			this.tagsData = newData;
			if(this.type == 'radio'){
				this.$emit("change", '', this.datas, -1);
			}else{
				this.$emit("change", [], this.datas, []);
			}
		},
		// 全选
		selectAll : function () {
			if(this.type == 'radio'){return ;}
			var newData = [],reDatas = [], reIndex = [];
			for(let i = 0; i < this.tagsData.length; i++){
				this.tagsData[i].checked = true;
				newData.push(this.tagsData[i]);
				reDatas.push(this.tagsData[i].value);
				reIndex.push(i);
			}
			this.tagsData = newData;
			this.$emit("change", reDatas, this.datas, reIndex);
		}
	}
}
</script>
<style scoped>
.grace-select-tags{padding:0; flex-direction:row; flex-wrap:wrap;}
.grace-select-tag{height:68rpx; line-height:68rpx; text-align:center; margin:10rpx; padding-left:15rpx; padding-right:15rpx; font-size:26rpx; border-radius:8rpx;}
</style>