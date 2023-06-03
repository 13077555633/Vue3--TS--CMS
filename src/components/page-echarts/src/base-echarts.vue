<template>
	<div class="base-echarts">
		<div class="echart" ref="echartsRef"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, onUnmounted } from 'vue'

import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
//@ts-ignore
import ChinaJSON from '../data/china.json'
// 注册地图
echarts.registerMap('china', ChinaJSON as any)

type IProps = {
	option: EChartsOption
}
// 接收echarts配置属性
const props = defineProps<IProps>()

// 3.获取echarts的Ref
const echartsRef = ref<HTMLElement>()
let echartsInstance = null
onMounted(() => {
	// 1.基于准备好的dom，初始化echarts实例
	echartsInstance = echarts.init(echartsRef.value!, 'light', {
		renderer: 'canvas'
	})
	// 2.指定图表的配置项和数据
	watchEffect(() => {
		echartsInstance.setOption(props.option)
	})

	// 3.监听window的缩放
	window.addEventListener('resize', () => {
		echartsInstance.resize()
	})
})
onUnmounted(() => {
	window.removeEventListener('resize', () => {
		echartsInstance.resize()
	})
})
</script>

<style lang="less" scoped>
.echart {
	height: 300px;
}
</style>
