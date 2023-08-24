<template>
	<view :class="classes"><slot></slot></view>
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
	}
}
</script>
<style scoped>
.row{flex-direction:row;}
.column{flex-direction:column;}
.wrap{flex-direction:row; flex-wrap:wrap;}
.xreverse{flex-direction:row-reverse;}
.nowrap{flex-direction:row; flex-wrap:nowrap;}
.space-between{flex-direction:row; justify-content:space-between;}
.left{justify-content:flex-start;}
.right{justify-content:flex-end;}
.xcenter{justify-content:center;}
.top{align-items:flex-start;}
.ycenter{align-items:center;}
.bottom{align-items:flex-end;}
</style>