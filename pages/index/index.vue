<template>
	<view>
		<view>
			<uni-nav-bar :status-bar="true" :fixed="true" color="#333333" background-color="#FFFFFF">
				<block slot="left">
					<view class="city">
						<uni-icon type="location-filled" color="#f06c7a" size="16" />
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
						<!--start 内容部分可直接删除-->
						<view class="list-view">
							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">温故知"心"习近平这些话要牢记</view>
								<view class="img-container">
									<view class="cell-img">
										<image src='../../static/images/product/2.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/3.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/4.jpg' class="img"></image>
									</view>
								</view>
								<view class="sub-title">
									<text class="badge b-red">要闻</text>
									<text class="sub-content">央视网新闻</text>
								</view>
							</view>

							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">美国会表决通过新驻华大使 月底有望赴华</view>
								<view class="sub-title">
									<text class="badge b-blue">朋友都看过</text>
									<text class="sub-content">百科故事大全</text>
								</view>
							</view>


							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列金融专业排前列金融专业排前列金融专业排前列</view>
								<view class="img-container">
									<view class="cell-img">
										<image src='../../static/images/product/1.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/4.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/5.jpg' class="img"></image>
									</view>
								</view>
								<view class="sub-title">
									<text class="badge b-orange">本地资讯</text>
									<text class="sub-content">粤港精英联盟</text>
								</view>
							</view>

							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">科创板交易系统准备就绪,不存在首批名单</view>
								<view class="sub-title">
									<!-- <text class="badge b-blue">朋友都看过</text> -->
									<text class="sub-content">百科故事大全</text>
								</view>
							</view>


							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">开户大战燎原！加急上线科创板预约开户</view>
								<view class="img-container">
									<view class="cell-img">
										<image src='../../static/images/product/1.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/4.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/5.jpg' class="img"></image>
									</view>
								</view>
								<view class="sub-title">
									<!-- <text class="badge b-orange">本地资讯</text> -->
									<text class="sub-content">粤港精英联盟</text>
								</view>
							</view>

							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">3.07财经早报┃头条：推进改革开放创新增进民生福祉，促进经济社会持续健康发展促进经济社会持续健康发展</view>
								<view class="sub-title">
									<text class="badge b-green">互联网精英看过</text>
									<text class="sub-content">百科故事大全</text>
								</view>
							</view>


							<view class="list-cell list-item" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列</view>
								<view class="img-container">
									<view class="cell-img">
										<image src='../../static/images/product/2.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/4.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/3.jpg' class="img"></image>
									</view>
								</view>
								<view class="sub-title">
									<text class="badge b-orange">本地资讯</text>
									<text class="sub-content">粤港精英联盟</text>
								</view>
							</view>

							<view class="list-cell" hover-class="hover" :hover-stay-time="150" @tap="detail">
								<view class="cell-title">触手直播“和平精英”星联赛Jstar夺冠 大热</view>
								<view class="img-container">
									<view class="cell-img">
										<image src='../../static/images/product/4.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/1.jpg' class="img"></image>
									</view>
									<view class="cell-img">
										<image src='../../static/images/product/2.jpg' class="img"></image>
									</view>
								</view>
								<view class="sub-title">
									<text class="badge b-red">要闻</text>
									<text class="sub-content">粤港精英联盟</text>
								</view>
							</view>

						</view>
						<!--end 内容部分可直接删除-->
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
				tabbar: ["热门", "娱乐", "体育", "国内", "财经", "科技", "教育", "汽车"],
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
					console.log(res)
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
		},
	}
</script>

<style lang="scss">
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4
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
		height: 100upx;
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
		height: 100upx;
		min-width: 80upx;
		line-height: 100upx;
		margin: 0 28upx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}

	.tab-bar-title {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #999;
		font-weight: 400;
	}

	.active {
		border-bottom: 6upx solid #5677fc;
	}

	.active .tab-bar-title {
		color: #5677fc !important;
		font-size: 36upx;
		font-weight: bold;
	}

	/*tabbar end*/
</style>
