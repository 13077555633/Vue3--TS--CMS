<template>
	<div class="role">
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
		/>
		<page-modal :modal-config="modalConfig" ref="modalRef" :otherInfo="otherInfo">
			<template #menuList>
				<el-tree
					ref="treeRef"
					:data="entireMenus"
					show-checkbox
					node-key="id"
					:props="{ children: 'children', label: 'name' }"
					@check="handleElTreeCheck"
				/>
			</template>
		</page-modal>
	</div>
</template>

<script setup lang="ts" name="role">
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'
import { storeToRefs } from 'pinia'

import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'

//@ts-ignore
import searchConfig from './config/search.config'
//@ts-ignore
import contentConfig from './config/content.config'
//@ts-ignore
import modalConfig from './config/modal.config'

// @ts-ignore
import { usePageContent } from '@/hooks/usePageContent'
// @ts-ignore
import { usePageModal } from '@/hooks/usePageModal'

// @ts-ignore
import useMainStore from '@/stores/main/main.ts'

//@ts-ignore
import { mapMenuListToIds } from '@/utils/map-menus'

// 监听page-content子组件点击搜索，请求相应的数据
// 监听page-content子组件点击重置操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 监听page-content子组件新建用户操作
// 监听page-content子组件编辑用户操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal(newCallBack, editCallBack)

// 获取完整的菜单
const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)
// 获取选中的菜单id
const otherInfo = ref({})
function handleElTreeCheck(_, data2) {
	const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
	otherInfo.value = { menuList }
}

// 对编辑角色的菜单权限进行回显
const treeRef = ref<InstanceType<typeof ElTree>>()
// 给编辑角色的hooks写一个回调拿itemData对菜单权限进行回显
function editCallBack(itemData: any) {
	// 等待 编辑框完整渲染出来再进行dom操作
	nextTick(() => {
		const menuIds = mapMenuListToIds(itemData.menuList)
		treeRef.value?.setCheckedKeys(menuIds)
	})
}

// 新建数据是清空菜单权限(传给子组件调用)
function newCallBack() {
	nextTick(() => {
		treeRef.value?.setCheckedKeys([])
	})
}
</script>

<style scoped></style>
