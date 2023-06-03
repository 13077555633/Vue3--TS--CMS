import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import {
	deletePageById,
	deleteUserById,
	editPageData,
	editUserData,
	newPageData,
	newUserData,
	postPageListData,
	postUserListData
} from '@/services/main/system/system'
import { localCache } from '@/utils/cache'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('systemStore', {
	state: (): ISystemState => ({
		userList: [],
		userTotalCount: 0,

		// 页面的数据
		pageList: [],
		pageTotalCount: 0
	}),
	actions: {
		// 路由：main/system/user
		// ----------- start --------------
		// 获取用户列表
		async postUserListAction(queryInfo: any = {}) {
			const userListResult = await postUserListData(queryInfo)
			const { list, totalCount } = userListResult.data

			this.userList = list
			this.userTotalCount = totalCount
		},

		// 删除某个用户
		async deleteUserByIdAction(id: number, queryInfo: any = {}) {
			const deleteUserResult = await deleteUserById(id)
			// 删除是否成功提示
			if (deleteUserResult.code === 0) {
				ElMessage({
					message: deleteUserResult.data,
					type: 'success'
				})
			}

			// 重新请求数据列表
			this.postUserListAction(queryInfo)
		},

		// 新建用户
		async newUserDataAction(userInfo: any) {
			const newUserResult = await newUserData(userInfo)
			// 创建是否成功提示
			if (newUserResult.code === 0) {
				ElMessage({
					message: newUserResult.data,
					type: 'success'
				})
			} else {
				ElMessage({
					message: newUserResult.data,
					type: 'error'
				})
			}

			// 重新请求数据列表
			const localInfo = localCache.getCache('localInfo')
			this.postUserListAction(localInfo)
		},
		// 编辑用户
		async editUserDataAction(id: number, userInfo: any) {
			const editUserResult = await editUserData(id, userInfo)
			// 创建是否成功提示
			if (editUserResult.code === 0) {
				ElMessage({
					message: editUserResult.data,
					type: 'success'
				})
			} else {
				ElMessage({
					message: editUserResult.data,
					type: 'error'
				})
			}

			// 重新请求数据列表
			const localInfo = localCache.getCache('localInfo')
			this.postUserListAction(localInfo)
		},
		// ----------- end -----------------------------------------------------------------------------------

		// 前后端接口命名规范的前提下(对前面代码进行重构和抽取，进行多组件复用)
		/**针对页面的数据：增删改查 */
		// 查
		async postPageListAction(pageName: string, queryInfo: any) {
			const pageListResult = await postPageListData(pageName, queryInfo)
			if (pageName !== 'menu') {
				const { totalCount, list } = pageListResult.data
				this.pageList = list
				this.pageTotalCount = totalCount
			} else {
				const { list } = pageListResult.data
				this.pageList = list
				this.pageTotalCount = list.length
			}
		},
		// 删
		async deletePageByIdAction(pageName: string, id: number, queryInfo: any = {}) {
			const deletePageResult = await deletePageById(pageName, id)

			// 删除是否成功提示
			if (deletePageResult.code === 0) {
				ElMessage({
					message: deletePageResult.data,
					type: 'success'
				})
			}
			// 重新请求数据列表
			this.postPageListAction(pageName, queryInfo)
			useMainStore().fetchEntireDataAction()
		},
		// 新建数据
		async newPageDataAction(pageName: string, pageInfo: any) {
			const newPageResult = await newPageData(pageName, pageInfo)
			// 创建是否成功提示
			if (newPageResult.code === 0) {
				ElMessage({
					message: newPageResult.data,
					type: 'success'
				})
			} else {
				ElMessage({
					message: newPageResult.data,
					type: 'error'
				})
			}

			// 重新请求数据列表
			let localInfo = localCache.getCache('localInfo')
			const offset = 0
			localCache.setCache('localInfo', { ...localInfo, offset })
			localInfo = localCache.getCache('localInfo')

			this.postPageListAction(pageName, localInfo)
			useMainStore().fetchEntireDataAction()
		},
		// 编辑用户
		async editPageDataAction(pageName: string, id: number, pageInfo: any) {
			const editPageResult = await editPageData(pageName, id, pageInfo)
			// 创建是否成功提示
			if (editPageResult.code === 0) {
				ElMessage({
					message: editPageResult.data,
					type: 'success'
				})
			} else {
				ElMessage({
					message: editPageResult.data,
					type: 'error'
				})
			}

			// 重新请求数据列表
			const localInfo = localCache.getCache('localInfo')
			this.postPageListAction(pageName, localInfo)
			useMainStore().fetchEntireDataAction()
		}
	}
})

export default useSystemStore
