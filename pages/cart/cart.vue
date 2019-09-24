<template>
	<view class="grace-body">
		<!-- 购物车为空 -->
		<view v-if="shoppingCard.length < 1" style="margin-top:150px;">
			<graceEmpty :iconSize="168" :iconType="4" iconColor="#E1E1E1"></graceEmpty>
			<view class="grace-text-center grace-margin-top">
				<text class="grace-text-small">您的购物车空空如也 ~ </text>
				<text class="grace-text-small grace-blue" style="margin-left:20rpx;">去购物</text>
			</view>
		</view>
		<!-- 购物车为空 -->
		<!-- 购物车主结构  -->
		<view class="grace-shoppingcard grace-margin-top" v-for="(item, index) in shoppingCard" :key="index">
			<view class="grace-title grace-flex-vcenter">
				<view><graceCheckBtn style="margin-right:12px;" @change="shopChange" :parameter="[index]" :data-shopindex="item.index" :checked="item.checked"></graceCheckBtn>{{item.shopName}}</view>
				<navigator class="grace-more">进店<text class="grace-icons icon-arrow-right"></text></navigator>
			</view>
			<view class="goods" v-for="(goods, indexItem) in item.items" :key="indexItem">
				<graceCheckBtn :checked="goods.checked" @change="itemChange" :parameter="[index+'-'+indexItem]" style="margin:12px 12px 0 0;"></graceCheckBtn>
				<image :src="goods.img" mode="widthFix"></image>
				<view class="body">
					<view class="goods-title">{{goods.goodsName}}</view>
					<view class="goods-price">
						￥{{goods.price}}
						<view class="goods-number">
							<graceNumberBox :disabled="true" :index="indexItem" :datas="index+''" :value="goods.count" :maxNum="100" :minNum="1" v-on:change="numberChange"></graceNumberBox>
						</view>
					</view>
					<view class="goods-remove grace-icons icon-remove" @tap="removeGoods" :id="'removeIndex_' + index + '_' + indexItem"><text>删除</text></view>
				</view>
			</view>
		</view>
		<view style="height:120rpx;"></view>
		<!-- 底部  -->
		<view class="grace-footer grace-nowrap grace-flex-vcenter" v-if="shoppingCard.length >= 1">
			<view class="grace-shoppingcard-checkbtn grace-nowrap grace-flex-vcenter">
				<graceCheckBtn :checked="true" @change="itemChangeAll"></graceCheckBtn>
				<text class="grace-shoppingcard-check-text">{{selectText}}</text>
			</view>
			<view class="grace-shoppingcard-text">
				合计 : <text style="font-size:36upx; color:#F00;">￥{{totalprice}}</text>
			</view>
			<button type="warn" style="background:#E55D52; width:260rpx; flex-shrink:0;" @tap="checkout">立即结算</button>
		</view>
	</view>
</template>
<script>
var _self;
import graceNumberBox from "../../graceUI/components/graceNumberBox.vue";
import graceEmpty from "../../graceUI/components/graceEmpty.vue";
import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
import graceImmersedStatusbar from "../../graceUI/components/graceImmersedStatusbar.vue";
export default {
	data() {
		return {
			// 总价
			totalprice : '',
			// 选择文本
			selectText : '全不选',
			// 购物车数据 可以来自 api 请求或本地数据
			shoppingCard : [
				{
					"checked" : true,
					"shopName": "hcoder 官方店",
					"shopId": "1",
					"items": [
						{
							"goodsId": 1,
							"goodsName": "hcoder 演示商品",
							"price": 10.00,
							"count": 1,
							"img": "https://m.360buyimg.com/babel/jfs/t1/3730/7/3438/394579/5b996f2eE1727c59e/373cf10d42a53b72.jpg",
							"checked" : true
						},
						{
							"goodsId": 2,
							"goodsName": "dcloud 演示商品",
							"price": 20.00,
							"count": 1,
							"img": "https://img14.360buyimg.com/n7/jfs/t1/1156/8/14017/123589/5bd9a4e8E7dbd4a15/70fbbccdf8811111.jpg",
							"checked" : true
						}
					]
				},
				{
					"checked" : true,
					"shopName": "grace 官方旗舰店",
					"shopId": "2",
					"items": [
						{
							"goodsId": 3,
							"goodsName": "uni-app 演示商品",
							"price": 30.00,
							"count": 2,
							"img": "https://img10.360buyimg.com/n7/jfs/t19690/263/1947634738/190301/ad172397/5adfe5eaN42591f8c.jpg",
							"checked" : true
						}
					]
				}
			]
		}
	},
	onLoad : function(){
		_self = this;
		// 初始化时候计算总价，如果使用api 获取购物车项目在 api 请求完成后执行此函数
		this.countTotoal();
	},
	methods:{
		//计算总计函数
		countTotoal:function(){
			var total = 0;
			for (var i = 0; i < this.shoppingCard.length; i++){
				for (var ii = 0; ii < this.shoppingCard[i].items.length; ii++){
					if(this.shoppingCard[i].items[ii].checked){
						total += Number(this.shoppingCard[i].items[ii].price) * Number(this.shoppingCard[i].items[ii].count);
					}
				}
			}
			this.totalprice = total;
		},
		numberChange:function(data){
			this.shoppingCard[data[2]].items[data[1]].count = data[0];
			//计算总价
			this.countTotoal();
		},
		removeGoods : function(e){
			var index = e.currentTarget.id.replace('removeIndex_', '');
			index = index.split('_');
			var index1 = Number(index[0]);
			var index2 = Number(index[1]);
			wx.showModal({
				title: '确认提醒',
				content: '您确定要移除此商品吗？',
				success:function(e){
					if (e.confirm) {
						_self.shoppingCard[index1].items.splice(index2, 1);
						// 是否全部删除包含商铺
						if(_self.shoppingCard[index1].items.length < 1){
							_self.shoppingCard.splice(index1, 1);
						}
						//计算总价
						_self.countTotoal();
					}
				}
			})
		},
		checkout:function(){
			uni.showToast({
				title: '计算的数据保存在 shoppingCard 变量内 ^_^',
				icon : "none"
			})
		},
		// 店铺选中按钮状态切换
		shopChange : function (e) {
			var index = Number(e[1]);
			this.shoppingCard[index].checked = e[0];
			for(let i = 0; i < this.shoppingCard[index].items.length; i++){
				this.shoppingCard[index].items[i].checked = e[0];
			}
			this.shoppingCard.splice(index, this.shoppingCard[index]);
			this.countTotoal();
		},
		// 商品选中
		itemChange : function (e) {
			var indexs = e[1].toString();
			var index = indexs.split('-');
			index[0] = Number(index[0]);
			index[1] = Number(index[1]);
			this.shoppingCard[index[0]].items[index[1]].checked = e[0];
			this.shoppingCard.splice(index[0], this.shoppingCard[index[0]]);
			var checkedNum = 0;
			for(let i = 0; i < this.shoppingCard[index[0]].items.length; i++){
				if(this.shoppingCard[index[0]].items[i].checked){
					checkedNum++;
				}
			}
			if(checkedNum < 1){
				this.shoppingCard[index[0]].checked = false;
			}else{
				this.shoppingCard[index[0]].checked = true;
			}
			this.shoppingCard = this.shoppingCard;
			this.countTotoal();
		},
		itemChangeAll : function (e) {
			this.selectText = e[0] ? '全不选' : '全选';
			for(var i = 0; i < this.shoppingCard.length; i++){
				this.shoppingCard[i].checked = e[0];
				for(var ii = 0; ii < this.shoppingCard[i].items.length; ii++){
					this.shoppingCard[i].items[ii].checked = e[0];
				}
			}
			this.countTotoal();
		}
	},
	components:{
		graceNumberBox,
		graceEmpty,
		graceCheckBtn,
		graceImmersedStatusbar
	}
}
</script>
<style>
page{background:#F5F6F7;}
.grace-shoppingcard-checkbtn{width:180rpx; margin-left:50rpx; flex-shrink:0;}
.grace-shoppingcard-check-text{font-size:28rpx; margin-left:12rpx; color:#666666;}
.grace-shoppingcard-text{width:700rpx; line-height:100rpx;}
.grace-line-title > .line{width:50rpx; flex:auto; height:1px; background:#D1D1D1; margin:0 50rpx;}
/* #ifdef H5 */
.grace-footer{bottom:50px;}
/* #endif */
</style>