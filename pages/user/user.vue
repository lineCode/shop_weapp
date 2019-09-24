<template>
	<view>
		<view class="header" v-bind:class="{'status':isH5Plus}">
			<view class="userinfo">
				<view class="face">
					<image :src="userinfo.face"></image>
				</view>
				<view class="info">
					<view class="username">{{userinfo.username}}</view>
					<view class="integral">积分:{{userinfo.integral}}</view>
				</view>
			</view>
			<view class="setting">
				<image src="../../static/HM-PersonalCenter/setting.png"></image>
			</view>
		</view>
		<view class="orders">

			<view class="box">
				<view class="label" v-for="(row,index) in orderTypeLise" :key="row.name" @tap="toOrderType(index)">
					<view class="icon">
						<!-- <view class="badge" v-if="row.badge>0">{{row.badge}}</view> -->
						<image :src="'/static/img/user-icon/'+row.icon"></image>
					</view>
					{{row.name}}
				</view>
			</view>
		</view>

		<view class="second-icons">

			<view class="box">
				<view class="label" v-for="(row,index) in secondTypeLise" :key="row.name" @tap="toInnerType(index)">
					<view class="icon">
						<!-- <view class="badge" v-if="row.badge>0">{{row.badge}}</view> -->
						<image :src="'/static/img/user-icon/'+row.icon"></image>
					</view>
					{{row.name}}
				</view>
			</view>
		</view>

		<view class="services">
			<view class="box">
				<view class="list" v-for="(list,list_i) in severList" :key="list_i">
					<view class="li" v-for="(li,li_i) in list" @tap="toServiceType(li_i)" v-bind:class="{'noborder':li_i==list.length-1}"
					 :key="li.name">
						<view class="icon">
							<image :src="'/static/img/user-icon/'+li.icon"></image>
						</view>
						<view class="text">{{li.name}}</view>
						<image class="to" src="/static/img/icon/to.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="version-info">
			<text>V1.0.0 江苏乐众旗下粉丝福利精选商城</text>
		</view>
		
	</view>
</template>
<script>
	import tuiModal from "@/components/modal/modal"
	export default {
		components:{
			tuiModal
		},
		data() {
			return {
				userinfo: {},
				showBind: false,
				orderTypeLise: [{
						name: '待付款',
						icon: 'daifukuan.png',
						badge: 2
					},
					{
						name: '待使用',
						icon: 'daishiyong.png',
						badge: 2
					},
					{
						name: '未收货',
						icon: 'weishouhuo.png',
						badge: 6
					},
					{
						name: '待点评',
						icon: 'daidianping.png',
						badge: 9
					}
				],
				secondTypeLise: [{
						name: '优惠券',
						icon: 'youhuiquan.png',
						badge: 2
					},
					{
						name: '商品收藏',
						icon: 'shangpinshoucang.png',
						badge: 2
					},
					{
						name: '店铺收藏',
						icon: 'dianpushoucang.png',
						badge: 2
					},
					{
						name: '退款售后',
						icon: 'tuikuanshouhou.png',
						badge: 6
					},
				],
				severList: [
					[{
							name: '全部订单',
							icon: 'quanbudingdan.png'
						}, {
							name: '在线充值',
							icon: 'chongzhi.png'
						},
						{
							name: '更改绑定',
							icon: 'genggaibangding.png'
						},
						{
							name: '余额明细',
							icon: 'yue.png'
						},
						{
							name: '地址管理',
							icon: 'dizhi.png'
						}
					]
				],
			};
		},
		onLoad() {
			//加载
			this.init();
		},
		methods: {
			init() {
				//用户信息
				this.userinfo = {
					face: '/static/img/face.jpg',
					username: "吕蒙",
					integral: "1435"
				}
			},
			toInnerType(index) {
				let url = ''
				if (index == 0) {
					url = "/pages/user/coupon"
				} else if (index == 1) {
					url = "/pages/user/product_collect"
				} else if (index == 2) {
					url = "/pages/user/store_collect"
				} else if (index == 3) {
					uni.makePhoneCall({
						phoneNumber: '18661139072'
					})
					return;
				}
				uni.navigateTo({
					url: url
				})
			},
			//用户点击订单类型
			toOrderType(index) {
				uni.navigateTo({
					url: "/pages/order/order_list?type=" + (index + 1)
				})
			},
			//用户点击列表项
			toServiceType(index) {
				let url = ''
				if (index == 0) {
					url = "/pages/order/order_list?type=0"
				} else if (index == 1) {
					url = "/pages/user/deposit"
				} else if (index == 2) {
					this.showBind = true
					return;
				} else if (index == 3) {
					url = "/pages/user/remain_money"
				} else if (index == 4) {
					url = "/pages/user/location_list"
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f9
	}

	.header {
		&.status {
			padding-top: var(--status-bar-height);
		}

		background-color:#0177BF;
		width:92%;
		height:30vw;
		padding:0 4%;
		display:flex;
		align-items:center;

		.userinfo {
			width: 90%;
			display: flex;

			.face {
				flex-shrink: 0;
				width: 15vw;
				height: 15vw;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%
				}
			}

			.info {
				display: flex;
				flex-flow: wrap;
				padding-left: 30upx;

				.username {
					width: 100%;
					color: #fff;
					font-size: 40upx
				}

				.integral {
					display: flex;
					align-items: center;
					padding: 0 20upx;
					height: 40upx;
					color: #fff;
					background-color: rgba(0, 0, 0, 0.1);
					border-radius: 20upx;
					font-size: 24upx
				}
			}
		}

		.setting {
			flex-shrink: 0;
			width: 6vw;
			height: 6vw;

			image {
				width: 100%;
				height: 100%
			}
		}
	}

	.hover {
		background-color: #eee
	}

	.services {
		width: 92%;
		padding: 0 4%;
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 98%;
			padding: 10rpx 1%;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 16upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.version-info {
		text-align: center;
		font-size: 30rpx;
		margin-bottom: 6rpx;
		color: #909399;
	}

	.second-icons {
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 9vw;
					height: 9vw;
					margin: 0 6vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 8vw;
						height: 8vw;
						z-index: 9;
					}
				}
			}
		}
	}

	.orders {
		background-color: #0177BF;
		width: 92%;
		height: 11vw;
		padding: 0 4%;
		margin-bottom: calc(11vw + 40upx);
		display: flex;
		align-items: flex-start;
		border-radius: 0 0 100% 100%;
		margin-top: -1upx;

		.box {
			width: 98%;
			padding: 0 1%;
			height: 22vw;
			background-color: #fefefe;
			border-radius: 24upx;
			box-shadow: 0 0 20upx rgba(0, 0, 0, 0.15);
			margin-bottom: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;

			.label {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-flow: wrap;
				width: 100%;
				height: 16vw;
				color: #666666;
				font-size: 26upx;

				.icon {
					position: relative;
					width: 9vw;
					height: 9vw;
					margin: 0 6vw;

					.badge {
						position: absolute;
						width: 4vw;
						height: 4vw;
						background-color: #ec6d2c;
						top: -1vw;
						right: -1vw;
						border-radius: 100%;
						font-size: 20upx;
						color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 10;
					}

					image {
						width: 8vw;
						height: 8vw;
						z-index: 9;
					}
				}
			}
		}
	}

	.list {
		width: 100%;

		.li {
			width: 92%;
			height: 100upx;
			padding: 0 4%;
			border-bottom: solid 1upx #e7e7e7;
			display: flex;
			align-items: center;

			&.noborder {
				border-bottom: 0
			}

			.icon {
				flex-shrink: 0;
				width: 50upx;
				height: 50upx;

				image {
					width: 50upx;
					height: 50upx
				}
			}

			.text {
				padding-left: 20upx;
				width: 100%;
				color: #666
			}

			.to {
				flex-shrink: 0;
				width: 40upx;
				height: 40upx
			}
		}
	}
	
</style>
