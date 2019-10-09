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
			<view style="height: 60rpx;width: 100%;"></view>
			<view class="goods-list">
				<view class="product-list">
					<view class="product grace-box-shadow" v-for="item in list" :key="item.id" @tap="toProduct(item.id)">
						<image mode="aspectFill" :src="item.thumb"></image>
						<view class="name">{{item.name}}</view>
						<view>
							<!-- 这里放评分 -->
						</view>
						<view class="info">
							<view class="hangye">某行业</view>
							<view class="slogan">商圈人付款</view>
						</view>
					</view>
				</view>
				<view class="loading-text">{{loadingText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SearchHeader from '@/components/layouts/SearchHeader.vue';
	export default {
		components: {
			SearchHeader
		},
		data() {
			return {
				category: [],
				currentTab: 0,
				hasMore: 0,
				list: []
			}
		},
		onLoad() {
			this.getCategory()
			this.getList()
		},
		methods: {
			getList() {
				uni.request({
					url: getApp().globalData.api + 'store/index',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						category_id: this.currentTab
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.list = res.data.data.list
						this.hasMore = res.data.data.has_more
					}
				});
			},
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {

				let cur = e.currentTarget.dataset.current; //cur ： 一级分类编号

				if (this.currentTab == cur) {
					return false;
				} else {
					this.currentTab = cur
					this.getList(cur)
				}
			},
			getCategory() {
				uni.request({
					url: getApp().globalData.api + 'category/index',
					method: 'GET',
					data: {
						parent: 2,
						open_id: uni.getStorageSync('open_id')
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.category = res.data.data
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	
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
	
	.goods-list {
		padding-top: 30rpx;
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
					
					.hangye{
						color: #807c87;
						font-size: 24upx;
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
