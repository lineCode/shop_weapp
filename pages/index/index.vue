<template>
	<view>
		<view>
			<uni-nav-bar :status-bar="true" :fixed="true" color="#333333" :shadow="false" background-color="#FFFFFF">
				<block slot="left">
					<view class="city">
						<uni-icon type="location-filled" color="#0177BF" size="16" />
						<view>{{ city }}</view>
					</view>
				</block>
				<view class="input-view">
					<uni-icon type="search" size="22" color="#666666" />
					<input confirm-type="search" class="input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
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
			<swiper class="tab-content" :current="currentTab" duration="300" @change="switchTab" :style="{height:winHeight+'px'}">
				<swiper-item v-for="(item,index) in tabbar" :key="index">
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
							<view class="category-list">
								<view class="category" v-for="(row, index) in categoryList" :key="index">
									<view class="img">
										<image :src="row.img"></image>
									</view>
									<view class="text">{{ row.name }}</view>
								</view>
							</view>
							<view class="banner-container">
								<image src="/static/img/laopo/4.png" mode="aspectFill"></image>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default {
		components: {
			uniNavBar,
			uniIcon
		},
		data() {
			return {
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
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff
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
		border-bottom: 4upx solid #e54d42;
	}

	.active .tab-bar-title {
		color: #e54d42 !important;
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
			width: 100%;
			height: 35.7vw;
			margin-top: 2rpx;
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
	
	.banner-container{
		image{
			width: 100%;
			height: 17vh;
		}
	}
</style>
