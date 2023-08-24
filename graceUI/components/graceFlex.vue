<template>
	<view :class="['gui-flex', classesToUse]"><slot></slot></view>
</template>
<script>
export default{
	props:{
		classes : {
			type : Array,
			default : function(){
				return new Array()
			}
		}
	},
	data() {
		return {classesToUse: ''}
	},
	watch:{
		classes : function(val){this.classesToUse = this.classes.join(' ');}
	},
	created:function(){
		this.classesToUse = this.classes.join(' ');
	}
}
</script>
<style scoped>
.gui-flex{display:flex;}
.row{flex-direction:row;}
.column{flex-direction:column;}
.wrap{flex-direction:row; flex-wrap:wrap;}
.nowrap{flex-direction:row; flex-wrap:nowrap;}
.space-between{flex-direction:row; justify-content:space-between;}
.left{justify-content:flex-start;}
.right{justify-content:flex-end;}
.xcenter{justify-content:center;}
.xreverse{flex-direction:row-reverse;}
.top{align-items:flex-start;}
.ycenter{align-items:center;}
.bottom{align-items:flex-end;}
</style>