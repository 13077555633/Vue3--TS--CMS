const contentConfig = {
	pageName: 'role',
	header: {
		title: '角色列表',
		btnTitle: '新建角色'
	},
	propsList: [
		// 1.selection 2.index
		{ type: 'selection', label: '选择', width: '40px' },
		{ type: 'index', label: '序号', width: '60px' },

		{ type: 'normal', label: '角色名称', prop: 'name', width: '140px' },
		{ type: 'normal', label: '权限介绍', prop: 'intro', width: '200px' },

		{ type: 'timer', label: '创建时间', prop: 'createAt' },
		{ type: 'timer', label: '更新时间', prop: 'updateUp' },

		{ type: 'handler', label: '操作', width: '150px' }
	]
}

export default contentConfig
