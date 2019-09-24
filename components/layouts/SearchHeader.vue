<template>
	<view>
		<graceHeader background="linear-gradient(to right, #0081ff 0%,#1cbbb4 80%)">
			<view class="grace-header-body">
				<text class="icons grace-icons icon-address grace-white"></text>
				<text class="grace-white grace-h5">常州</text>
				<!-- 中间内容 -->
				<view class="grace-search">
					<view class="grace-search-in">
						<view class="icons grace-icons icon-search"></view>
						<view class="input"><input type="search" placeholder="输入商品名称搜索" /></view>
					</view>
				</view>
			</view>
		</graceHeader>
	</view>
</template>
<script>
	import graceHeader from '../../graceUI/components/graceHeader.vue';

	export default {
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
		components: {
			graceHeader
		}
	}
</script>
<style>

</style>
