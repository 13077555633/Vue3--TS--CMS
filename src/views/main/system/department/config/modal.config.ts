const modalConfig = {
	pageName: 'department',
	header: {
		newTitle: '新建部门',
		editTitle: '编辑部门'
	},
	formItems: [
		{ type: 'input', prop: 'name', label: '部门名称', placeholder: '请输入部门名称' },
		{ type: 'input', prop: 'leader', label: '领导名称', placeholder: '请输入领导名称' },
		{
			type: 'select',
			prop: 'parentId',
			label: '上级部门',
			placeholder: '请输入上级部门',
			options: []
		}
	]
}

export default modalConfig
