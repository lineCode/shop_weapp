<template>
	<view>
		<common-header :title="title"></common-header>
		<view>
			
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
					<view class="product grace-box-shadow" v-for="item in productList" :key="item.id" @tap="toProduct(item.id)">
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
		</view>
		<confirm-login></confirm-login>
	</view>
</template>
<script>
	import CommonHeader from '@/components/layouts/CommonHeader.vue';
	import confirmLogin from '@/components/confirmLogin.vue';
	export default {
		components: {
			CommonHeader,
			confirmLogin
		},
		data() {
			return {
				showconfirmLogin: true,
				currentSwiper: 0,
				banners: [],
				category: [],
				subCategory: [],
				sigleBanner: {},
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0, //tab标题的滚动条位置
				productList: [],
				hasMore: 1,
				title: '',
				currentOrder: 0,
				orderType: 0,
				sub_category_id: 0
			}
		},
		onLoad(e) {
			this.title = e.title
			this.sub_category_id = e.category
			this.getList()
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
				
				this.getList()
			},
			// 商品列表
			getList() {
				uni.request({
					url: getApp().globalData.api + 'product/index',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						sub_category_id: this.sub_category_id,
						order: this.currentOrder,
						order_type: this.orderType
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.productList = res.data.data.list
						this.hasMore = res.data.data.has_more
					}
				});
			},
			toProduct(id) {
				uni.navigateTo({
					url: "/pages/product/product_info?id=" + id
				})
			}
		}
	}
</script>


<style lang="scss">
	.goods-list {
		margin-top: 30rpx;
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
				border-radius: 10upx;
				background-color: #fff;
				margin: 0 0 20upx 0;

				image {
					width: 340rpx;
					height: 340rpx;
					border-radius: 10upx 10upx 0 0;
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
