<template>
	<view>
		<common-header :title="title"></common-header>
		<view class="status" :style="{ opacity: afterHeaderOpacity }"></view>
		<view class="header">
			<!-- 头部-默认显示 -->
			<view class="before" :style="{ opacity: 1 - afterHeaderOpacity, zIndex: beforeHeaderzIndex }">
				<view class="middle"></view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>
					<view class="icon cart" @tap="joinCart"></view>
				</view>
			</view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="middle">
					<view v-for="(anchor,index) in anchorlist" :class="[selectAnchor==index ?'on':'']" :key="index" @tap="toAnchor(index)">{{anchor.name}}</view>
				</view>
				<view class="icon-btn">
					<view class="icon tongzhi" @tap="toMsg"></view>
					<view class="icon cart" @tap="joinCart"></view>
				</view>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<button class="box" style="background: #ffffff;position:static;line-height: 1.2;width: 72rpx;padding: 0;padding-top: 2rpx" open-type="share">
					<view class="box">
						<view class="icon fenxiang"></view>
						<view class="text">分享</view>
					</view>
				</button>
				<view class="box" @tap="toChat">
					<view class="icon kefu"></view>
					<view class="text">客服</view>
				</view>
				<view class="box" @tap="collect">
					<view class="icon" :class="[info.is_collect == 1 ?'shoucangsel':'shoucang']"></view>
					<view class="text">{{info.is_collect == 1 ? '已':''}}收藏</view>
				</view>
				<view class="box" @tap="goCart">
					<view class="icon cart"></view>
					<view class="text">购物车</view>
				</view>
			</view>
			<view class="btn">
				<view class="joinCart" @tap="joinCart">加入购物车</view>
				<view class="buy" @tap="buy">立即购买</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="discard" @tap="hideSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @tap.stop="discard">
				<view class="content">
					<view class="title">选择规格：</view>
					<view class="sp">
						<view v-for="item in info.skus" :class="[item.id==selectSpec?'on':'']" @tap="setSelectSpec(item.id)" :key="item.id">{{item.title}}</view>
					</view>
					<view class="length" v-if="selectSpec!=null">
						<view class="text">数量</view>
						<view class="number">
							<view class="sub" @tap.stop="sub">
								<view class="icon jian"></view>
							</view>
							<view class="input" @tap.stop="discard">
								<input type="number" v-model="number" />
							</view>
							<view class="add" @tap.stop="add">
								<view class="icon jia"></view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn">
					<view class="button" @tap="hideSpec">完成</view>
				</view>
			</view>
		</view>
		<!-- 商品主图轮播 -->
		<view class="swiper-box">
			<view style="width: 750rpx;height: 750rpx;">
				<image mode="aspectFill" style="height: 750rpx;width: 750rpx;" :src="info.thumb"></image>
			</view>
		</view>
		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{info.price}}</view>
			<view class="title">
				{{info.name}}
			</view>
		</view>
		<!-- 评价 -->
		<view class="info-box comments" id="comments" v-if="info.evalue.id > 0">
			<view class="row">
				<view class="text">商品评价</view>
				<view class="arrow" @tap="toEvalues(info.id)">
					<view class="show">
						查看全部
						<view class="icon xiangyou"></view>
					</view>
				</view>
			</view>
			<view class="comment" @tap="toEvalues(info.id)">
				<view class="user-info">
					<view class="face">
						<image :src="info.evalue.avatar"></image>
					</view>
					<view class="username">{{info.evalue.nickname}}</view>
				</view>
				<view class="content">
					{{info.evalue.content}}
				</view>
			</view>
		</view>

		<view class="grace-card-view grace-margin-top">
			<view class="body" style="padding-bottom: 0;border-bottom: none;">
				<view class="img">
					<image :src="info.store_logo" mode="aspectFill" />
				</view>
				<view class="desc">
					<view class="title">{{info.store_name}}</view>
					<view class="text">{{info.store_collect}}人收藏</view>
					<view class="text">商品数量：{{info.store_product_num}}</view>
				</view>
				<view style="padding-top: 40rpx;">
					<button type="primary" style="width: 180rpx;" size="mini" class="grace-button  grace-gtbg-blue-sky" @tap="goStore(info.store_id)">进店逛逛</button>
				</view>
			</view>
		</view>
		<!-- 详情 -->
		<view class="description" style="margin-bottom: 120rpx;">
			<view class="title">———— 商品详情 ————</view>
			<view class="content" style="background: #FFFFFF;padding: 20rpx;">
				<rich-text :nodes="info.content"></rich-text>
			</view>
		</view>
		<graceFullLoading :graceFullLoading="loading" logoUrl="https://staticimgs.oss-cn-beijing.aliyuncs.com/logo.png"></graceFullLoading>
	</view>
</template>

<script>
	import CommonHeader from '@/components/layouts/CommonHeader.vue';
	import graceFullLoading from "@/graceUI/components/graceFullLoading.vue"

	export default {
		components: {
			CommonHeader,
			graceFullLoading
		},
		data() {
			return {
				info: {},
				loading: true,
				specClass: '', //规格弹窗css类，控制开关动画
				selectSpec: null, //选中规格
				title: '',
				number: 1
			};
		},
		onLoad(e) {
			this.getInfo(e.id)
		},
		onReady() {
			//计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
		},
		methods: {
			goCart() {
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			getInfo(id) {
				uni.request({
					url: getApp().globalData.api + 'product/info',
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
						this.title = res.data.data.name
						var richtext = this.info.content
						const regex = new RegExp('<img', 'gi')
						this.info.content = richtext.replace(regex, '<img style="max-width: 100%;"')
						this.loading = false
					},
					fail: (res) => {
						this.loading = false
					}
				});
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			goStore(id) {
				uni.navigateTo({
					url: "/pages/store/online_store?id=" + id
				})
			},
			//消息列表
			toMsg() {
				uni.navigateTo({
					url: '/pages/chat/chat_info'
				})
			},
			// 客服
			toChat() {
				var chater_info = {
					username: 'kefu_' + this.info.id,
					nickName: this.info.store_name
				}
				uni.setStorage({
					key: 'chater_info',
					data: chater_info
				})
				uni.navigateTo({
					url: '/pages/chat/chat_info',
					animationDuration: 300
				})
			},
			// 分享
			share() {
				this.shareClass = 'show';
			},
			hideShare() {
				this.shareClass = 'hide';
				setTimeout(() => {
					this.shareClass = 'none';
				}, 150);
			},
			//收藏
			collect() {
				uni.request({
					url: getApp().globalData.api + 'product/collect',
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
			// 加入购物车
			joinCart() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						// 加入购物车
						uni.request({
							url: getApp().globalData.api + 'product/add-cart',
							method: 'POST',
							data: {
								open_id: uni.getStorageSync('open_id'),
								product_id: this.info.id,
								store_id: this.info.store_id,
								amount: this.number,
								product_sku_id: this.selectSpec,
							},
							header: {
								'content-type': 'application/json' //自定义请求头信息
							},
							success: (res) => {
								this.selectSpec = null
								if (res.data.code == 200) {
									uni.showToast({
										title: "已加入购物车"
									});
								} else {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									});
								}
							}
						});
					});
				}
				uni.showToast({
					title: "已加入购物车"
				});
			},
			//立即购买
			buy() {
				if (this.selectSpec == null) {
					return this.showSpec(() => {
						this.toConfirmation();
					});
				}
				this.toConfirmation();
			},
			//跳转确认订单页面
			toConfirmation() {
				let tmpList = [];
				let goods = {
					id: this.goodsData.id,
					img: '/static/logo.png',
					name: this.goodsData.name,
					spec: '规格:' + this.goodsData.spec[this.selectSpec],
					price: this.goodsData.price,
					number: this.goodsData.number
				};
				tmpList.push(goods);
				uni.setStorage({
					key: 'buylist',
					data: tmpList,
					success: () => {
						uni.navigateTo({
							url: '../order/confirmation'
						})
					}
				})
			},
			//跳转评论列表
			toEvalues(id) {
				uni.navigateTo({
					url: '/pages/product/ratings?id=' + id
				})
			},
			//选择规格
			setSelectSpec(id) {
				console.log(id)
				this.selectSpec = id;
			},
			//减少数量
			sub() {
				if (this.number <= 1) {
					return;
				}
				this.number--;
			},
			//增加数量
			add() {
				this.number++;
			},
			//跳转锚点
			toAnchor(index) {
				this.selectAnchor = index;
				uni.pageScrollTo({
					scrollTop: this.anchorlist[index].top,
					duration: 200
				});
			},
			//计算锚点高度
			calcAnchor() {
				this.anchorlist = [{
						name: '主图',
						top: 0
					},
					{
						name: '评价',
						top: 0
					},
					{
						name: '详情',
						top: 0
					}
				]
				let commentsView = uni.createSelectorQuery().select("#comments");
				commentsView.boundingClientRect((data) => {
					let statusbarHeight = 0;
					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight()
					// #endif
					let headerHeight = uni.upx2px(100);
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;

				}).exec();
			},
			//返回上一页
			back() {
				uni.navigateBack();
			},
			//规格弹窗
			showSpec(fun) {
				console.log('show');
				this.specClass = 'show';
				this.specCallback = fun;
			},
			specCallback() {
				return;
			},
			//关闭规格弹窗
			hideSpec() {
				this.specClass = 'hide';
				//回调

				this.selectSpec && this.specCallback && this.specCallback();
				this.specCallback = false;
				setTimeout(() => {
					this.specClass = 'none';
				}, 200);
			},
			discard() {
				//丢弃
			}
		}
	};
</script>

<style lang="scss">
	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(-100%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(-100%);
		}

		100% {
			transform: translateY(0);
		}
	}

	.icon {
		font-size: 26upx;
	}

	.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		background-color: #f1f1f1;
		transition: opacity 0.05s linear;
	}

	.header {
		width: 100%;

		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);

		/*  #endif  */
		.before,
		.after {
			width: 92%;
			padding: 0 4%;
			height: 100upx;
			display: flex;
			align-items: center;
			position: fixed;
			top: 0;
			/*  #ifdef  APP-PLUS  */
			top: var(--status-bar-height);
			/*  #endif  */
			transition: opacity 0.05s linear;

			.back {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;

				.icon {
					margin-left: -10%;
					width: 60upx;
					height: 60upx;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 42upx;
				}
			}

			.middle {
				width: 100%;
			}

			.icon-btn {
				width: 125upx;
				height: 60upx;
				flex-shrink: 0;
				display: flex;

				.icon {
					&:first-child {
						margin-right: 5upx;
					}

					width: 60upx;
					height: 60upx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42upx;
				}
			}
		}

		.before {
			.back {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;
				}
			}

			.icon-btn {
				.icon {
					color: #fff;
					background-color: rgba(0, 0, 0, 0.2);
					border-radius: 100%;

				}
			}
		}

		.after {
			background-color: #f1f1f1;

			.back {
				.icon {
					color: #666;
				}
			}

			.icon-btn {
				.icon {
					color: #666;
				}
			}

			.middle {
				font-size: 32upx;
				height: 90upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 7%;

				view {
					width: (100%/3);
					padding: 0 3%;
					margin: 0 3%;
					display: flex;
					justify-content: center;
					align-items: center;

					&.on {
						margin-bottom: -4upx;
						color: #f47952;
						border-bottom: solid 4upx #f47952;
					}
				}
			}
		}
	}

	.swiper-box {
		position: relative;
		width: 750rpx;
		height: 750rpx;

		swiper {
			width: 750rpx;
			height: 750rpx;

			swiper-item {
				image {
					width: 750rpx;
					height: 750rpx;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}

		.title {
			font-size: 30upx;
		}
	}

	.spec {
		.row {
			width: 100%;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 24upx;
				color: #a2a2a2;
				margin-right: 20upx;
			}

			.content {
				font-size: 28upx;
				display: flex;
				flex-wrap: wrap;

				.serviceitem {
					margin-right: 10upx;
				}

				.sp {
					width: 100%;
					display: flex;

					view {
						background-color: #f6f6f6;
						padding: 5upx 10upx;
						color: #999;
						margin-right: 10upx;
						font-size: 20upx;
						border-radius: 5upx;

						&.on {
							border: solid 1upx #f47952;
							padding: 4upx 8upx;
						}
					}
				}
			}

			.arrow {
				position: absolute;
				right: 4%;

				.icon {
					color: #ccc;
				}
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 26upx;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.buy {
				background-color: #f06c7a;
			}
		}
	}

	.popup {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 20;
		display: none;

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 21;
			background-color: rgba(0, 0, 0, 0.6);
		}

		.layer {
			position: fixed;
			z-index: 22;
			bottom: -70%;
			width: 92%;
			padding: 0 4%;
			height: 70%;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;
			align-content: space-between;

			.content {
				width: 100%;
				padding: 20upx 0;
			}

			.btn {
				width: 100%;
				height: 100upx;

				.button {
					width: 100%;
					height: 80upx;
					border-radius: 40upx;
					color: #fff;
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: #f47952;
					font-size: 28upx;
				}
			}
		}

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		&.service {
			.row {
				margin: 30upx 0;

				.title {
					font-size: 30upx;
					margin: 10upx 0;
				}

				.description {
					font-size: 28upx;
					color: #999;
				}
			}
		}

		&.spec {
			.title {
				font-size: 30upx;
				margin: 30upx 0;
			}

			.sp {
				display: flex;

				view {
					font-size: 28upx;
					padding: 5upx 20upx;
					border-radius: 8upx;
					margin: 0 30upx 20upx 0;
					background-color: #f6f6f6;

					&.on {
						padding: 3upx 18upx;
						border: solid 1upx #f47925;
					}
				}
			}

			.length {
				margin-top: 30upx;
				border-top: solid 1upx #aaa;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-top: 20upx;

				.text {
					font-size: 30upx;
				}

				.number {
					display: flex;
					justify-content: center;
					align-items: center;

					.input {
						width: 80upx;
						height: 60upx;
						margin: 0 10upx;
						background-color: #f3f3f3;
						display: flex;
						justify-content: center;
						align-items: center;
						text-align: center;

						input {
							width: 80upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;
							text-align: center;
							font-size: 26upx;
						}
					}

					.sub,
					.add {
						width: 60upx;
						height: 60upx;
						background-color: #f3f3f3;
						border-radius: 5upx;

						.icon {
							font-size: 30upx;
							width: 60upx;
							height: 60upx;
							display: flex;
							justify-content: center;
							align-items: center;

						}
					}
				}
			}

		}
	}

	.share {
		display: none;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.15s linear both;
			}

			.layer {
				animation: showLayer 0.15s linear both;
			}
		}

		&.hide {
			display: block;

			.mask {
				animation: hidePopup 0.15s linear both;
			}

			.layer {
				animation: hideLayer 0.15s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			background-color: rgba(0, 0, 0, .5);
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			z-index: 11;
		}

		.layer {
			width: 92%;
			position: fixed;
			z-index: 12;
			padding: 0 4%;
			top: 100%;
			background-color: rgba(255, 255, 255, 0.9);

			.list {
				width: 100%;
				display: flex;
				padding: 10upx 0 30upx 0;

				.box {
					width: 25%;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					image {
						width: 13.8vw;
						height: 13.8vw;
					}

					.title {
						margin-top: 10upx;
						display: flex;
						justify-content: center;
						width: 100%;
						font-size: 26upx;
					}
				}
			}

			.btn {
				width: 100%;
				height: 100upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28upx;
				border-top: solid 1upx #666666;
			}

			.h1 {
				width: 100%;
				height: 80upx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 34upx;
			}
		}
	}
</style>
