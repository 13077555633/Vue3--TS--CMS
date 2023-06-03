import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type ICallBack = (itemData?: any) => void
// 封装点击新建和编辑操作
export function usePageModal(newCallBack?: ICallBack, editCallBack?: ICallBack) {
	const modalRef = ref<InstanceType<typeof PageModal>>()

	function handleNewClick() {
		// 1.让编辑框显示
		modalRef.value?.setDialogVisible()
		// 2.执行菜单权限的回调函数
		if (newCallBack) newCallBack()
	}

	function handleEditClick(itemData: any) {
		// 1.让编辑框显示
		modalRef.value?.setDialogVisible(false, itemData)
		// 2.执行菜单权限回显的回调函数
		if (editCallBack) editCallBack(itemData)
	}
	return { modalRef, handleNewClick, handleEditClick }
}
