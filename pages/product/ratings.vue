<template>
	<view>
		<common-header title="用户评论"></common-header>
		<view class="content">
			<view class="list">
				<view class="row" v-for="item in list" :key="item.id">
					<view class="left">
						<view class="face">
							<image :src="item.avatar"></image>
						</view>
					</view>
					<view class="right">
						<view class="name-date">
							<view class="username">
								{{item.nickname}}
							</view>
							<view class="date">
								{{item.date}}
							</view>
						</view>
						<view class="spec">

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
			</view>
		</view>
	</view>
</template>

<script>
	import CommonHeader from '@/components/layouts/CommonHeader.vue';

	export default {
		components: {
			CommonHeader
		},
		data() {
			return {
				list: []
			};
		},
		onLoad(e) {
			this.getList(e.id)
		},
		methods: {
			getList(id) {
				uni.request({
					url: getApp().globalData.api + 'product/evalue-list',
					method: 'GET',
					data: {
						open_id: uni.getStorageSync('open_id'),
						product_id: id
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.list = res.data.data.list
					}
				});
			},
			showBigImg(src, srclist) {
				uni.previewImage({
					current: src,
					urls: srclist
				});
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.myVideo {
		position: fixed;
		top: 50%;
		right: 100%;
	}

	.content {
		view {
			display: flex;
		}

		width: 94%;
		padding: 0 3%;

		.label {
			width: 100%;
			flex-wrap: wrap;

			view {
				padding: 0 20upx;
				height: 50upx;
				border-radius: 40upx;
				border: solid 1upx #ddd;
				align-items: center;
				color: #555;
				font-size: 26upx;
				background-color: #f9f9f9;
				margin: 10upx 20upx 10upx 0;

				&.on {
					border: solid 1upx #f06c7a;
					color: #f06c7a;
				}
			}
		}

		.list {
			width: 100%;
			flex-wrap: wrap;
			padding: 20upx 0;

			.row {
				width: 100%;
				margin-top: 30upx;
				padding-bottom: 30rpx;
				border-bottom: 1rpx solid #F2F6FC;

				.left {
					width: 10vw;
					flex-shrink: 0;
					margin-right: 10upx;

					.face {
						width: 100%;

						image {
							width: 10vw;
							height: 10vw;
							border-radius: 100%;
						}

					}
				}

				.right {
					width: 100%;
					flex-wrap: wrap;

					.name-date {
						width: 100%;
						justify-content: space-between;
						align-items: baseline;

						.username {
							font-size: 32upx;
							color: #555;
						}

						.date {
							font-size: 28upx;
							color: #aaa;
						}
					}

					.spec {
						width: 100%;
						color: #aaa;
						font-size: 26upx;
					}

					.first {
						width: 100%;
						flex-wrap: wrap;

						.rat {
							font-size: 30upx;
						}

						.img-video {
							width: 100%;
							flex-wrap: wrap;

							.box {
								width: calc((84.6vw - 50upx)/4);
								height: calc((84.6vw - 50upx)/4);
								margin: 5upx 5upx;
								position: relative;
								justify-content: center;
								align-items: center;

								image {
									position: absolute;
									width: 100%;
									height: 100%;
									border-radius: 10upx;
								}

								.playbtn {
									position: absolute;

									.icon {
										font-size: 80upx;
										color: rgba(255, 255, 255, .9)
									}
								}
							}
						}
					}

					.append {
						width: 100%;
						flex-wrap: wrap;

						.date {
							width: 100%;
							height: 40upx;
							border-left: 10upx solid #f06c7a;
							padding-left: 10upx;
							align-items: center;
							font-size: 32upx;
							margin: 20upx 0;
						}

						.rat {
							font-size: 30upx;
						}

						.img-video {
							width: 100%;
							flex-wrap: wrap;

							.box {
								width: calc((84.6vw - 10upx - (10upx * 4))/4);
								height: calc((84.6vw - 10upx - (10upx * 4))/4);
								margin: 5upx 5upx;
								position: relative;
								justify-content: center;
								align-items: center;

								image {
									position: absolute;
									width: 100%;
									height: 100%;
									border-radius: 10upx;
								}

								.playbtn {
									position: absolute;

									.icon {
										font-size: 80upx;
										color: rgba(255, 255, 255, .9);
									}
								}
							}
						}
					}
				}
			}
		}
	}

	/*
* <view class="list">
				<view class="row">

					<view class="right">
						
						<view class="spec">
							规格：XL
						</view>
						<view class="first">
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
									<view class="playbtn">
										<view class="icon bofang"></view>
									</view>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
						<view class="append">
							<view class="date">
								65天后追加
							</view>
							<view class="rat">
								好看，可以，不愧是专业的，才拿到手上就研究了半天才装上
							</view>
							<view class="img-video">
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
								<view class="box">
									<image src="https://ae01.alicdn.com/kf/HTB1wREwTXzqK1RjSZFvq6AB7VXaT.jpg"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			* 
			* */
</style>
