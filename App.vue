<script>
var graceJS = require('@/Grace.JS/grace.js');
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		//判断当前版本
		// #ifdef APP-PLUS
		var plantForm = '';
		uni.getSystemInfo({
			success: (res) => {
				// console.log(res.platform);
				if (res.platform == "android") {
					plantForm = 'android'
				} else if (res.platform == "ios") {
					plantForm = 'ios'
				} else {
					plantForm = 'miniprogram'
				}
			}
		})
		
		var me = this;
		var serverUrl = me.getServerUrl();

		// #endif
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import url('./graceUI/graceUI.css');
@import url('./graceUI/graceIcons.css');
/* @import url('./common/uni.css'); */
@import url('./common/common.css');
@import url('./graceUI/graceUI2.2.css');

/* @import './graceUI/graceUI.css';
@import './graceUI/graceIcons.css'; */
</style>
