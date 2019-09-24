<template>
	<view>
		<!-- 头部商家信息 -->
		<view class="go-store">
			<view class="left-part">
				<image class="store-image" src="../../static/logo.png" mode="aspectFill"></image>
			</view>
			<view class="right-part">
				<view class="store-name">店铺名称</view>
				<view class="store-num">
					<text>商品数量：19</text>
				</view>
				<button class="go-store-btn" type="primary" size="mini" @tap="collect">收藏</button>
			</view>
		</view>

		<!-- 商家banner图 -->
		<view class="store-banner">
			<image src="../../static/img/face.jpg" mode="aspectFill"></image>
		</view>

		<!-- 排序部分 -->

		<view class="sort-part">
			<view class="sort-item">
				综合排序
			</view>
			<view class="sort-item">
				销量
			</view>
			<view class="sort-item">
				价格
			</view>
			<view class="sort-item">
				评论数量
			</view>
		</view>

		<!-- 商品列表 -->

		<view class="goods-list">
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
		</view>

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
	.go-store {
		background: #ffffff;
		height: 200rpx;

		.left-part {
			float: left;
			width: 200rpx;

			.store-image {
				height: 160rpx;
				width: 160rpx;
				margin: 20rpx;
			}
		}

		.right-part {
			width: 550rpx;
			float: right;
			height: 160rpx;
			padding: 20rpx 0;

			.store-name {
				font-weight: 600;
				font-size: 32rpx;
			}

			.store-num {
				margin-top: 80rpx;
				font-size: 30rpx;
				display: inline-block;
			}

			.go-store-btn {
				float: right;
				margin-top: 60rpx;
				margin-right: 40rpx;
				background: #409eff;
			}
		}
	}

	.store-banner {
		margin-top: 20rpx;
		text-align: center;

		image {
			width: 700rpx;
			height: 350rpx;
			border-radius: 20rpx;
		}
	}

	.sort-part {
		width: 750rpx;
		margin: auto;
		margin-top: 20rpx;
		height: 60rpx;
		background: #ffffff;
		padding-left: 25rpx;

		.sort-item {
			margin-top: 10rpx;
			width: 175rpx;
			display: inline-block;
			text-align: center;
			font-size: 30rpx;
		}
	}
	
	.goods-list {
		margin-top: 20rpx;
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}
	
		.product-list {
			width: 700rpx;
			padding: 0 25rpx 25rpx 25rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
	
			.product {
				width: 340rpx;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 2rpx 12rpx rgba(0, 0, 0, 0.1);
	
				image {
					width: 340rpx;
					height: 340rpx;
					border-radius: 20upx 20upx 0 0;
				}
	
				.name {
					width: 92%;
					padding: 10upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}
	
				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;
	
					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}
	
					.slogan {
						color: #807c87;
						font-size: 24upx;
					}
				}
			}
		}
	}
</style>
