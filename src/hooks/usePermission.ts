import useLoginStore from '@/stores/login/login'

function usePermission(permissionID: string) {
	const loginStore = useLoginStore()
	const { permission } = loginStore

	return !!permission.find((item: any) => item.includes(permissionID))
}

export default usePermission
