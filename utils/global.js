
var appKey = "Tony";
var appSecret = "Tony";

function getUserInfo() {
	var userInfo = uni.getStorageSync("currentUserInfo");
	if (userInfo != null && userInfo != "" && typeof userInfo != undefined) {
		if (userInfo.expiredDate > new Date()) {
			return userInfo;
		} else {
			uni.removeStorageSync("currentUserInfo");
			return null;
		}
	} else {
		return null;
	}
}

export default {
	appKey,
	appSecret,
	getServerUrl,
	getUserInfo
}
