<script>
	export default {
		onLaunch: function() {
			uni.login({
				success(res) {

				}
			})

			console.log('App Launch')

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
	/*每个页面公共css */
	@import "/static/iconfont/font.scss";
	
	@import "./graceUI/graceIcons.css";
	@import "./graceUI/graceUI.css";

	page {
		background-color: #fafafa;
	}

	view {
		font-size: 28upx;
		font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
		line-height: inherit;
	}
</style>
