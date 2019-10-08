<template>
	<view>
		<graceDialog title="普通形式的对话框" :isTitle="false" :show="showConfirmLogin" :isBtns="false">
			<view slot="content">
				<view style="height: 100rpx;width: 90%;margin: auto;text-align: center;">
					<span style="font-size: 36rpx;line-height: 100rpx;">请授权平台获取您的用户信息</span>
				</view>
				<view style="width: 90%;margin: auto;margin-bottom: 40rpx;">
					<button type="primary" class="grace-button grace-gtbg-blue" open-type="getUserInfo" @getuserinfo="getuserinfo">授权</button>
				</view>
			</view>
		</graceDialog>
	</view>
</template>

<script>
	import graceDialog from '@/graceUI/components/graceDialog'
	export default {
		components:{
			graceDialog
		},
		data(){
			return {
				showConfirmLogin: false
			}
		},
		mounted() {
			let userInfo = uni.getStorageSync('userInfo')
			console.log(userInfo)
			if(!userInfo.nickname){
				this.showConfirmLogin = true
			}
		},
		methods:{
			getuserinfo(e){
				console.log(e)
				console.log(e.detail.userInfo)
				uni.request({
					url: getApp().globalData.api + 'user/edit',
					method:'POST',
					data: {
						open_id: uni.getStorageSync('open_id'),
						avatar: e.detail.userInfo.avatarUrl,
						nickname: e.detail.userInfo.nickName
					},
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						this.showConfirmLogin = false
						uni.setStorageSync('userInfo',res.data.user_info)
					}
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
