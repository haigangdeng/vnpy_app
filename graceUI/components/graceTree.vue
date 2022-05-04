<template>
	<view>
		<view v-for="(tree,index) in treesIN" :key="index">
			<view class="grace-tree" :data-havsons="tree.children" :data-treeindexs="indexesIn" :data-index="index" :data-treelevel="level" 
			:style="{paddingLeft:(indent*level)+'rpx'}" @tap.stop="taped" :data-cancheck="(allCanCheck || !tree.children)">
				<view class="grace-tree-icons" v-if="type == 'text' && isIcon" style="width:22rpx;">
					<text class="grace-tree-icons-text grace-icons icon-line" v-if="tree.children"></text>
				</view>
				<view class="grace-tree-icons" v-if="type == 'radio' && (allCanCheck || !tree.children)">
					<text class="grace-tree-icons-text grace-icons icon-radio-ckd" :style="{color:checkedColor, fontSize:iconSize}" v-if="tree.id == checkedId"></text>
					<text class="grace-tree-icons-text grace-icons icon-radio" :style="{fontSize:iconSize}" v-else></text>
				</view>
				<view class="grace-tree-icons" v-if="type == 'checkbox' && (allCanCheck || !tree.children)">
					<text class="grace-tree-icons-text grace-icons icon-checkbox-ckd" :style="{color:checkedColor, fontSize:iconSize}" v-if="isChecked(tree.id)"></text>
					<text class="grace-tree-icons-text grace-icons icon-checkbox" :style="{fontSize:iconSize}" v-else></text>
				</view>
				<text class="grace-tree-label" :style="{lineHeight:lineHeight,fontSize:fontSize, color:fontColor}">{{tree.label}}</text>
			</view>
			<view>
				<graceTree v-if="!fold" 
				:trees="tree.children" :indent="indent" :level="level+1" :lineHeight="lineHeight" :allCanCheck="allCanCheck" :iconSize="iconSize" 
				:fontSize="fontSize" :fontColor="fontColor" :isIcon="isIcon" :checkedId="checkedId" :checkedIds="checkedIds" 
				:type="type" :indexes="[indexesIn,index]" @taped="tapbase"></graceTree>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	name:"graceTree",
	props:{
		trees : {type:Array, default:function () {return [];}},
		indent : {type:Number, default:28},
		level  : {type:Number, default:0},
		lineHeight  : {type:String, default:'80rpx'},
		fontSize  : {type:String, default:'28rpx'},
		fontColor : {type:String, default:'#323232'},
		type : {type:String, default:'text'},
		isIcon : {type:Boolean, default:true},
		iconSize:{type:String, default:'30rpx'},
		indexes : {type:Array, default:function () {return ['',0];}},
		checkedId : {type:[String, Number], default:'-1'},
		checkedIds : {type:Array, default:function () {return [];}},
		checkedColor:{type:String, default:'#3688FF'},
		allCanCheck: {type:Boolean, default:true},
		isFold : {type:Boolean, default:true}
	},
	data() {
		return {
			treesIN:[],
			indexesIn : [],
			fold:false
		}
	},
	created:function(){
		this.treesIN = this.trees;
		if(this.indexes[0] != ''){
			var indexes  =  this.indexes[0].split(',');
		}else{
			var indexes = [];
		}
		indexes.push(this.indexes[1]);
		this.indexesIn = indexes.join(',');
	},
	methods:{
		taped : function(e){
			var havsons       = e.currentTarget.dataset.havsons;
			var treeindexs = e.currentTarget.dataset.treeindexs;
			treeindexs = treeindexs.split(',');
			var index      = e.currentTarget.dataset.index;
			treeindexs.push(index);
			treeindexs.shift();
			if(this.type == 'text'){
				if(this.isFold){
					if(havsons){this.fold = !this.fold; return;}
				}
				this.tapbase(treeindexs);
			}else{
				var cancheck = e.currentTarget.dataset.cancheck;
				if(cancheck){this.tapbase(treeindexs);}
			}
			
		},
		tapbase : function(e){
			this.$emit('taped', e);
		},
		setTrees : function (trees) {
			this.treesIN = trees;
		},
		isChecked : function(checkedId){
			for(let i = 0; i < this.checkedIds.length; i++){
				if(this.checkedIds[i] == checkedId){
					return true;
				}
			}
			return false;
		},
		foldIt : function(){
			this.fold = !this.fold;
		}
	}
}
</script>
<style scoped>
.grace-tree{display:flex; flex-direction:row; flex-wrap:nowrap; align-items:center;}
.grace-tree-label{display:block;}
.grace-tree-icons{padding-right:16rpx;}
.grace-tree-icons-text{font-size:22rpx; color:#828282;}
</style>