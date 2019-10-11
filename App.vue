<script>
	export default {
		globalData: {
			api: 'http://127.0.0.1:8000/weapp/'
			// api: 'https://g.dxs.wiki/weapp/'
		},
		onLaunch: function() {
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					var code = loginRes.code
					uni.request({
						url: getApp().globalData.api + 'user/token',
						method:'POST',
						data: {
							code: code
						},
						header: {
							'content-type': 'application/json' //自定义请求头信息
						},
						success: (res) => {
							uni.setStorageSync('open_id', res.data.data.open_id)
							uni.setStorageSync('userInfo', res.data.data.userInfo)
						}
					});
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "./graceUI/graceIcons.css";
	@import "./graceUI/graceUI.css";
	
	@import "/static/iconfont/font.scss";
	
	page {
		background-color: #fafafa;
	}
	
	view {
		font-size: 28upx;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		line-height: inherit;
	}
	
	.grace-dialog-shade .close-btn {
		display: none;
	}
</style>
