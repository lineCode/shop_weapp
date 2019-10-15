<template>
	<view class="grace-body">
		<common-header title="购物车" :hideBack="true"></common-header>
		<!-- 购物车为空 -->
		<view v-if="shoppingCard.length < 1" style="margin-top:150px;">
			<graceEmpty :iconSize="168" :iconType="4" iconColor="#E1E1E1"></graceEmpty>
			<view class="grace-text-center grace-margin-top">
				<text class="grace-text-small">您的购物车空空如也 ~ </text>
				<text class="grace-text-small grace-blue" style="margin-left:20rpx;" @tap="toHome">去购物</text>
			</view>
		</view>
		<!-- 购物车为空 -->
		<!-- 购物车主结构  -->
		<view class="grace-shoppingcard grace-margin-top" v-for="(item, index) in shoppingCard" :key="index">
			<view class="grace-title grace-flex-vcenter">
				<view>
					<graceCheckBtn style="margin-right:12px;" @change="shopChange" :parameter="[index]" :data-shopindex="item.index"
					 :checked="item.checked"></graceCheckBtn>{{item.shopName}}
				</view>
				<navigator class="grace-more" :url="'/pages/store/online_store?id='+item.shopId">进店<text class="grace-icons icon-arrow-right"></text></navigator>
			</view>
			<view class="goods" v-for="(goods, indexItem) in item.items" :key="indexItem">
				<graceCheckBtn :checked="goods.checked" @change="itemChange" :parameter="[index+'-'+indexItem]" style="margin:12px 12px 0 0;"></graceCheckBtn>
				<image :src="goods.img" style="width: 140rpx;height: 140rpx;" mode="aspectFill"></image>
				<view class="body">
					<view class="goods-title">{{goods.goodsName}}</view>
					<view>{{goods.sku_title}}</view>
					<view class="goods-price">
						￥{{goods.price}}
						<view class="goods-number">
							<graceNumberBox :disabled="true" :index="indexItem" :datas="index+''" :value="goods.count" :maxNum="100" :minNum="1"
							 v-on:change="numberChange"></graceNumberBox>
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
		<graceFullLoading :graceFullLoading="loading" logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"></graceFullLoading>
	</view>
</template>
<script>
	var _self;
	import graceNumberBox from "../../graceUI/components/graceNumberBox.vue";
	import graceEmpty from "../../graceUI/components/graceEmpty.vue";
	import graceCheckBtn from '../../graceUI/components/graceCheckBtn.vue';
	import CommonHeader from '@/components/layouts/CommonHeader'
	import graceFullLoading from "@/graceUI/components/graceFullLoading.vue"
	export default {
		data() {
			return {
				// 总价
				totalprice: '0.00',
				// 选择文本
				selectText: '全不选',
				loading: true,
				// 购物车数据 可以来自 api 请求或本地数据
				shoppingCard: [],
				chosen:[],
				chosenStore: []
			}
		},
		onLoad: function() {

			// 初始化时候计算总价，如果使用api 获取购物车项目在 api 请求完成后执行此函数

		},
		onShow() {
			_self = this;
			this.getList()
		},
		methods: {
			toHome() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},
			getList() {
				uni.request({
					url: getApp().globalData.api + 'product/cart-list',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id')
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						console.log(res.data.data)
						this.shoppingCard = res.data.data.list
						this.countTotoal();
						this.loading = false
					},
					fail: (res) => {
						this.loading = false
					}
				});
			},
			//计算总计函数
			countTotoal: function() {
				var total = 0;
				var chosen_id = [];
				var k = 0;
				for (var i = 0; i < this.shoppingCard.length; i++) {
					for (var ii = 0; ii < this.shoppingCard[i].items.length; ii++) {
						if (this.shoppingCard[i].items[ii].checked) {
							total += Number(this.shoppingCard[i].items[ii].price) * Number(this.shoppingCard[i].items[ii].count);
						    chosen_id[k] = this.shoppingCard[i].items[ii].item_id
							k++;
						}
					}
				}
				this.chosen = chosen_id;
				this.totalprice = total;
			},
			numberChange: function(data) {
				uni.request({
					url: getApp().globalData.api + 'product/cart-change-number',
					method: 'POST',
					data: {
						open_id: uni.getStorageSync('open_id'),
						cart_item_id: this.shoppingCard[data[2]].items[data[1]].item_id,
						amount: data[0]
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						if(res.data.code == 200){
							this.shoppingCard[data[2]].items[data[1]].count = data[0];
							//计算总价
							this.countTotoal();
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					},
					fail: (res) => {
				
					}
				});
				
			},
			removeGoods: function(e) {
				var index = e.currentTarget.id.replace('removeIndex_', '');
				index = index.split('_');
				var index1 = Number(index[0]);
				var index2 = Number(index[1]);
				wx.showModal({
					title: '确认提醒',
					content: '您确定要移除此商品吗？',
					success: function(e) {
						if (e.confirm) {
							uni.request({
								url: getApp().globalData.api + 'product/del-cart',
								method: 'POST',
								data: {
									open_id: uni.getStorageSync('open_id'),
									cart_item_id: _self.shoppingCard[index1].items[index2].item_id
								},
								header: {
									'content-type': 'application/json' //自定义请求头信息
								},
								success: (res) => {
									if(res.data.code == 200){
										_self.shoppingCard[index1].items.splice(index2, 1);
										// 是否全部删除包含商铺
										if (_self.shoppingCard[index1].items.length < 1) {
											_self.shoppingCard.splice(index1, 1);
										}
										//计算总价
										_self.countTotoal();
									}else{
										uni.showToast({
											title: res.data.msg,
											icon: 'none'
										})
									}
								},
								fail: (res) => {

								}
							});
						}
					}
				})
			},
			checkout: function() {
				console.log(this.chosen)
				if(this.chosen.length == 0){
					uni.showToast({
						title: '请先选择商品',
						icon: "none"
					})
					return
				}
				uni.request({
					url: getApp().globalData.api + 'order/cart-create',
					method: 'POST',
					data: {
						open_id: uni.getStorageSync('open_id'),
						cart_item_ids: this.chosen,
						total_amount: this.totalprice
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						if(res.data.code == 200){
							uni.navigateTo({
								url: '/pages/order/order_info?order_id='+res.data.data.order_id
							})
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}
				});
			},
			// 店铺选中按钮状态切换
			shopChange: function(e) {
				var index = Number(e[1]);
				this.shoppingCard[index].checked = e[0];
				for (let i = 0; i < this.shoppingCard[index].items.length; i++) {
					this.shoppingCard[index].items[i].checked = e[0];
				}
				// this.shoppingCard.splice(index, this.shoppingCard[index]);
				this.countTotoal();
			},
			// 商品选中
			itemChange: function(e) {
				var indexs = e[1].toString();
				var index = indexs.split('-');
				index[0] = Number(index[0]);
				index[1] = Number(index[1]);
				this.shoppingCard[index[0]].items[index[1]].checked = e[0];
				// this.shoppingCard.splice(index[0], this.shoppingCard[index[0]]);
				var checkedNum = 0;
				for (let i = 0; i < this.shoppingCard[index[0]].items.length; i++) {
					if (this.shoppingCard[index[0]].items[i].checked) {
						checkedNum++;
					}
				}
				if (checkedNum < 1) {
					this.shoppingCard[index[0]].checked = false;
				} else {
					this.shoppingCard[index[0]].checked = true;
				}
				this.shoppingCard = this.shoppingCard;
				this.countTotoal();
			},
			itemChangeAll: function(e) {
				this.selectText = e[0] ? '全不选' : '全选';
				for (var i = 0; i < this.shoppingCard.length; i++) {
					this.shoppingCard[i].checked = e[0];
					for (var ii = 0; ii < this.shoppingCard[i].items.length; ii++) {
						this.shoppingCard[i].items[ii].checked = e[0];
					}
				}
				this.countTotoal();
			}
		},
		components: {
			graceNumberBox,
			graceEmpty,
			graceCheckBtn,
			CommonHeader,
			graceFullLoading
		}
	}
</script>
<style>
	.grace-shoppingcard-checkbtn {
		width: 180rpx;
		margin-left: 50rpx;
		flex-shrink: 0;
	}

	.grace-shoppingcard-check-text {
		font-size: 28rpx;
		margin-left: 12rpx;
		color: #666666;
	}

	.grace-shoppingcard-text {
		width: 700rpx;
		line-height: 100rpx;
	}

	.grace-line-title>.line {
		width: 50rpx;
		flex: auto;
		height: 1px;
		background: #D1D1D1;
		margin: 0 50rpx;
	}
</style>
