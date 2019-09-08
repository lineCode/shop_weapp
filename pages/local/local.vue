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

			<view>
				<scroll-view scroll-y class="scoll-y">
					<view class="list-view">
						<view class="zhanwei"></view>
						<!-- 商品列表 -->
						<view class="goods-list">
							<view class="product-list">
								<view class="product" v-for="store in storeList" :key="store.id" @tap="toStore(store.id)">
									<image mode="aspectFill" :src="store.img"></image>
									<view class="name">{{ store.name }}</view>
									<view class="info">
										<view class="price">{{ store.price }}</view>
										<view class="slogan">{{ store.slogan }}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import tuiIcon from '@/components/icon/icon.vue'
	
	export default {
		components: {
			uniNavBar,
			tuiIcon
		},
		data() {
			return {
				//猜你喜欢列表
				storeList: [{
						id: 0,
						img: '/static/img/goods/p1.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 1,
						img: '/static/img/goods/p2.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 2,
						img: '/static/img/goods/p3.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 3,
						img: '/static/img/goods/p4.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 4,
						img: '/static/img/goods/p5.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 5,
						img: '/static/img/goods/p6.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 6,
						img: '/static/img/goods/p7.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						id: 7,
						img: '/static/img/goods/p8.jpg',
						name: '商品名称商品名称商品名称商品名称商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				],
				city: '常州',
				currentSwiper: 0,
				tabbar: [
					'全部',
					'休闲娱乐',
					'丽人',
					'美食',
					'酒店',
					'装修',
					'超市'
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
			},
			toStore(id) {
				uni.navigateTo({
					url: "/pages/local/store_info"
				})
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
	
	.zhanwei {
		height: 30rpx;
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
