<template>
	<view>
		<common-header title="商家信息"></common-header>

		<!-- 商家banner图 -->
		<view class="store-banner">
			<image :src="info.thumb" mode="aspectFill"></image>
		</view>

		<!-- 头部商家信息 -->
		<view class="go-store">
			<view class="right-part">
				<view class="store-name">{{info.name}}</view>
				<view class="store-num" style="margin-top: 10rpx;">
					<view style="display: inline-block;width: 400rpx;">
						<graceStar :starnum="info.rate" :cantap="false"></graceStar>
					</view>
					<view style="float: right;display: inline-block;height: 54rpx;width: 200rpx;">
						<text style="line-height: 54rpx;color: #606266;">人均：￥{{info.average_cost}}元</text>
					</view>
				</view>
			</view>
		</view>

		<view class="yingye">
			<view class="container">
				<p class="shijian">营业时间：{{info.open_time}}</p>
				<p class="fuli">
					<text v-for="item in info.fuli" :key="item">
						{{item}}
					</text>
				</p>
			</view>
		</view>

		<view class="location">
			<text style="font-size: 30rpx;line-height: 80rpx;margin-left: 25rpx;">{{info.address}}</text>
		</view>

		<view class="offline-list" style="margin-top: 20rpx;background: #FFFFFF;">
			<view class="product" v-for="item in list" :key="item.id" @tap="toProduct(item.id)" style="padding: 20rpx;position: relative;border-bottom: 2rpx solid #EBEEF5;">
				<view style="display: inline-block;width: 180rpx;height: 180rpx;">
					<image mode="aspectFill" :src="item.thumb" style="width: 180rpx;height: 180rpx;border-radius: 20rpx;"></image>
				</view>
				<view style="display: inline-block;height: 180rpx;padding-left: 20rpx;position: absolute;top: 20rpx;">
					<view class="name" style="height: 70rpx;">
						<text style="line-height: 70rpx;font-size: 34rpx;font-weight: 500;">{{item.name}}</text>
					</view>
					<view class="slogan" style="height: 54rpx;">
						<text style="line-height: 54rpx;font-size: 32rpx;">
							已售 {{item.sold}}
						</text>
					</view>
					<view class="slogan" style="height: 54rpx;">
						<text style="line-height: 54rpx;font-size: 32rpx;color: #F56C6C;">
							￥{{item.price}}
						</text>
					</view>
				</view>
				<view style="display: inline-block;width: 180rpx;height: 180rpx;float: right;position: relative;">
					<button size="mini" style="position: absolute;bottom: 0;right: 20rpx;height: 60rpx;width: 180rpx;" type="warn"
					 class="grace-button">立即购买</button>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<view class="info-box comments" style="background: #FFFFFF;margin-top: 30rpx;padding-left: 30rpx;margin-bottom: 120rpx;"
		 id="comments" v-if="info.evalue.length > 0">
			<view class="row" style="width: 100%;
			height: 50upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;
			padding-top: 6rpx;">
				<view class="text" style="font-size: 30upx;">用户评价</view>
				<view class="arrow" style="font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;" @tap="toEvalues(info.id)">
					<view class="show" style="display: flex;
					align-items: center;">
						查看全部
						<view class="icon xiangyou" style="color: #17e6a1;font-size: 30rpx;"></view>
					</view>
				</view>
			</view>
			<view class="comment" style="width: 100%;padding-bottom: 20rpx;" @tap="toEvalues(info.id)" v-for="item in info.evalue"
			 :key="item.id">
				<view class="user-info" style="width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;">
					<view class="face" style="width: 40upx;
					height: 40upx;
					margin-right: 8upx;">
						<image :src="item.avatar" style="width: 40upx;
						height: 40upx;
						border-radius: 100%;"></image>
					</view>
					<view class="username" style="font-size: 24upx;
					color: #999;">{{item.nickname}}</view>
				</view>
				<view class="first">
					<view class="rat" style="margin-bottom:10rpx;">
						{{item.content}}
					</view>
					<view class="img-video" v-if="item.attaches.length > 0">
						<view class="box" v-for="attach in item.attaches" @tap="showBigImg(attach.url,item.attach_urls)" :key="attach.url">
							<image mode="aspectFill" :src="attach.url"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-footer" style="bottom:0;height: 86rpx">
			<view class="icon-btn" style="width: 33%;margin-bottom: 0;" @click="collect">
				<view class="grace-icons icon-shoucang active" style="text-align: center;font-size: 38rpx;" v-if="info.is_collect == 1"></view>
				<view class="grace-icons icon-shoucang active" style="text-align: center;font-size: 38rpx;" v-if="info.is_collect != 1"></view>
				<view class="text active">{{info.is_collect == 1 ? '已':''}}收藏</view>
			</view>
			<view class="icon-btn" style="width: 33%;margin-bottom: 0;">
				<view class="grace-icons icon-kf3 active" style="text-align: center;font-size: 38rpx;"></view>
				<view class="text active">咨询</view>
			</view>
			<view class="icon-btn" style="width: 33%;margin-bottom: 0;">
				<view class="grace-icons icon-share3 active" style="text-align: center;font-size: 38rpx;"></view>
				<view class="text active">分享</view>
			</view>
		</view>
		<graceFullLoading :graceFullLoading="loading" logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"></graceFullLoading>
	</view>
</template>

<script>
	import CommonHeader from '@/components/layouts/CommonHeader.vue'
	import graceFullLoading from "@/graceUI/components/graceFullLoading.vue"
	import graceStar from '@/graceUI/components/graceStar.vue'

	export default {
		components: {
			CommonHeader,
			graceFullLoading,
			graceStar
		},
		data() {
			return {
				loading: true,
				info: {},
				list: [],
				currentOrder: 0,
				orderType: 0,
			}
		},
		onLoad(e) {
			this.getInfo(e.id)
			this.getList(e.id)
		},
		methods: {
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
						this.info.is_collect = this.info.is_collect == 1 ? 0 : 1;
					}
				});
			},
			toEvalues(store_id) {
				uni.navigateTo({
					url: '/pages/product/ratings?store_id=' + store_id
				})
			},
			changeOrder(current) {
				let type = this.orderType
				if (current == this.currentOrder) {
					if (type == 0) {
						this.currentOrder = current
						this.orderType = 2
					} else if (type == 2) {
						this.currentOrder = current
						this.orderType = 1
					} else if (type == 1) {
						this.currentOrder = 0
						this.orderType = 0
					}
				} else {
					this.currentOrder = current
					this.orderType = 2
				}

				this.getList(this.info.id)
			},
			toProduct(id) {
				uni.navigateTo({
					url: "/pages/product/offline_product?id=" + id
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
	.first {
		.img-video {
			.box {
				display: inline-block;
				width: calc((84.6vw - 50upx)/4);
				height: calc((84.6vw - 50upx)/4);
				margin: 5upx 5upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10upx;
				}
			}
		}
	}

	.yingye {
		background: #FFFFFF;
		height: 130rpx;
		border-bottom: 2rpx solid #EBEEF5;

		.container {
			width: 700rpx;
			margin: auto;
			padding: 14rpx 0;

			.shijian {
				font-weight: 500;
				font-size: 34rpx;
			}

			.fuli {
				height: 60rpx;
				color: #409EFF;

				text {
					line-height: 60rpx;
					margin-right: 10rpx;
				}
			}
		}
	}

	.location {
		background: #FFFFFF;
		height: 80rpx;
		border-bottom: 2rpx solid #EBEEF5;
	}

	.go-store {
		background: #FFFFFF;
		height: 150rpx;
		border-bottom: 2rpx solid #DCDFE6;

		.right-part {
			width: 700rpx;
			margin: auto;
			height: 150rpx;
			padding: 14rpx 0;

			.store-name {
				font-weight: 500;
				font-size: 36rpx;
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
		image {
			width: 750rpx;
			height: 375rpx;
		}
	}
</style>
