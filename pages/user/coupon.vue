<template>
	<view class="grace-body">
		<common-header title="领券中心"></common-header>
		<view 
			v-for="(item, index) in coupons" :key="index" 
			:data-number="item.number" :data-btn="item.btn" 
			style="margin:15px 0;" @tap="getIt">
			<grace-coupons :coupon="item"></grace-coupons>
		</view>
	</view>
</template>
<script>
import graceCoupons from "../../graceUI/components/graceCoupons.vue"
import CommonHeader from '@/components/layouts/CommonHeader'
export default {
	data() {
		return {
			coupons  : [
				{
					color : '#FF3456', ltBg : "#FFFFFF", height : '180rpx',
					unit:"￥", number:10, txt:"满50元可用", title:"电器专场用券", desc:"有效期至 2018-05-28",
					btn : "已领取"
				},
				{
					color : '#FF8830', ltBg : "#FFFFFF", height : '180rpx',
					unit:"￥", number:100, txt:"满500元可用", title:"服饰专场用券", desc:"有效期至 2018-05-28",
					btn : "领券"
				}
			]
		}
	},
	components:{
		"grace-coupons" : graceCoupons,
		CommonHeader
	},
	methods:{
		getIt : function(e){
			console.log(JSON.stringify(e));
			// 点击数据可用通过 data- 方式设置及获取
			// 点击代码请自行完善
		}
	}
}
</script>
<style>

</style>