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

export function getEntireDepartment() {
	return hyRequest.post({
		url: '/department/list',
		data: {
			offset: 0,
			size: 100
		}
	})
}
