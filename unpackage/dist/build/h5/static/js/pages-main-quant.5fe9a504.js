(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-main-quant"],{5031:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return r})),a.d(t,"a",(function(){return n}));var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("gracePage",{attrs:{customHeader:!1,isLoading:e.pageLoading}},[a("v-uni-view",{staticClass:"grace-body",attrs:{slot:"gBody"},slot:"gBody"},[a("v-uni-view",{staticClass:"grace-margin-top"},[e._v("当前服务器："+e._s(e.serverUrl))]),a("v-uni-view",{staticClass:"ucenter-line"}),a("v-uni-view",{staticClass:"grace-nowrap"},[a("v-uni-view",{staticClass:"icons grace-icons icon-set grace-yellow grace-title"}),a("v-uni-view",{staticClass:"grace-title current-project"},[e._v("当前代码：")]),a("v-uni-picker",{attrs:{mode:"selector",range:e.symbolList,"range-key":"symbol",name:"symbol"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeSymbol.apply(void 0,arguments)}},model:{value:e.symbolIndex,callback:function(t){e.symbolIndex=t},expression:"symbolIndex"}},[a("v-uni-view",{staticClass:"grace-space-between grace-title"},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.currentSymbolInfo.gateway_name)+" - "+e._s(e.currentSymbolInfo.exchange)+" - "+e._s(e.currentSymbolInfo.symbol)+" - "+e._s(e.currentSymbolInfo.name))]),a("v-uni-view",{staticClass:"grace-icons icon-arrow-down"})],1)],1)],1),a("v-uni-view",{staticClass:"ucenter-line"}),e.tickShow?a("v-uni-view",[a("v-uni-view",{staticClass:"grace-table"},[a("v-uni-view",{staticClass:"grace-theader grace-bg-blue grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-bold"},[e._v("价格")]),a("v-uni-text",{staticClass:"grace-td grace-bold"},[e._v("数量")])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-red"},[e._v(e._s(e.currentSymbolInfo.ask_price_5))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.ask_volume_5))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-red"},[e._v(e._s(e.currentSymbolInfo.ask_price_4))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.ask_volume_4))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-red"},[e._v(e._s(e.currentSymbolInfo.ask_price_3))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.ask_volume_3))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-red"},[e._v(e._s(e.currentSymbolInfo.ask_price_2))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.ask_volume_2))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-red"},[e._v(e._s(e.currentSymbolInfo.ask_price_1))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.ask_volume_1))])],1)],1),a("v-uni-view",{staticClass:"grace-table grace-nowrap grace-flex-center"},[a("v-uni-view",{staticClass:"grace-tbody"},[a("v-uni-text",{staticClass:"grace-td"},[e._v(e._s(e.currentSymbolInfo.last_price))])],1)],1),a("v-uni-view",{staticClass:"grace-table"},[a("v-uni-text",{staticClass:"grace-td "}),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-green"},[e._v(e._s(e.currentSymbolInfo.bid_price_1))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.bid_volume_1))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-green"},[e._v(e._s(e.currentSymbolInfo.bid_price_2))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.bid_volume_2))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-green"},[e._v(e._s(e.currentSymbolInfo.bid_price_3))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.bid_volume_3))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-green"},[e._v(e._s(e.currentSymbolInfo.bid_price_4))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.bid_volume_4))])],1),a("v-uni-view",{staticClass:"grace-tbody grace-space-between"},[a("v-uni-text",{staticClass:"grace-td grace-green"},[e._v(e._s(e.currentSymbolInfo.bid_price_5))]),a("v-uni-text",{staticClass:"grace-td "},[e._v(e._s(e.currentSymbolInfo.bid_volume_5))])],1)],1)],1):e._e(),a("v-uni-view",{staticClass:"ucenter-line"}),a("v-uni-view",{staticClass:"grace-nowrap"},[a("v-uni-view",{staticClass:"grace-title current-project"},[e._v("方向：")]),a("v-uni-picker",{attrs:{mode:"selector",range:e.directionList,"range-key":"name",name:"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeDirection.apply(void 0,arguments)}},model:{value:e.directionIndex,callback:function(t){e.directionIndex=t},expression:"directionIndex"}},[a("v-uni-view",{staticClass:"grace-space-between grace-title"},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.selectedDirection))]),a("v-uni-view",{staticClass:"grace-icons icon-arrow-down"})],1)],1)],1),a("v-uni-view",{staticClass:"grace-nowrap"},[a("v-uni-view",{staticClass:"grace-title current-project"},[e._v("开平：")]),a("v-uni-picker",{attrs:{mode:"selector",range:e.offsetList,"range-key":"name",name:"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeOffset.apply(void 0,arguments)}},model:{value:e.offsetIndex,callback:function(t){e.offsetIndex=t},expression:"offsetIndex"}},[a("v-uni-view",{staticClass:"grace-space-between grace-title"},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.selectedOffset))]),a("v-uni-view",{staticClass:"grace-icons icon-arrow-down"})],1)],1)],1),a("v-uni-view",{staticClass:"grace-nowrap"},[a("v-uni-view",{staticClass:"grace-title current-project"},[e._v("类型：")]),a("v-uni-picker",{attrs:{mode:"selector",range:e.typeList,"range-key":"name",name:"name"},on:{change:function(t){arguments[0]=t=e.$handleEvent(t),e.bindPickerChangeType.apply(void 0,arguments)}},model:{value:e.typeIndex,callback:function(t){e.typeIndex=t},expression:"typeIndex"}},[a("v-uni-view",{staticClass:"grace-space-between grace-title"},[a("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.selectedType))]),a("v-uni-view",{staticClass:"grace-icons icon-arrow-down"})],1)],1)],1),a("v-uni-view",{staticClass:"grace-nowrap"},[a("v-uni-view",{staticClass:"grace-title current-project"},[e._v("价格：")]),a("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"orderPrice",placeholder:"请输入价格"},model:{value:e.orderPrice,callback:function(t){e.orderPrice=t},expression:"orderPrice"}}),e.orderPrice.length>0?a("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.clearOrderPrice.apply(void 0,arguments)}}}):e._e()],1),a("v-uni-view",{staticClass:"grace-margin-top grace-margin-bottom"},[a("v-uni-button",{staticClass:"grace-border-radius grace-bg-blue",attrs:{type:"default"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.bindOrder.apply(void 0,arguments)}}},[e._v("下单")])],1),a("v-uni-view",{staticClass:"ucenter-line"}),a("graceHeaderAlert",{attrs:{show:e.showErrorMessage,background:"#FF0036"}},[a("v-uni-text",{staticClass:"grace-h5 grace-white"},[e._v(e._s(e.errorMessage))])],1)],1)],1)},r=[]},"5c3e":function(e,t,a){"use strict";a.r(t);var n=a("5031"),i=a("835d");for(var r in i)"default"!==r&&function(e){a.d(t,e,(function(){return i[e]}))}(r);a("7745");var s,c=a("f0c5"),o=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"c5b5a27e",null,!1,n["a"],s);t["default"]=o.exports},7745:function(e,t,a){"use strict";var n=a("aba2"),i=a.n(n);i.a},"835d":function(e,t,a){"use strict";a.r(t);var n=a("ddf3"),i=a.n(n);for(var r in n)"default"!==r&&function(e){a.d(t,e,(function(){return n[e]}))}(r);t["default"]=i.a},aba2:function(e,t,a){var n=a("fcd9");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=a("4f06").default;i("51ea38e5",n,!0,{sourceMap:!1,shadowMode:!1})},ddf3:function(e,t,a){"use strict";var n=a("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n(a("a02c"));var i={data:function(){return{serverUrl:"",userInfo:{},pageLoading:!1,symbolList:[],symbolIndex:0,currentSymbolInfo:{},directionList:["多","空"],directionIndex:0,selectedDirection:"请选择方向",offsetList:["开","平","平今","平昨"],offsetIndex:0,selectedOffset:"请选择开平",typeList:["限价","市价","STOP","FAK","FOK","询价"],typeIndex:0,selectedType:"请选择委托下单类型",orderPrice:0,tickShow:!1,showErrorMessage:!1,errorMessage:""}},onLoad:function(){this.pageOnLoad()},onShow:function(){},onPullDownRefresh:function(){this.pageOnLoad(),console.log("刷新了"),uni.stopPullDownRefresh()},methods:{clearOrderPrice:function(){this.orderPrice=""},bindPickerChangeSymbol:function(e){var t=this;t.symbolIndex=e.target.value,t.currentSymbolInfo=t.symbolList[t.symbolIndex],uni.setStorageSync("currentSymbolInfo",t.symbolList[t.symbolIndex]),t.updateTick()},bindPickerChangeDirection:function(e){var t=this;t.directionIndex=e.target.value,t.selectedDirection=t.directionList[t.directionIndex]},bindPickerChangeOffset:function(e){var t=this;t.offsetIndex=e.target.value,t.selectedOffset=t.offsetList[t.offsetIndex]},bindPickerChangeType:function(e){var t=this;t.typeIndex=e.target.value,t.selectedType=t.typeList[t.typeIndex]},bindOrder:function(){var e=this;e.errorMessage="等待开发！",e.showErrorMessage=!e.showErrorMessage},updateTick:function(){var e=this,t=e.getCurrentUserInfo(),a=e.getServerUrl(),n=e.getCurrentSymbolInfo();uni.request({url:a+"/tick",method:"GET",header:{Authorization:t.token_type+" "+t.access_token,"content-type":"application/x-www-form-urlencoded",accept:"application/json"},success:function(t){if(200==t.statusCode){if(e.symbolList=t.data,!(e.symbolList.length>0))return e.tickShow=!1,e.errorMessage="未订阅tick，请到服务器订阅！",void(e.showErrorMessage=!e.showErrorMessage);if(e.tickShow=!0,null===n)e.currentSymbolInfo=e.symbolList[0],uni.setStorageSync("currentSymbolInfo",e.symbolList[0]);else{for(var a=!1,i=0;i<e.symbolList.length;i++)n.gateway_name===e.symbolList[i].gateway_name&&n.exchange===e.symbolList[i].exchange&&n.symbol===e.symbolList[i].symbol&&(e.symbolIndex=i,e.currentSymbolInfo=e.symbolList[i],uni.setStorageSync("currentSymbolInfo",e.symbolList[i]),a=!0);a||(e.currentSymbolInfo=e.symbolList[0],uni.setStorageSync("currentSymbolInfo",e.symbolList[0]))}}else uni.showToast({title:t.data.detail,duration:2e3,icon:"none"}),uni.removeStorageSync("currentUserInfo"),uni.reLaunch({url:"/pages/user/login"})},fail:function(e){uni.showToast({title:"网络异常请重试",duration:2e3,icon:"none"})},complete:function(){setTimeout((function(){uni.hideLoading()}),2e3)}})},pageOnLoad:function(){var e=this;e.pageLoading=!0,setTimeout((function(){e.pageLoading=!1}),1500);var t=e.getCurrentUserInfo();if(null!=t){e.userInfo=t;var a=e.getServerUrl();e.serverUrl=a,e.updateTick()}else e.userIsLogin=!1,e.userInfo={},uni.removeStorageSync("currentUserInfo"),uni.reLaunch({url:"../user/login"})}},onShareAppMessage:function(e){return{title:"VeighNa - 基于Python的开源量化交易平台开发框架",path:"/pages/user/login"}}};t.default=i},fcd9:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,".scroll[data-v-c5b5a27e]{overflow:auto}.item[data-v-c5b5a27e]{height:50px;background:pink;border:1px solid #ddd}.bottom[data-v-c5b5a27e]{height:40px;line-height:40px}.progress[data-v-c5b5a27e]{margin:%?30?% 0}.three[data-v-c5b5a27e]{border-right:%?2?% solid #f5f6f8;border-bottom:%?2?% solid #f5f6f8}.grace-title[data-v-c5b5a27e]{padding:%?10?% 0;line-height:2em;display:flex;flex-wrap:nowrap;font-size:%?28?%;justify-content:space-between;font-weight:500;align-items:center}\n.grace-title[data-v-c5b5a27e]{font-weight:700}\n.grace-title > .title[data-v-c5b5a27e]{width:%?200?%;flex:auto}.grace-title > .icon[data-v-c5b5a27e]{width:%?50?%;font-size:%?50?%}.current-project[data-v-c5b5a27e]{margin-left:%?20?%;width:%?170?%}.three > .items[data-v-c5b5a27e]{width:33.333333%;border-left:%?2?% solid #f5f6f8;border-top:%?2?% solid #f5f6f8;color:#a5a7b2}.contact[data-v-c5b5a27e]{width:100%;height:%?100?%;line-height:%?100?%;text-align:center;margin-top:%?30?%}.demoForIcon[data-v-c5b5a27e]{border-right:%?2?% solid #f5f6f8;border-bottom:%?2?% solid #f5f6f8}.demoForIcon > .items[data-v-c5b5a27e]{border-left:%?2?% solid #f5f6f8;border-top:%?2?% solid #f5f6f8;color:#a5a7b2}.ucenter-line[data-v-c5b5a27e]{width:100%;height:3px;background:#f4f5f6;margin:16px 0}.hello[data-v-c5b5a27e]{display:flex;flex:1;flex-direction:column}.title[data-v-c5b5a27e]{color:#8f8f94;margin-top:%?50?%}.ul[data-v-c5b5a27e]{font-size:%?30?%;color:#8f8f94;margin-top:%?50?%}.ul > uni-view[data-v-c5b5a27e]{line-height:%?50?%}.percenpading[data-v-c5b5a27e]{padding-right:%?100?%}",""]),e.exports=t}}]);