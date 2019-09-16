<template>
	<view>

		<!-- 商家banner图 -->
		<view class="store-header">
			<image src="../../static/img/face.jpg" mode="aspectFill"></image>
		</view>

		<!-- 商品列表 -->

<!-- 		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id" @tap="toProduct(goods.goods_id)">
					<image mode="widthFix" :src="goods.img"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">{{goods.price}}</view>
						<view class="slogan">{{goods.slogan}}</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view> -->

	</view>

</template>

<script>
	export default {

		data() {
			return {
				goodsList: [{
						goods_id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				]
			}
		}
	}
</script>

<style lang="scss">

	.store-header{
		margin-top: 20rpx;
		text-align: center;
		border-radius: 20rpx;
		width: 700rpx;
		image {
			width: 700rpx;
			height: 350rpx;
		}
	}
	
</style>
