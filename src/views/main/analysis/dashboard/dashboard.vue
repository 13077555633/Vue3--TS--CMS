<template>
	<div class="dashboard">
		<!-- 1.顶部数据的展示 -->
		<el-row :gutter="10">
			<template v-for="item in mountList" :key="item">
				<el-col :span="6" :xs="24" :sm="12" :md="12" :lg="6">
					<count-card v-bind="item" />
				</el-col>
			</template>
		</el-row>
		<!-- 2.中间的图表展示 -->
		<el-row :gutter="10">
			<el-col :span="7">
				<chart-card header="分类商品数量(饼图)">
					<pie-echarts :pie-data="showGoodsCategoryCount" />
				</chart-card>
			</el-col>
			<el-col :span="10">
				<chart-card header="不同城市的销量数据(地图)">
					<map-echarts :map-data="showGoodsAddressSale" />
				</chart-card>
			</el-col>
			<el-col :span="7">
				<chart-card header="销量前10的商品数量(饼图-玫瑰图)">
					<rose-echarts :rose-data="showGoodsCategoryCount" />
				</chart-card>
			</el-col>
		</el-row>

		<!-- 3.底部的图表展示 -->
		<el-row :gutter="10">
			<el-col :span="12">
				<chart-card header="分类商品的销量(折线图)">
					<line-echarts
						:labels="showGoodsCategorySale.labels"
						:values="showGoodsCategorySale.values"
					/>
				</chart-card>
			</el-col>
			<el-col :span="12">
				<chart-card header="分类商品的收藏(柱状图)">
					<bar-echarts
						:labels="showGoodsCategoryFavor.labels"
						:values="showGoodsCategoryFavor.values"
					/>
				</chart-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import CountCard from './c-cpns/count-card.vue'
import ChartCard from './c-cpns/chart-card.vue'

import PieEcharts from '@/components/page-echarts/src/pie-echarts.vue'
import RoseEcharts from '@/components/page-echarts/src/rose-echarts.vue'
import MapEcharts from '@/components/page-echarts/src/map-echarts.vue'
import LineEcharts from '@/components/page-echarts/src/line-echarts.vue'
import BarEcharts from '@/components/page-echarts/src/bar-echarts.vue'

//@ts-ignore
import useAnalysisStore from '@/stores/main/analysis/analysis'

// 1.发起store请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 2.获取mount和图表的数据
const { mountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
	storeToRefs(analysisStore)

// 获取1，3图表的数据
const showGoodsCategoryCount = computed(() => {
	return goodsCategoryCount.value.map((item) => {
		return { name: item.name, value: item.goodsCount }
	})
})
// 获取4图表的数据
const showGoodsCategorySale = computed(() => {
	const labels = goodsCategorySale.value.map((item) => item.name)
	const values = goodsCategorySale.value.map((item) => item.goodsCount)
	return { labels, values }
})
// 获取5图表的数据
const showGoodsCategoryFavor = computed(() => {
	const labels = goodsCategoryFavor.value.map((item) => item.name)
	const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)
	return { labels, values }
})

// 获取2图表的数据(地图)
const showGoodsAddressSale = computed(() => {
	return goodsAddressSale.value.map((item) => {
		return { name: item.address, value: item.count }
	})
})
</script>

<style lang="less" scoped>
.el-row {
	margin-bottom: 10px;
}
</style>
