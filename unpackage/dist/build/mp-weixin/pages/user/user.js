(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/user"],{"1a26":function(n,e,a){},"41b7":function(n,e,a){"use strict";var i=a("1a26"),o=a.n(i);o.a},6961:function(n,e,a){"use strict";var i=function(){var n=this,e=n.$createElement;n._self._c},o=[];a.d(e,"a",function(){return i}),a.d(e,"b",function(){return o})},"7c7a":function(n,e,a){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return a.e("components/modal/modal").then(a.bind(null,"0755"))},o={components:{tuiModal:i},data:function(){return{userinfo:{},showBind:!1,orderTypeLise:[{name:"待付款",icon:"daifukuan.png",badge:2},{name:"待使用",icon:"daishiyong.png",badge:2},{name:"未收货",icon:"weishouhuo.png",badge:6},{name:"待点评",icon:"daidianping.png",badge:9}],secondTypeLise:[{name:"优惠券",icon:"youhuiquan.png",badge:2},{name:"商品收藏",icon:"shangpinshoucang.png",badge:2},{name:"店铺收藏",icon:"dianpushoucang.png",badge:2},{name:"退款售后",icon:"tuikuanshouhou.png",badge:6}],severList:[[{name:"全部订单",icon:"quanbudingdan.png"},{name:"在线充值",icon:"chongzhi.png"},{name:"更改绑定",icon:"genggaibangding.png"},{name:"余额明细",icon:"yue.png"},{name:"地址管理",icon:"dizhi.png"}]]}},onLoad:function(){this.init()},methods:{init:function(){this.userinfo={face:"/static/img/face.jpg",username:"吕蒙",integral:"1435"}},toInnerType:function(e){var a="";if(0==e)a="/pages/user/coupon";else if(1==e)a="/pages/user/product_collect";else if(2==e)a="/pages/user/store_collect";else if(3==e)return void n.makePhoneCall({phoneNumber:"18661139072"});n.navigateTo({url:a})},toOrderType:function(e){n.navigateTo({url:"/pages/order/order_list?type="+(e+1)})},toServiceType:function(e){var a="";if(0==e)a="/pages/order/order_list?type=0";else if(1==e)a="/pages/user/deposit";else{if(2==e)return void(this.showBind=!0);3==e?a="/pages/user/remain_money":4==e&&(a="/pages/user/location_list")}n.navigateTo({url:a})}}};e.default=o}).call(this,a("543d")["default"])},"93e3":function(n,e,a){"use strict";a.r(e);var i=a("6961"),o=a("9c05");for(var t in o)"default"!==t&&function(n){a.d(e,n,function(){return o[n]})}(t);a("41b7");var u=a("2877"),r=Object(u["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"9c05":function(n,e,a){"use strict";a.r(e);var i=a("7c7a"),o=a.n(i);for(var t in i)"default"!==t&&function(n){a.d(e,n,function(){return i[n]})}(t);e["default"]=o.a}},[["3a10","common/runtime","common/vendor"]]]);