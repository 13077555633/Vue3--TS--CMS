import hyRequest from '@/services'

// 路由：main/system/user
// ----------- start --------------
// 请求获取用户列表
export function postUserListData(queryInfo: any = {}) {
	return hyRequest.post({
		url: '/users/list',
		data: queryInfo
	})
}
// 删除某个用户
export function deleteUserById(id: number) {
	return hyRequest.delete({
		url: `/users/${id}`
	})
}
// 新建用户
export function newUserData(userInfo: any) {
	return hyRequest.post({
		url: '/users',
		data: userInfo
	})
}
// 删除用户
export function editUserData(id: number, userInfo: any) {
	return hyRequest.patch({
		url: `/users/${id}`,
		data: userInfo
	})
}
// ----------- end --------------
