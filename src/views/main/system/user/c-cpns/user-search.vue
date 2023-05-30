<template>
	<div class="search">
		<!-- 搜索关键字的表单 -->
		<el-form ref="formRef" :model="searchForm" size="large" label-width="80px">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-form-item label="用户名" prop="name">
						<el-input v-model="searchForm.name" placeholder="请输入查询的用户名" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="真实姓名" prop="realname">
						<el-input v-model="searchForm.realname" placeholder="请输入查询的真实姓名" />
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="电话号码" prop="cellphone">
						<el-input v-model="searchForm.cellphone" placeholder="请输入查询的电话号码" />
					</el-form-item>
				</el-col>

				<el-col :span="8">
					<el-form-item label="状态" prop="enable">
						<el-select
							v-model="searchForm.enable"
							placeholder="请输入查询的状态"
							style="width: 100%"
						>
							<el-option label="启用" :value="1" />
							<el-option label="禁用" :value="0" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="创建时间" prop="createAt">
						<el-date-picker
							v-model="searchForm.createAt"
							type="daterange"
							range-separator="-"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
						/>
					</el-form-item>
				</el-col>
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

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const searchForm = reactive({
	name: '',
	realname: '',
	cellphone: '',
	enable: '',
	createAt: '' // 得到一个数组
})
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
