import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import {
	deleteUserById,
	editUserData,
	newUserData,
	postUserListData
} from '@/services/main/system/system'
import { localCache } from '@/utils/cache'
import type { ISystemState } from './type'

const useSystemStore = defineStore('systemStore', {
	state: (): ISystemState => ({
		userList: [],
		userTotalCount: 0
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
			await deleteUserById(id)

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
			const pageInfo = localCache.getCache('pageInfo')
			this.postUserListAction(pageInfo)
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
			const pageInfo = localCache.getCache('pageInfo')
			this.postUserListAction(pageInfo)
		}
		// ----------- end --------------
	}
})

export default useSystemStore
