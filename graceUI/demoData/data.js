var products = [
	{
		"img": "https://img.alicdn.com/tfs/TB1Q2Org4rI8KJjy0FpXXb5hVXa-468-1236.jpg",
		"title": "精品女装 限时出售",
		"price": "￥99.88",
		"tip": "HOT"
	},
	{
		"img": "https://img.alicdn.com/bao/uploaded/i1/2146742267/O1CN011ScKLXPJaX9UQyq_!!0-item_pic.jpg",
		"title": "女装特价",
		"price": "￥16.99",
		"tip": "名牌"
	},
	{
		"img": "https://img.alicdn.com/tps/i4/TB1q42TjMTqK1RjSZPhSutfOFXa.jpg",
		"title": "千元手机爆款",
		"price": "￥999.99",
		"tip": "推荐"
	},
	{
		"img": "https://img.alicdn.com/tps/i4/TB1bhT6kr2pK1RjSZFswu1NlXXa.png",
		"title": "进口儿童座椅",
		"price": "￥698.99",
		"tip": "进口"
	},
	{
		"img": "https://img.alicdn.com/bao/uploaded/i1/2787417447/O1CN0124sly8iXb80L4OS_!!0-item_pic.jpg",
		"title": "品牌T恤",
		"price": "￥22.99",
		"tip": "nike"
	},
	{
		"img": "https://img.alicdn.com/tfs/TB13FixCeuSBuNjy1XcXXcYjFXa-468-1236.jpg",
		"title": "好吃坚果",
		"price": "￥55.99",
		"tip": "吃货"
	},
	{
		"img": "https://img.alicdn.com/bao/uploaded/i2/452325706/O1CN011s1OQAszoPWK8Rt_!!0-item_pic.jpg",
		"title": "进口化妆品特价",
		"price": "￥22.99",
		"tip": "热卖"
	},
	{
		"img": "https://img.alicdn.com/tps/i4/TB1bhT6kr2pK1RjSZFswu1NlXXa.png",
		"title": "进口儿童座椅",
		"price": "￥698.99",
		"tip": "进口"
	}
];

var getArrRandomly = function (arr) {
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		var randomIndex = Math.floor(Math.random() * (len - i));
		var itemAtIndex = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = itemAtIndex;
	}
	return arr;
}
module.exports  = {
	products : products,
	getArrRandomly : getArrRandomly
} 
