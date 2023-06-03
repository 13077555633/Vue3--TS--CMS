<template>
	<div class="modal">
		<el-dialog
			v-model="dialogVisible"
			:title="isNewRef ? modalConfig.header.newTitle : modalConfig.header.editTitle"
			width="30%"
			center
		>
			<div class="form">
				<el-form :model="formData" label-width="80px" size="large">
					<template v-for="item in modalConfig.formItems" :key="item.prop">
						<template v-if="item.type === 'input'">
							<el-form-item :label="item.label" :prop="item.prop">
								<el-input v-model="formData[item.prop]" :placeholder="item.placeholder" />
							</el-form-item>
						</template>

						<template v-else-if="item.type === 'select'">
							<el-form-item :label="item.label" :prop="item.prop">
								<el-select
									v-model="formData[item.prop]"
									:placeholder="item.placeholder"
									style="width: 100%"
								>
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value" />
									</template>
								</el-select>
							</el-form-item>
						</template>

						<template v-else-if="item.type === 'data-picker'">
							<el-date-picker
								v-model="formData[item.prop]"
								type="daterange"
								range-separator="-"
								start-placeholder="开始时间"
								end-placeholder="结束时间"
							/>
						</template>

						<template v-else-if="item.type === 'custom'">
							<el-form-item :label="item.label">
								<slot :name="item.slotName"></slot>
							</el-form-item>
						</template>
					</template>
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
import { reactive, ref } from 'vue'
//@ts-ignore
import useSystemStore from '@/stores/main/system/system'

type IProps = {
	modalConfig: {
		pageName: string
		header: {
			newTitle: string
			editTitle: string
		}
		formItems: any[]
	}
	otherInfo?: any
}
// 0.接收属性props
const props = defineProps<IProps>()

// 1.控制新增用户是否弹窗
const dialogVisible = ref(false)
const isNewRef = ref(true)

// 2.新增用户的表单数据
const initialData: any = {}
for (const item of props.modalConfig.formItems) {
	initialData[item.prop] = ''
}
let formData = reactive(initialData)

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
	let infoData = formData
	if (props.otherInfo) {
		infoData = { ...formData, ...props.otherInfo }
	}
	// 新建用户
	if (isNewRef.value) {
		systemStore.newPageDataAction(props.modalConfig.pageName, infoData)
		// 编辑用户
	} else {
		systemStore.editPageDataAction(props.modalConfig.pageName, editData.value.id, infoData)
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
