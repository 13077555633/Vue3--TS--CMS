import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

// 封装点击搜索和重置操作
export function usePageContent() {
	const contentRef = ref<InstanceType<typeof PageContent>>()
	function handleQueryClick(queryInfo: any) {
		contentRef.value?.fetchPageListData(queryInfo)
	}
	function handleResetClick() {
		contentRef.value?.fetchPageListData()
	}
	return { contentRef, handleQueryClick, handleResetClick }
}
