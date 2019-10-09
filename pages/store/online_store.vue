<template>
	<view>
		<common-header title="商家信息"></common-header>

		<!-- 头部商家信息 -->
		<view class="go-store">
			<view class="left-part">
				<image class="store-image" :src="info.logo" mode="aspectFill"></image>
			</view>
			<view class="right-part">
				<view class="store-name">{{info.name}}</view>
				<view class="store-num">
					<text>商品数量：{{info.product_num}}</text>
				</view>
				<view class="store-num" style="display: block;">
					<text>{{info.collect}} 人收藏</text>
					<button class="go-store-btn" type="primary" size="mini" @tap="collect">{{ info.is_collect == 1 ? '已' : '' }}收藏</button>
				</view>
			</view>
		</view>

		<!-- 商家banner图 -->
		<view class="store-banner">
			<image :src="info.thumb" mode="aspectFill"></image>
		</view>

		<view class="grace-nowrap grace-border-b grace-flex-vcenter" :class="[isFixed ? 'grace-fixed-top' : '']" style="background:#FFFFFF;">
			<view class="graceSelectMenuItem grace-flex grace-nowrap grace-flex-center grace-flex-vcenter" @tap.stop="changeOrder(1)">
				<text>综合排序</text>
				<image class="orderImg" src="/static/icon/asc.png" mode="aspectFit" v-if="currentOrder == 1 && orderType == 1"></image>
				<image class="orderImg" src="/static/icon/desc.png" mode="aspectFit" v-if="currentOrder == 1 && orderType == 2"></image>
				<image class="orderImg" src="/static/icon/order.png" mode="aspectFit" v-if="currentOrder != 1"></image>
			</view>
			<view class="graceSelectMenuItem grace-flex grace-nowrap grace-flex-center grace-flex-vcenter" @tap.stop="changeOrder(2)">
				<text>销量</text>
				<image class="orderImg" src="/static/icon/asc.png" mode="aspectFit" v-if="currentOrder == 2 && orderType == 1"></image>
				<image class="orderImg" src="/static/icon/desc.png" mode="aspectFit" v-if="currentOrder == 2 && orderType == 2"></image>
				<image class="orderImg" src="/static/icon/order.png" mode="aspectFit" v-if="currentOrder != 2"></image>
			</view>
			<view class="graceSelectMenuItem grace-flex grace-nowrap grace-flex-center grace-flex-vcenter" @tap.stop="changeOrder(3)">
				<text>价格</text>
				<image class="orderImg" src="/static/icon/asc.png" mode="aspectFit" v-if="currentOrder == 3 && orderType == 1"></image>
				<image class="orderImg" src="/static/icon/desc.png" mode="aspectFit" v-if="currentOrder == 3 && orderType == 2"></image>
				<image class="orderImg" src="/static/icon/order.png" mode="aspectFit" v-if="currentOrder != 3"></image>
			</view>
			<view class="graceSelectMenuItem grace-flex grace-nowrap grace-flex-center grace-flex-vcenter" @tap.stop="changeOrder(4)">
				<text>评论数量</text>
				<image class="orderImg" src="/static/icon/asc.png" mode="aspectFit" v-if="currentOrder == 4 && orderType == 1"></image>
				<image class="orderImg" src="/static/icon/desc.png" mode="aspectFit" v-if="currentOrder == 4 && orderType == 2"></image>
				<image class="orderImg" src="/static/icon/order.png" mode="aspectFit" v-if="currentOrder != 4"></image>
			</view>
		</view>

		<view class="goods-list">
			<view class="product-list">
				<view class="product" v-for="item in list" :key="item.id" @tap="toProduct(item.id)">
					<image mode="aspectFill" :src="item.thumb"></image>
					<view class="name">{{item.name}}</view>
					<view class="info">
						<view class="price">￥{{item.price}}</view>
						<view class="slogan">{{item.sold}} 人付款</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
		<graceFullLoading :graceFullLoading="loading" logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"></graceFullLoading>
	</view>
</template>

<script>
	import CommonHeader from '@/components/layouts/CommonHeader.vue'
	import graceFullLoading from "@/graceUI/components/graceFullLoading.vue"

	export default {
		components: {
			CommonHeader,
			graceFullLoading
		},
		data() {
			return {
				loading: true,
				info: {},
				list: [],
				currentOrder: 0,
				orderType: 0
			}
		},
		onLoad(e) {
			this.getInfo(e.id)
			this.getList(e.id)
		},
		methods: {
			changeOrder(current){
				let type = this.orderType
				if(current == this.currentOrder){
					if(type == 0){
						this.currentOrder = current
						this.orderType = 2
					}else if(type == 2){
						this.currentOrder = current
						this.orderType = 1
					}else if(type == 1){
						this.currentOrder = 0
						this.orderType = 0
					}
				}else{
					this.currentOrder = current
					this.orderType = 2
				}
				
				this.getList(this.info.id)
			},
			toProduct(id) {
				uni.navigateTo({
					url: "/pages/product/product_info?id=" + id
				})
			},
			getList(id) {
				uni.request({
					url: getApp().globalData.api + 'store/product-list',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						id: id,
						order: this.currentOrder,
						order_type: this.orderType
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.list = res.data.data
					},
					fail: (res) => {

					}
				});
			},
			collect() {
				uni.request({
					url: getApp().globalData.api + 'store/collect',
					method: 'POST',
					data: {
						open_id: uni.getStorageSync('open_id'),
						id: this.info.id,
						status: this.info.is_collect == 1 ? 0 : 1
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						if (this.info.is_collect == 1) {
							this.info.is_collect = 0
							this.info.collect -= 1
						} else {
							this.info.is_collect = 1
							this.info.collect += 1
						}
					},
					fail: (res) => {

					}
				});
			},
			getInfo(id) {
				uni.request({
					url: getApp().globalData.api + 'store/info',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						id: id
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.info = res.data.data
						this.loading = false
					},
					fail: (res) => {
						this.loading = false
					}
				});
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
				height: 70rpx;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;

				text {
					line-height: 70rpx;
				}
			}

			.go-store-btn {
				float: right;
				margin-top: 4rpx;
				margin-right: 40rpx;
				background: #409eff;
			}
		}
	}

	.store-banner {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
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
	
	.graceSelectMenuItem{width:200rpx; line-height:90rpx;}
	.orderImg{width:34rpx; height:34rpx;margin-left: 4rpx;}
	.grace-filter-ft{width:100%; height:50px; display:flex; flex-wrap:nowrap; flex-direction:row;}
	.grace-filter-ft-close{line-height:50px; text-align:center; width:50%;}
	.grace-filter-rbtn{width:50%; position:relative; line-height:50px; color:#3688FF; text-align:center;}
	.grace-filter-buttons{opacity:0; width:100%; position:absolute; z-index:9; left:0; top:0; height:100rpx;}
</style>
