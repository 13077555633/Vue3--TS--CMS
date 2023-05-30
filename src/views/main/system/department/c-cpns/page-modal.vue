<template>
	<div class="modal">
		<el-dialog
			v-model="dialogVisible"
			:title="isNewRef ? '新建部门' : '编辑部门'"
			width="30%"
			center
		>
			<div class="form">
				<el-form :model="formData" label-width="80px" size="large">
					<el-form-item label="部门名称" prop="name">
						<el-input v-model="formData.name" placeholder="请输入部门名称" />
					</el-form-item>
					<el-form-item label="上级部门" prop="parentId">
						<el-select v-model="formData.parentId" placeholder="请输入上级部门" style="width: 100%">
							<template v-for="item in entireDepartments" :key="item.id">
								<el-option :label="item.name" :value="item.id"></el-option>
							</template>
						</el-select>
					</el-form-item>
					<el-form-item label="领导名称" prop="leader">
						<el-input v-model="formData.leader" placeholder="请输入领导名称" />
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
	parentId: '',
	leader: ''
})
// 3.获取角色列表和部门列表的数据
const mainStore = useMainStore()
const { entireDepartments } = storeToRefs(mainStore)

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
		systemStore.newPageDataAction('department', formData).then(() => {
			// 清空表单数据
			for (const key in formData) {
				formData[key] = ''
			}
		})
		// 编辑用户
	} else {
		systemStore.editPageDataAction('department', editData.value.id, formData)
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
