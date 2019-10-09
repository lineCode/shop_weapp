<template>
	<view>
		<search-header></search-header>
		<view>
			<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
				<view v-for="(item,index) in category" :key="item.id" class="tab-bar-item" :class="[currentTab==item.id ? 'active' : '']"
				 :data-current="item.id" @tap.stop="swichNav">
					<text class="tab-bar-title">{{item.name}}</text>
				</view>
			</scroll-view>

			<scroll-view scroll-y class="scoll-y">
				<view class="list-view">
					<view class="swiper" v-if="currentTab == 0">
						<view class="swiper-box">
							<swiper circular="true" autoplay="true" @change="swiperChange">
								<swiper-item v-for="item in banners" :key="item.id">
									<image :src="item.attach" mode="aspectFill"></image>
								</swiper-item>
							</swiper>
							<view class="indicator">
								<view class="dots" v-for="(swiper, index) in banners" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
							</view>
						</view>
					</view>

					<view class="grace-grids grace-margin-top five" v-if="currentTab > 0">
						<view class="items" v-for="subItem in subCategory" :key="subItem">
							<view class="icon">
								<image class="sub-image" :src="subItem.thumb" mode="widthFix"></image>
							</view>
							<view class="text">{{subItem.name}}</view>
						</view>
					</view>

					<view class="banner-container">
						<image :src="sigleBanner.attach" mode="aspectFill"></image>
					</view>

					<view class="title-devider">
						<text>热门商品</text>
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
			</scroll-view>
		</view>
		<confirm-login></confirm-login>
	</view>
</template>
<script>
	import SearchHeader from '@/components/layouts/SearchHeader.vue';
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue';
	import confirmLogin from '@/components/confirmLogin.vue';
	export default {
		components: {
			SearchHeader,
			uniNavBar,
			confirmLogin
		},
		data() {
			return {
				showconfirmLogin: true,
				subCategory: [{
					name: '夹克',
					thumb: '/static/logo.png',
				}],
				currentSwiper: 0,
				banners: [],
				category: [],
				sigleBanner: {},
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0 ,//tab标题的滚动条位置
				productList: [],
				hasMore: 1,
			}
		},
		onLoad() {
			this.getCategory()
			this.getBanner()
			this.getList(0)
		},
		methods: {
			// 商品列表
			getList(category) {
				uni.request({
					url: getApp().globalData.api + 'product/index',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						category_id: category
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
			// 顶部分类
			getCategory() {
				uni.request({
					url: getApp().globalData.api + 'category/index',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id')
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.category = res.data.data
					}
				});
			},
			// 获取banner图片
			getBanner() {
				uni.request({
					url: getApp().globalData.api + 'system/banners',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id')
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.banners = res.data.data.list
						this.sigleBanner = res.data.data.single
					}
				});
			},
			toProduct(id) {
				uni.navigateTo({
					url: "/pages/product/product_info?id=" + id
				})
			},
			// 滚动切换标签样式
			switchTab: function(e) {
				let that = this;
				this.currentTab = e.detail.current;
				this.checkCor();
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
				let cur = e.currentTarget.dataset.current;
				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur
				}
			},
			//判断当前滚动超过一屏时，设置tab标题滚动条。
			checkCor: function() {
				if (this.currentTab > 3) {
					//这里距离按实际计算
					this.scrollLeft = 300
				} else {
					this.scrollLeft = 0
				}
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			}
		}
	}
</script>


<style lang="scss">
	.header-bar {
		background: #0177BF;
	}

	/* 顶部城市栏 */
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 16rpx;
		white-space: nowrap;

		.location-text {
			color: #ffffff;
			font-weight: 600;
			font-size: 36rpx;
			margin-right: 10rpx;
		}
	}

	/* 顶部搜索栏 */
	.input-view {
		width: 330rpx;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 16rpx;
		line-height: 30px;
		background: #f5f5f5;

		.input {
			height: 30px;
			line-height: 30px;
			width: 94%;
			padding: 0 3%;
		}
	}

	/*tabbar start*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}

	.tab-view {
		width: 100%;
		height: 70rpx;
		overflow: hidden;
		box-sizing: border-box;
		position: fixed;
		top: var(--status-bar-height)+44;
		left: 0;
		z-index: 99;
		background: #fff;
		white-space: nowrap;
	}

	.tab-bar-item {
		padding: 0;
		height: 70rpx;
		min-width: 70rpx;
		line-height: 70rpx;
		margin: 0 24rpx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}

	.tab-bar-title {
		height: 70rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #999;
		font-weight: 400;
	}

	.active {
		border-bottom: 4upx solid #F56C6C;
	}

	.active .tab-bar-title {
		color: #F56C6C !important;
		font-size: 30rpx;
	}

	/*tabbar end*/

	.scoll-y {
		height: 100%;
		padding-top: 70rpx;
	}

	.swiper {
		width: 100%;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 700rpx;
			height: 233rpx;
			margin-top: 18rpx;
			border-radius: 20rpx;
			overflow: hidden;
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 233rpx;

				swiper-item {
					image {
						width: 100%;
						height: 233rpx;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150upx;
				height: 5upx;
				border-radius: 3upx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0upx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.sub-image {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}

	.banner-container {
		width: 700rpx;
		margin: auto;
		margin-top: 20rpx;

		image {
			width: 100%;
			height: 175rpx;
			border-radius: 20rpx;
		}
	}

	.title-devider {
		width: 100%;
		text-align: center;
		margin: 14rpx 0 24rpx 0;

		text {
			font-size: 34rpx;
			font-weight: 600;
		}
	}

	.goods-list {
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

	.five>.items {
		width: 20%;
	}
</style>
