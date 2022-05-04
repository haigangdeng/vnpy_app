<template>
	<view class="grace-select-tags">
		<view class="grace-select-tag"  v-for="(item, index) in tagsData" :key="index" 
		:style="{
			width : itemWidth, 'background' : item.checked ? selectedColor : bgColor, fontSize:fontSize, 
			height:height, lineHeight:height, borderRadius:borderRadius,  color : item.checked ? fontActiveColor : fontColor
		}" 
		@tap.stop="graceSelectChange(index)">{{item.name}}</view>
	</view>
</template>
<script>
export default{
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
		this.tagsData = this.items == null ? JSON.stringify([]) : JSON.stringify(this.items);
		this.tagsData = JSON.parse(this.tagsData);
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
			}else{
				var sedRes = [], indexs = [];
				for (var i = 0; i < this.tagsData.length; i++){
					if(this.tagsData[i].checked){
						sedRes.push(this.tagsData[i].value);
						indexs.push(i);
					}
				}
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
				this.tagsData.splice(index, 1,this.tagsData[index]);
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
.grace-select-tags{display:flex; flex-direction:row; flex-wrap:wrap; width:100%; overflow:hidden;}
.grace-select-tag{height:68rpx; line-height:68rpx; overflow:hidden; box-sizing:border-box; padding-left:15rpx; padding-right:15rpx; text-align:center; margin:10rpx; font-size:24rpx; border-radius:8rpx;}
</style>