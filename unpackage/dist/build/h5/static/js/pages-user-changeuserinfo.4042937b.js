(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-changeuserinfo"],{"1f68":function(e,a,t){"use strict";function n(e){var a=new Date,t=(a.getFullYear(),a.getMonth()+1),n=a.getDate();return"start"===e?5:"end"===e&&1,t=t>9?t:"0"+t,n=n>9?n:"0"+n,"${year}-${month}-${day}"}Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var i={data:function(){return{userIsLogin:!1,userInfo:{},userContact:{},realName:"",code:"",genderValue:"",startDate:n("start"),endDate:n("end"),birthday:" ",mobile:"",telephone:"",email:"",qq:"",wechat:""}},onLoad:function(){var e=this,a=e.getServerUrl(),t=e.getCurrentUserInfo();null!=t?(e.userInfo=t,uni.request({url:a+"/User/GetUserContact",method:"POST",header:{appKey:e.appKey,appSecret:e.appSecret,userId:t.Id,openId:t.OpenId},success:function(a){a.data.Status?"UserNotLogin"==a.data.StatusCode?(uni.removeStorageSync("currentUserInfo"),e.userIsLogin=!1,uni.showToast({title:"用户已异地登录",duration:2e3,icon:"none"})):(e.userContact=a.data.Data,e.realName=null!=t.RealName?t.RealName:"",e.code=null!=a.data.Data.Code?a.data.Data.Code:"",e.genderValue=a.data.Data.Gender,e.birthday=a.data.Data.Birthday,e.mobile=null!=a.data.Data.Mobile?a.data.Data.Mobile:"",e.telephone=null!=a.data.Data.Telephone?a.data.Data.Telephone:"",e.email=null!=a.data.Data.Email?a.data.Data.Email:"",e.qq=null!=a.data.Data.Qq?a.data.Data.Qq:"",e.wechat=null!=a.data.Data.WeChat?a.data.Data.WeChat:""):uni.showToast({title:a.data.StatusMessage,duration:2e3,icon:"none"})},fail:function(){uni.showToast({title:"网络异常请重试",duration:2e3,icon:"none"})},complete:function(){setTimeout((function(){uni.hideLoading()}),2e3)}})):(e.userInfo={},uni.reLaunch({url:"login"}))},methods:{clearRealName:function(){this.realName=""},clearCode:function(){this.code=""},clearMobile:function(){this.mobile=""},clearTelephone:function(){this.telephone=""},clearEmail:function(){this.email=""},clearQq:function(){this.qq=""},clearWechat:function(){this.wechat=""},genderChange:function(e){this.genderValue=e.target.value},sbindDateChange:function(e){this.birthday=e.target.value},changeUserInfor:function(){var e=this,a=e.getServerUrl(),t=e.getCurrentUserInfo();""!=e.realName?uni.request({url:a+"/User/ChangeUserInfo?realName="+e.realName+"&code="+e.code+"&gender="+e.genderValue+"&birthday="+e.birthday+"&mobile="+e.mobile+"&telephone="+e.telephone+"&email="+e.email+"&qq="+e.qq+"&weChat="+e.wechat,method:"POST",header:{appKey:e.appKey,appSecret:e.appSecret,userId:t.Id,openId:t.OpenId},success:function(a){if(a.data.Status)if("UserNotLogin"==a.data.StatusCode)uni.removeStorageSync("currentUserInfo"),e.userIsLogin=!1,uni.showToast({title:"用户已异地登录",duration:2e3,icon:"none"});else{uni.showToast({title:"更新成功",duration:2e3,icon:"success"});var t=a.data.Data,n=e.getCookieHours(),i=new Date,c=i.setTime(i.setHours(i.getHours()+n));t.expiredDate=c,uni.setStorageSync("currentUserInfo",t)}else uni.showToast({title:a.data.StatusMessage,duration:2e3,icon:"none"})},fail:function(){uni.showToast({title:"网络异常请重试",duration:2e3,icon:"none"})},complete:function(){setTimeout((function(){uni.hideLoading()}),2e3)}}):uni.showToast({title:"请输入姓名",duration:2e3,icon:"none"})},onNavigationBarButtonTap:function(e){"back"==e.type&&uni.reLaunch({url:"usercenter"})}}};a.default=i},2290:function(e,a,t){var n=t("24fb");a=n(!1),a.push([e.i,".margin-right-ten[data-v-3b46e58f]{margin-right:%?100?%}.margin-right-100[data-v-3b46e58f]{margin-right:%?100?%;margin-left:%?100?%}",""]),e.exports=a},6036:function(e,a,t){"use strict";t.r(a);var n=t("d309"),i=t("6911");for(var c in i)"default"!==c&&function(e){t.d(a,e,(function(){return i[e]}))}(c);t("c906");var s,l=t("f0c5"),o=Object(l["a"])(i["default"],n["b"],n["c"],!1,null,"3b46e58f",null,!1,n["a"],s);a["default"]=o.exports},6911:function(e,a,t){"use strict";t.r(a);var n=t("1f68"),i=t.n(n);for(var c in n)"default"!==c&&function(e){t.d(a,e,(function(){return n[e]}))}(c);a["default"]=i.a},b5e8:function(e,a,t){var n=t("2290");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var i=t("4f06").default;i("5f77b588",n,!0,{sourceMap:!1,shadowMode:!1})},c906:function(e,a,t){"use strict";var n=t("b5e8"),i=t.n(n);i.a},d309:function(e,a,t){"use strict";var n;t.d(a,"b",(function(){return i})),t.d(a,"c",(function(){return c})),t.d(a,"a",(function(){return n}));var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("gracePage",{attrs:{customHeader:!1}},[t("v-uni-view",{staticClass:"grace-body",attrs:{slot:"gBody"},slot:"gBody"},[t("v-uni-view",{staticClass:"grace-form grace-margin-top"},[t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-write icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("姓名")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"realName",placeholder:"请输入姓名"},model:{value:e.realName,callback:function(a){e.realName=a},expression:"realName"}}),e.realName.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearRealName.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-address icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("员工号")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"code",placeholder:"请输入员工号"},model:{value:e.code,callback:function(a){e.code=a},expression:"code"}}),e.code.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearCode.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-face icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("性别")]),t("v-uni-view",[t("v-uni-radio-group",{on:{change:function(a){arguments[0]=a=e.$handleEvent(a),e.genderChange.apply(void 0,arguments)}}},[t("v-uni-label",{staticClass:"grace-check-item margin-right-ten"},[t("v-uni-radio",{attrs:{value:"男",checked:"男"===e.genderValue}}),e._v("男")],1),t("v-uni-label",{staticClass:"grace-check-item"},[t("v-uni-radio",{attrs:{value:"女",checked:"女"===e.genderValue}}),e._v("女")],1)],1)],1),t("v-uni-view",{staticClass:"margin-right-100"})],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-time icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("生日")]),t("v-uni-picker",{attrs:{mode:"date",start:e.startDate,end:e.endDate,name:"birthday"},on:{change:function(a){arguments[0]=a=e.$handleEvent(a),e.sbindDateChange.apply(void 0,arguments)}},model:{value:e.birthday,callback:function(a){e.birthday=a},expression:"birthday"}},[t("v-uni-view",{staticClass:"uni-input"},[e._v(e._s(e.birthday))])],1)],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-tel icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("手机号码")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"mobile",placeholder:"请输入手机号码"},model:{value:e.mobile,callback:function(a){e.mobile=a},expression:"mobile"}}),e.mobile.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearMobile.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-tel icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("电话号码")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"telephone",placeholder:"请输入电话号码"},model:{value:e.telephone,callback:function(a){e.telephone=a},expression:"telephone"}}),e.telephone.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearTelephone.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-write icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("邮箱")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"email",placeholder:"请输入邮箱"},model:{value:e.email,callback:function(a){e.email=a},expression:"email"}}),e.email.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearEmail.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-qq icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("QQ")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"qq",placeholder:"请输入QQ"},model:{value:e.qq,callback:function(a){e.qq=a},expression:"qq"}}),e.qq.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearQq.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-items"},[t("v-uni-text",{staticClass:"grace-icons icon-weixin icon grace-blue"}),t("v-uni-view",{staticClass:"grace-label"},[e._v("微信")]),t("v-uni-input",{staticClass:"input text-align-left",attrs:{type:"text",name:"wechat",placeholder:"请输入微信"},model:{value:e.wechat,callback:function(a){e.wechat=a},expression:"wechat"}}),e.wechat.length>0?t("v-uni-view",{staticClass:"grace-form-funs grace-icons icon-close",on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.clearWechat.apply(void 0,arguments)}}}):e._e()],1),t("v-uni-view",{staticClass:"grace-margin-top"},[t("v-uni-button",{staticClass:"grace-button",attrs:{type:"primary"},on:{click:function(a){arguments[0]=a=e.$handleEvent(a),e.changeUserInfor.apply(void 0,arguments)}}},[e._v("更改用户信息")])],1)],1)],1)],1)},c=[]}}]);