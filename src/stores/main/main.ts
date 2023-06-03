import { getEntireDepartment, getEntireMenus, getEntireRoles } from '@/services/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
	entireRoles: any[]
	entireDepartments: any[]
	entireMenus: any[]
}
const useMainStore = defineStore('mainStore', {
	state: (): IMainStore => ({
		entireRoles: [], // 所有的角色
		entireDepartments: [], // 所有的部门
		entireMenus: [] // 所有的菜单
	}),
	actions: {
		async fetchEntireDataAction() {
			const rolesResult = await getEntireRoles()
			const departmentsResult = await getEntireDepartment()
			const menusResult = await getEntireMenus()
			this.entireRoles = rolesResult.data.list
			this.entireDepartments = departmentsResult.data.list
			this.entireMenus = menusResult.data.list
		}
	}
})

export default useMainStore
