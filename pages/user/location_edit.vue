<template>
	<view class="grace-body">
		<common-header title="收货地址"></common-header>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">联系姓名</view>
				<input type="text" class="input" name="name" placeholder="请填写联系姓名"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">联系电话</view>
				<input type="text" class="input" name="phoneno" placeholder="请填写联系电话"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">所在地区</view>
				<view @click="cityPicker1" class="other">
					{{cityText1}}
					<text class="grace-icons icon-arrow-right"></text>
				</view>
			</view>
			<view class="grace-items grace-noborder">
				<view class="grace-label">详细地址</view>
				<input type="text" class="input" name="address" placeholder="请填写详细地址"></input>
			</view>
			<view style="padding:30rpx 0;">
				<button formType="submit" type="primary" class="grace-button grace-border-radius">提交</button>
			</view>
		</form>
		<view class="grace-more-bottom"><text class="grace-icons icon-remove" style="margin-right:8px;"></text>删除联系人</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>
<script>
	import CommonHeader from '@/components/layouts/CommonHeader'
	import mpvuePicker from '../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
			};
		},
		onLoad: function() {
			_self = this;
		},
		methods: {
			// 表单提交
			formSubmit: function(e) {
				if (this.city1 == null) {
					uni.showToast({
						title: "请选择地区",
						icon: "none"
					});
					return false;
				}
				var rule = [{
						name: "name",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "联系人应为1-20个字符"
					},
					{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请正确填写手机号"
					},
					{
						name: "address",
						checkType: "string",
						checkRule: "5,100",
						errorMsg: "请正确填写详细地址"
					}
				];
				var formData = e.detail.value;
				formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过! 请观察控制台",
						icon: "none"
					});
					console.log(formData);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			cityPicker1: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm1(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
		},
		components: {
			mpvuePicker,
			mpvueCityPicker,
			CommonHeader
		}
	}
</script>
<style>

</style>
