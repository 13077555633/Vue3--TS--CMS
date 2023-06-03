<template>
	<div class="pie-echarts">
		<base-echarts :option="option" />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import BaseEcharts from './base-echarts.vue'

type IProps = {
	pieData: {
		name: string
		value: any
	}[]
}
// 接收属性
const props = defineProps<IProps>()

const option = computed<EChartsOption>(() => {
	return {
		// 手指放上去的时候显示的文本
		tooltip: {
			trigger: 'item'
		},
		// 图例:
		legend: {
			orient: 'horizontal',
			left: 'left'
		},
		series: [
			{
				name: '访问来源',
				type: 'pie',
				radius: '50%',
				bottom: '-20%',
				data: props.pieData,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	}
})
</script>

<style lang="less" scoped></style>
