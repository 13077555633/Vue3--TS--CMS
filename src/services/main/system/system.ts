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

// 前后端接口命名规范的前提下(对前面代码进行重构和抽取，进行多组件复用)
/**针对页面的数据：增删改查 */
// 查
export function postPageListData(pageName: string, queryInfo: any = {}) {
	return hyRequest.post({
		url: `/${pageName}/list`,
		data: queryInfo
	})
}
// 删
export function deletePageById(pageName: string, id: number) {
	return hyRequest.delete({
		url: `/${pageName}/${id}`
	})
}
// 增
export function newPageData(pageName: string, pageInfo: any) {
	return hyRequest.post({
		url: `/${pageName}`,
		data: pageInfo
	})
}
// 改
export function editPageData(pageName: string, id: number, pageInfo: any) {
	return hyRequest.patch({
		url: `/${pageName}/${id}`,
		data: pageInfo
	})
}
