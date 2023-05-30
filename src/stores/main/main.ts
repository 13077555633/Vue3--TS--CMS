import { getEntireDepartment, getEntireRoles } from '@/services/main/main'
import { defineStore } from 'pinia'

interface IMainStore {
	entireRoles: any[]
	entireDepartments: any[]
}
const useMainStore = defineStore('mainStore', {
	state: (): IMainStore => ({
		entireRoles: [],
		entireDepartments: []
	}),
	actions: {
		async fetchEntireDataAction() {
			const rolesResult = await getEntireRoles()
			const departmentsResult = await getEntireDepartment()
			this.entireRoles = rolesResult.data.list
			this.entireDepartments = departmentsResult.data.list
		}
	}
})

export default useMainStore
