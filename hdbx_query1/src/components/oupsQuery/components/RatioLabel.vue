<template>
	<span :class="trend">
		<i class="fa"></i>
		{{data}}
		<icon-tip v-if="showAlertIcon" type="warning" width="126">
			<!--环比增长超过{{alertValue}}%</br>建议关注浮动原因-->
			环比增长过高</br>建议关注浮动原因
		</icon-tip>
	</span>
</template>
<script>
	/**
	 * 显示环比增长数量的控件
	 */
	import iconTip from 'components/common/IconTip.vue';

	export default {
		name: 'ratioLabel',
		components: {
			iconTip
		},
		props: {
			cur: { //本期数量
				default: 0
			},
			last: { //上一期数量
				default: 0
			},
			showAlert: { //是否显示alert提示标
				type: Boolean,
				default: false
			}
		},
		computed: {
			ratio(){
				return this.calcRatio(this.cur, this.last);
			},
			trend(){
				return this.ratio < 0 ? 'down' : (this.ratio > 0) ? 'up' : 'equal';
			},
			data(){
				return isFinite(this.ratio) && this.ratio != 0 ? (Math.abs(this.ratio) + '%') : '';
			},
			showAlertIcon(){
				return this.showAlert && ((this.last > 0 && this.last < 10 && this.ratio > 500 ) || (this.last >= 10 && this.last < 100 && this.ratio > 100) || (this.last >= 100 && this.ratio > this.alertValue))
			},
			alertValue(){
				return this.$store.getters.getAlertValue;
			}
		},
		methods: {
			// 利用cur和last进行环比计算
			calcRatio(cur, last){
				let r = Math.round((cur - last) / last * 10000) / 100;
				r = isNaN(r) ? '' : r;
//				if (r > 10) { // 大于10时只显示两位小数
				r = parseFloat(r).toFixed(2);
//				}
				return r;
			}
		}
	}
</script>
<style lang="less" rel="stylesheet/less" scoped>
	.up {
		color: #EC504C;
		> .fa:before {
			content: "\f0d8";
		}
	}

	.down {
		color: #7FF067;
		> .fa:before {
			content: "\f0d7";
		}
	}

	.equal {
		color: #808080;
		> .fa:before {
			content: "\f068";
		}
	}

</style>
