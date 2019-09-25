<template>
	<view>
		<common-header title="收货地址"></common-header>
		<view class="grace-list">
			<view class='items' v-for="(item, index) in forData" :key="index">
				<view class="body">
					<view class="title">姓名<text>181****5688</text></view>
					<view class="desc">具体地址信息</view>
				</view>
				<view class="arrow-right" @tap="editAddress(item)"></view>
			</view>
		</view>
		<view class="btn-group">
			<button type="primary" class="grace-button  grace-gtbg-blue-sky" style="width: 80%;margin: auto;" @tap="editAddress(0)">添加新地址</button>
		</view>
	</view>
</template>
<script>
	import CommonHeader from '@/components/layouts/CommonHeader'
	export default {
		components:{
			CommonHeader
		},
		data() {
			return {
				forData: [1, 2, 3, 4, 5] //模拟的循环数据
			};
		},
		methods: {
			editAddress: function() {
				uni.navigateTo({
					url: '/pages/user/location_edit'
				})
			}
		}
	}
</script>
<style>
	.btn-group{
		width: 100%;
		position: fixed;
		bottom: 60rpx;
	}
	page{
		background: #FFFFFF;
	}
</style>
