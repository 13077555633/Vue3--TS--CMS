<template>
	<div class="department">
		<page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<page-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
		<page-modal ref="modalRef" />
	</div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageModal from './c-cpns/page-modal.vue'

// 监听page-content子组件点击搜索，请求相应的数据
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
	contentRef.value.fetchPageListData(queryInfo)
}
// // 监听page-content子组件点击重置操作
function handleResetClick() {
	contentRef.value.fetchPageListData()
}

// 监听page-content子组件新建用户操作
const modalRef = ref<InstanceType<typeof PageModal>>()
function handleNewClick() {
	modalRef.value.setDialogVisible()
}
// 监听page-content子组件编辑用户操作
function handleEditClick(itemData: any) {
	modalRef.value.setDialogVisible(false, itemData)
}
</script>

<style scoped></style>
