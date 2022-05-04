<template>
	<text class="grace-totop grace-icons" v-if="show" @tap="totop" :style="{bottom:bottom, backgroundColor:background,color:color}">&#xe637;</text>
</template>
<script>
export default{
	props:{
		top : {
			type : Number,
			default : 0
		},
		color : {
			type : String,
			default : "#3688FF"
		},
		bottom : {
			type : String,
			default : "80rpx"
		},
		background:{
			type : String,
			default : "#FFFFFF"
		}
	},
	data() {
		return {
			show : false,
			timer : null
		}
	},
	watch:{
		top : function(topVal){
			if(this.timer != null){clearTimeout(this.timer);}
			this.timer = setTimeout(function(){
				if(topVal > 100){
					this.show = true;
				}else{
					this.show = false;
				}
			}.bind(this), 80);
		}
	},
	methods:{
		totop : function(){
			this.$emit('totop');
		}
	}
}
</script>
<style scoped>
.grace-totop{width:40px; height:40px; line-height:40px; background-color:#FFFFFF; color:#3688FF; position:fixed; bottom:80px; z-index:9999; right:15px; border-radius:5px; text-align:center;}
</style>