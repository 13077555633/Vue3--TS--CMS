import hyRequest from '..'

// 请求角色列表
export function getEntireRoles() {
	return hyRequest.post({
		url: '/role/list',
		data: {
			offset: 0,
			size: 100
		}
	})
}
// 请求部门列表
export function getEntireDepartment() {
	return hyRequest.post({
		url: '/department/list',
		data: {
			offset: 0,
			size: 100
		}
	})
}

// 请求菜单列表
export function getEntireMenus() {
	return hyRequest.post({
		url: '/menu/list'
	})
}
