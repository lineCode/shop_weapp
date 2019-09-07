<template>
	<view>
		<view class="header-bar">
			<uni-nav-bar :status-bar="true" :fixed="true" color="#333333" :shadow="false" background-color="#0177BF">
				<block slot="left">
					<view class="city">
						<uni-icon type="location-filled" color="#ffffff" size="18" />
						<view class="location-text">{{ city }}</view>
					</view>
				</block>
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666" />
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
			<!-- <swiper class="tab-content" :current="currentTab" duration="0" @change="switchTab" :style="{height:winHeight+'px'}"> -->
			<!-- <swiper-item v-for="(item,index) in tabbar" :key="index"> -->
			<view v-if="currentTab == 0">
				<scroll-view scroll-y class="scoll-y">
					<view class="list-view">
						<view class="swiper">
							<view class="swiper-box">
								<swiper circular="true" autoplay="true" @change="swiperChange">
									<swiper-item v-for="swiper in swiperList" :key="swiper.id">
										<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
									</swiper-item>
								</swiper>
								<view class="indicator">
									<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
								</view>
							</view>
						</view>

						<view class="banner-container">
							<image src="/static/img/laopo/4.png" mode="aspectFill"></image>
						</view>

						<!-- 商品列表 -->
						<view class="goods-list">
							<view class="title">
								<image src="/static/img/hua.png"></image>
								猜你喜欢
								<image src="/static/img/hua.png"></image>
							</view>
							<view class="product-list">
								<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
									<image mode="widthFix" :src="product.img"></image>
									<view class="name">{{ product.name }}</view>
									<view class="info">
										<view class="price">{{ product.price }}</view>
										<view class="slogan">{{ product.slogan }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view v-if="currentTab > 0">
				<scroll-view scroll-y class="scoll-y">
					<view class="list-view">
						<view class="sub-category">
							<uni-grid :column="5" :show-border="false" :square="false" @change="change" >
								<uni-grid-item v-for="subItem in subCategory" :key="subItem">
									<image class="sub-image" src="/static/logo.png" mode="aspectFill" />
									<text class="sub-text">夹克</text>
								</uni-grid-item>								
							</uni-grid>
						</view>

						<view class="banner-container">
							<image src="/static/img/laopo/4.png" mode="aspectFill"></image>
						</view>
						<view class="zhanwei"></view>
						<!-- 商品列表 -->
						<view class="goods-list">
							<view class="product-list">
								<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
									<image mode="widthFix" :src="product.img"></image>
									<view class="name">{{ product.name }}</view>
									<view class="info">
										<view class="price">{{ product.price }}</view>
										<view class="slogan">{{ product.slogan }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- </swiper-item> -->
			<!-- </swiper> -->
		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	
	export default {
		components: {
			uniNavBar,
			uniIcon,
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				subCategory: [
					{
						name: '夹克',
						thumb: '/static/logo.png',
					}
				],
				//猜你喜欢列表
				productList: [{
						goods_id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: '/static/img/goods/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: '/static/img/goods/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: '/static/img/goods/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: '/static/img/goods/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: '/static/img/goods/p6.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: '/static/img/goods/p7.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: '/static/img/goods/p8.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 8,
						img: '/static/img/goods/p9.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 9,
						img: '/static/img/goods/p10.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				],
				title: 'Hello',
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
					'休闲娱乐',
					'丽人',
					'美食',
					'酒店住宿',
					'服装',
					'数码',
					'箱包',
					'鞋靴',
					'美妆',
					'车品',
					'婚纱摄影',
					'装修',
					'五金'
				],
				// 分类菜单
				categoryList: [{
						id: 1,
						name: '限时秒杀',
						img: '/static/img/activity/1.png'
					},
					{
						id: 2,
						name: '拼团抢购',
						img: '/static/img/activity/2.png'
					},
					{
						id: 3,
						name: '疯狂砍价',
						img: '/static/img/activity/3.png'
					},
					{
						id: 4,
						name: '领券中心',
						img: '/static/img/activity/4.png'
					},
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
	
	.zhanwei{
		height: 30rpx;
	}
	
	.goods-list {

		// background-color: #f4f4f4;
		.title {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			color: #f47825;
			font-size: 30upx;
			margin-top: 10upx;

			image {
				width: 30upx;
				height: 30upx;
			}
		}

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
			width: 92%;
			padding: 0 4% 3vw 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
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

	.title-devider {
		height: 40rpx;
		width: 94%;
		margin: auto;
		margin-top: 16rpx;

		text {
			font-size: 32rpx;
			font-weight: 600;
		}
	}

	.product-container {
		width: 94%;
		margin: auto;
	}

	.location-text {
		color: #ffffff;
		font-weight: 600;
		font-size: 36rpx;
	}

	.header-bar {
		background: #0177BF;
	}

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #f5f5f9
	}

	view {
		font-size: 28upx;
		line-height: inherit
	}

	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
		white-space: nowrap;
	}

	.input-view {
		width: 66%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
		background: #f5f5f5;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 94%;
		padding: 0 3%;
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
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
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
			width: 94%;
			height: 35.7vw;
			margin-top: 18rpx;
			border-radius: 20rpx;
			overflow: hidden;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 35.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 35.7vw;
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

	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.category {
			width: 25%;
			margin-top: 20rpx;
			display: flex;
			flex-wrap: wrap;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					border-radius: 50%;
					width: 14vw;
					height: 14vw;
				}
			}

			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}

	.banner-container {
		width: 94%;
		margin: auto;
		margin-top: 20rpx;

		image {
			width: 100%;
			height: 14vh;
			border-radius: 20rpx;
		}
	}
	
	.sub-image{
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
	}
	
	.sub-text{
		font-size: 28rpx;
	}
</style>
