<template>
	<div class="search" v-if="isQuery">
		<!-- 搜索关键字的表单 -->
		<el-form ref="formRef" :model="searchForm" size="large" label-width="80px">
			<el-row :gutter="20">
				<template v-for="item in searchConfig.formItems" :key="item.name">
					<el-col :span="8">
						<el-form-item :label="item.label" :prop="item.prop">
							<template v-if="item.type === 'input'">
								<el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
							</template>

							<template v-if="item.type === 'data-picker'">
								<el-date-picker
									v-model="searchForm[item.prop]"
									type="daterange"
									range-separator="-"
									start-placeholder="开始时间"
									end-placeholder="结束时间"
								/>
							</template>

							<template v-if="item.type === 'select'">
								<el-select
									v-model="searchForm[item.prop]"
									:placeholder="item.placeholder"
									style="width: 100%"
								>
									<template v-for="option in item.options" :key="option.value">
										<el-option :label="option.label" :value="option.value" />
									</template>
								</el-select>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>

		<!-- 重置和搜索按钮 -->
		<div class="btns">
			<el-button icon="Refresh" @click="handleResetClick">重置</el-button>
			<el-button icon="Search" type="primary" @click="handleQueryClick">查询</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
//@ts-ignore
import usePermission from '@/hooks/usePermission'
// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

type IProps = {
	searchConfig: {
		pageName: string
		formItems: any[]
	}
}
// 接收父组件传入的属性
const initialForm: any = {}
const props = defineProps<IProps>()

// 获取是否有对应的按钮权限
const isQuery = usePermission(`${props.searchConfig.pageName}:query`)

// 初始化搜索的值
for (const item of props.searchConfig.formItems) {
	initialForm[item.prop] = ''
}
const searchForm = reactive(initialForm)

// 点击重置
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
	// 1.对表单数据进行清空
	formRef.value?.resetFields()

	// 2.发送重置事件出去
	emit('resetClick')
}

// 点击查询
function handleQueryClick() {
	// 发送搜索事件出去
	emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
	padding: 20px;
	background-color: #fff;

	.el-form-item {
		padding: 20px 12px;
		margin-bottom: 0;
	}

	.btns {
		text-align: right;
		padding: 0 10px 10px;

		.el-button {
			height: 36px;
			margin-left: 20px;
		}
	}
}
</style>
