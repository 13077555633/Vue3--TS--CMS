<template>
	<div class="user">
		<user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
		<user-content ref="contentRef" @new-click="handleNewClick" @edit-click="handleEditClick" />
		<user-modal ref="modalRef" />
	</div>
</template>

<script setup lang="ts" name="user">
import { ref } from 'vue'
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// 监听user-search子组件点击搜索，请求相应的数据
const contentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(queryInfo: any) {
	contentRef.value.fetchUserListData(queryInfo)
}
// 重置操作
function handleResetClick() {
	contentRef.value.fetchUserListData()
}

// 监听user-content子组件新建用户操作
const modalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
	modalRef.value.setDialogVisible()
}
// 监听user-content子组件编辑用户操作
function handleEditClick(itemData: any) {
	modalRef.value.setDialogVisible(false, itemData)
}
</script>

<style scoped>
.user {
	border-radius: 8px;
	overflow: hidden;
}
</style>
