<script>
	import Vue from 'vue'
	import JMessage from 'js_sdk/wxmp-jiguang/jmessage-wxapplet-sdk-1.4.0/jmessage-wxapplet-sdk-1.4.0.min.js'
	import md5 from 'js_sdk/js-md5/src/md5.js'
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
			Vue.prototype.JIM=new JMessage({});
			console.log('App Launch');
			var appkey='b7ce35a8335c8ab76c58dfd0';
			var key='80871baf19881a7036d774c5';
			var timestamp = (new Date()).getTime();
			var signature=md5("appkey=b7ce35a8335c8ab76c58dfd0&timestamp="+timestamp+"&random_str=022cd9fd995849b66666&key=80871baf19881a7036d774c5");
			console.log(signature)
			this.JIM.init({
				"appkey"    : appkey,
				"random_str": "022cd9fd995849b66666",
				"signature" : signature,
				"timestamp" : timestamp,
				"flag":1
			}).onSuccess(function(data) {
			  console.log(data)
			}).onFail(function(data) {
			  //TODO
			});  
			//
			this.JIM.onDisconnect(function(){
				console.log('JIM断开链接')
			});
			
			this.JIM.onMsgReceive(function(data) {
				// 接受在线消息
				console.log('在线接受消息')
				console.log(data)
				uni.$emit('msg_ol',data.messages[0].content)
			});
			
			//this.JIM.isInit();// 无回调函数，调用则成功
			Vue.prototype.onSyncConversation=null
			uni.$once('onSyncConversation',function(data){
				this.onSyncConversation=data
				console.log('离线传递：')
				console.log(data)
				uni.$off()
			})
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
