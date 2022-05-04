<template>
    <view>
        <web-view :src=url>
			
		</web-view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad: function(params) {
			var url = params.url;
			this.url = url;
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
