import { defineStore } from 'pinia'
import {
	getAmountListData,
	getCategoryGoodsCount,
	getCategoryGoodsSale,
	getCategoryGoodsFavor,
	getGoodsAddressSale
} from '@/services/main/analysis/analysis'

interface IAnalysisStore {
	mountList: any[]
	goodsCategoryCount: any[]
	goodsCategorySale: any[]
	goodsCategoryFavor: any[]
	goodsAddressSale: any[]
}
const useAnalysisStore = defineStore('analysisStore', {
	state: (): IAnalysisStore => ({
		mountList: [],
		goodsCategoryCount: [],
		goodsCategorySale: [],
		goodsCategoryFavor: [],
		goodsAddressSale: []
	}),
	actions: {
		fetchAnalysisDataAction() {
			getAmountListData().then((res) => {
				this.mountList = res.data
			})
			getCategoryGoodsCount().then((res) => {
				this.goodsCategoryCount = res.data
			})
			getCategoryGoodsSale().then((res) => {
				this.goodsCategorySale = res.data
			})
			getCategoryGoodsFavor().then((res) => {
				this.goodsCategoryFavor = res.data
			})
			getGoodsAddressSale().then((res) => {
				this.goodsAddressSale = res.data
			})
		}
	}
})

export default useAnalysisStore
