<template>
	<view>
		<view class="header-bar">
			<uni-nav-bar :status-bar="true" :fixed="true" color="#333333" :shadow="false" background-color="#0177BF">
				<block slot="left">
					<view class="city">
						<tui-icon name="position" color="#ffffff" size="20"></tui-icon>
						<view class="location-text">{{ city }}</view>
					</view>
				</block>
				<view class="input-view">
					<tui-icon name="search" color="#666666" size="20"></tui-icon>
					<input confirm-type="search" class="input" type="text" placeholder="搜索" @confirm="confirm">
				</view>
			</uni-nav-bar>
		</view>

		<view>
			<scroll-view scroll-x scroll-with-animation class="tab-view" :scroll-left="scrollLeft">
				<view v-for="(item,index) in tabbar" :key="index" class="tab-bar-item" :class="[currentTab==index ? 'active' : '']"
				 :data-current="index" @tap.stop="swichNav">
					<text class="tab-bar-title">{{item}}</text>
				</view>
			</scroll-view>

			<scroll-view scroll-y class="scoll-y">
				<view class="list-view">
					<view class="swiper" v-if="currentTab == 0">
						<view class="swiper-box">
							<swiper circular="true" autoplay="true" @change="swiperChange">
								<swiper-item v-for="swiper in swiperList" :key="swiper.id">
									<image :src="swiper.img" mode="aspectFill" @tap="toSwiper(swiper)"></image>
								</swiper-item>
							</swiper>
							<view class="indicator">
								<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
							</view>
						</view>
					</view>

					<view class="sub-category" v-if="currentTab > 0">
						<uni-grid :column="5" :show-border="false" :square="false" @change="change">
							<uni-grid-item v-for="subItem in subCategory" :key="subItem">
								<image class="sub-image" src="/static/logo.png" mode="aspectFill" />
								<text class="sub-text">夹克</text>
							</uni-grid-item>
						</uni-grid>
					</view>

					<view class="banner-container">
						<image src="/static/img/laopo/4.png" mode="aspectFill"></image>
					</view>

					<view class="title-devider">
						<text>热门商品</text>
					</view>

					<view class="goods-list">
						<view class="product-list">
							<view class="product" v-for="(goods) in goodsList" :key="goods.goods_id" @tap="toGoods(goods)">
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
			</scroll-view>

		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import tuiIcon from '@/components/icon/icon.vue'

	export default {
		components: {
			uniNavBar,
			uniIcon,
			tuiIcon,
			uniGrid,
			uniGridItem
		},
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
				],
				subCategory: [{
					name: '夹克',
					thumb: '/static/logo.png',
				}],
				city: '常州',
				currentSwiper: 0,
				// 轮播图片
				swiperList: [{
						id: 1,
						src: 'url1',
						img: '/static/img/1.jpg'
					},
					{
						id: 2,
						src: 'url2',
						img: '/static/img/2.jpg'
					},
					{
						id: 3,
						src: 'url3',
						img: '/static/img/3.jpg'
					}
				],
				tabbar: [
					'热门',
					'美食',
					'男装',
					'女装',
					'数码',
					'箱包',
					'百货',
					'美妆',
					'家居'
				],
				winHeight: "", //窗口高度
				currentTab: 0, //预设当前项的值
				scrollLeft: 0 //tab标题的滚动条位置
			}
		},
		onLoad() {
			let that = this;
			//  高度自适应
			uni.getSystemInfo({
				success: function(res) {
					let calc = res.windowHeight - res.statusBarHeight - 44;
					that.winHeight = calc;
				}
			});

		},
		methods: {
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
		},
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
		width: 66%;
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

	.uni-navbar--shadow {
		-webkit-box-shadow: 0 1px 2px #ccc;
		box-shadow: 0 0.5px 2px #ccc;
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
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
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
		text{
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
			padding: 0 4% 3vw 4%;
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
