import hyRequest from '..'
import type { IAccount } from '@/types/index'

// 用户登录请求
export function accountLoginRequest(account: IAccount) {
	return hyRequest.post({
		url: '/login',
		data: {
			name: account.name,
			password: account.password
		}
	})
}

// 查询用户角色
export function getUserInfoById(id: number) {
	return hyRequest.get({
		url: `/users/${id}`
	})
}

// 查询用户角色的菜单
export function getUserMenusByRoleId(roleId: number) {
	return hyRequest.get({
		url: `/role/${roleId}/menu`
	})
}
