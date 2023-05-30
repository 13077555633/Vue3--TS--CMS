<template>
	<div class="modal">
		<el-dialog
			v-model="dialogVisible"
			:title="isNewRef ? '新建用户' : '编辑用户'"
			width="30%"
			center
		>
			<div class="form">
				<el-form :model="formData" :rules="newUserRules" label-width="80px" size="large">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="formData.name" placeholder="请输入用户名" />
					</el-form-item>
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="formData.realname" placeholder="请输入真实姓名" />
					</el-form-item>
					<el-form-item v-if="isNewRef" label="密码" prop="password">
						<el-input v-model="formData.password" placeholder="请输入密码" show-password />
					</el-form-item>
					<el-form-item label="电话号码" prop="cellphone">
						<el-input v-model="formData.cellphone" placeholder="请输入电话号码" />
					</el-form-item>
					<el-form-item label="选择角色" prop="roleId">
						<el-select v-model="formData.roleId" placeholder="请输入角色" style="width: 100%">
							<template v-for="item in entireRoles" :key="item.id">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="选择部门" prop="departmentId">
						<el-select v-model="formData.departmentId" placeholder="请输入部门" style="width: 100%">
							<template v-for="item in entireDepartments" :key="item.id">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
				</el-form>
			</div>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="handleCancelClick">取消</el-button>
					<el-button type="primary" @click="handleConfirmClick">确定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import type { FormRules } from 'element-plus'
//@ts-ignore
import useMainStore from '@/stores/main/main'
//@ts-ignore
import useSystemStore from '@/stores/main/system/system'

// 1.控制新增用户是否弹窗
const dialogVisible = ref(false)
const isNewRef = ref(true)
// 2.新增用户的表单数据
let formData = reactive<any>({
	name: '',
	realname: '',
	password: '',
	cellphone: '',
	roleId: '',
	departmentId: ''
})
// 3.获取角色列表和部门列表的数据
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
// 4.对表单数据进行校验
const newUserRules: FormRules = {
	name: [
		{ required: false },
		{ pattern: /^.{3,20}$/, message: '必须是3-12位的字符组成~', trigger: 'blur' }
	],
	realname: [
		{ required: true, message: '必须输入真实姓名~', trigger: 'blur' },
		{ pattern: /^.{1,20}$/, message: '必须是1-20位的字符组成~', trigger: 'change' }
	],
	password: [
		{ required: false },
		{ pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上的数字或字母组成~', trigger: 'blur' }
	],
	cellphone: [
		{ required: false },
		{ pattern: /^[0-9]{11}$/, message: '请输入11位正确的手机号码格式~', trigger: 'blur' }
	],
	roleId: [{ required: false, message: '请选择用户的角色~', trigger: 'blur' }],
	departmentId: [{ required: false, message: '请选择用户的权限~', trigger: 'blur' }]
}

// 记录编辑的用户信息
let editData = ref()

// 控制弹窗
function setDialogVisible(isNew: boolean = true, itemData?: any) {
	dialogVisible.value = true
	isNewRef.value = isNew
	// 编辑用户
	if (!isNew && itemData) {
		editData.value = itemData
		for (const key in formData) {
			formData[key] = itemData[key]
		}
		// 新建用户
	} else {
		// 清空表单数据
		for (const key in formData) {
			formData[key] = ''
		}
		editData.value = null
	}
}

// 5.用户点击了确定
const systemStore = useSystemStore()
function handleConfirmClick() {
	// 新建用户
	if (isNewRef.value) {
		systemStore.newUserDataAction(formData).then(() => {
			// 清空表单数据
			for (const key in formData) {
				formData[key] = ''
			}
		})
		// 编辑用户
	} else {
		systemStore.editUserDataAction(editData.value.id, formData)
	}
	dialogVisible.value = false
}

// 6.用户点击了取消
function handleCancelClick() {
	// 清空表单数据
	for (const key in formData) {
		formData[key] = ''
	}

	dialogVisible.value = false
}

defineExpose({ setDialogVisible })
</script>

<style lang="less" scoped>
.form {
	padding: 14px 30px;

	:global(.el-dialog__body) {
		padding: 0 !important;
	}
}
</style>
