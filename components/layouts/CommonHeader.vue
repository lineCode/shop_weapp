<template>
	<view>
		<graceHeader background="linear-gradient(to right, #0081ff 0%,#1cbbb4 80%)">
			<view class="grace-header-body">
				<view v-if="!hideBack" class="icons grace-icons icon-arrow-left grace-white" @tap="goback"></view>
				<text v-if="!hideBack" class="grace-white back-title title">{{title}}</text>
				<text v-if="hideBack" class="grace-white title">{{title}}</text>
			</view>
		</graceHeader>
	</view>
</template>
<script>
	import graceHeader from '../../graceUI/components/graceHeader.vue';

	export default {
		props:['title','hideBack'],
		components: {
			graceHeader
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
		methods:{
			goback() {
				uni.navigateBack({
					
				})
			}
		}
	}
</script>
<style>
	.title{
		margin-left: 40rpx;
		font-weight: 600;
		line-height: 44px;
		font-size: 36rpx;
	}
	.title.back-title{
		margin-left: 6rpx;
	}
</style>
