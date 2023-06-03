<template>
	<div class="department">
		<page-search
			@query-click="handleQueryClick"
			@reset-click="handleResetClick"
			:search-config="searchConfig"
		/>
		<page-content
			ref="contentRef"
			@new-click="handleNewClick"
			@edit-click="handleEditClick"
			:content-config="contentConfig"
		>
			<!-- 使用插槽自定义el-table的某一列数据 -->
			<template #leader="scope">
				<span class="leader">{{ scope.row[scope.prop] }}</span>
			</template>
			<template #parent="scope">
				<span class="parent">{{ scope.row[scope.prop] }}</span>
			</template>
		</page-content>
		<page-modal :modal-config="modalConfigRef" ref="modalRef" />
	</div>
</template>

<script setup lang="ts" name="department">
import { computed } from 'vue'
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

// @ts-ignore
import searchConfig from './config/search.config'
// @ts-ignore
import contentConfig from './config/content.config'
// @ts-ignore
import modalConfig from './config/modal.config'

// @ts-ignore
import useMainStore from '@/stores/main/main.ts'

// @ts-ignore
import { usePageContent } from '@/hooks/usePageContent'
// @ts-ignore
import { usePageModal } from '@/hooks/usePageModal'

// 给options加所有的部门数据(从mainStore拿)
const modalConfigRef = computed(() => {
	const mainStore = useMainStore()
	const departments = mainStore.entireDepartments.map((item) => {
		return { label: item.name, value: item.id }
	})
	modalConfig.formItems.forEach((item) => {
		if (item.prop === 'parentId') {
			item.options.push(...departments)
		}
	})

	return modalConfig
})

// 监听page-content子组件点击搜索，请求相应的数据
// 监听page-content子组件点击重置操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 监听page-content子组件新建用户操作
// 监听page-content子组件编辑用户操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
.leader,
.parent {
	color: red;
}
</style>
