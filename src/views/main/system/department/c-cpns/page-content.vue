<template>
	<div class="content">
		<div class="header">
			<h2>部门列表</h2>
			<el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
		</div>
		<div class="table" style="z-index: 1">
			<el-table :data="pageList" border stripe style="width: 100%; z-index: 10">
				<el-table-column align="center" type="selection" width="40px" />
				<el-table-column
					type="index"
					:index="indexMethod"
					align="center"
					label="序号"
					width="60px"
				/>
				<el-table-column align="center" prop="name" label="部门名称" width="140px" />
				<el-table-column align="center" prop="leader" label="部门领导" width="140px" />
				<el-table-column align="center" prop="parentId" label="上级部门" width="160px" />
				<el-table-column align="center" prop="createAt" label="创建时间">
					<template #default="scope">{{ formatUTC(scope.row.createAt) }}</template>
				</el-table-column>
				<el-table-column align="center" prop="updateAt" label="更新时间">
					<template #default="scope">{{ formatUTC(scope.row.updateAt) }}</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="150px">
					<template #default="scope">
						<el-button
							size="small"
							icon="Edit"
							type="primary"
							text
							@click="handleEditClick(scope.row)"
							>编辑</el-button
						>
						<el-button
							size="small"
							icon="Delete"
							type="danger"
							text
							@click="handleDeleteClick(scope.row.id)"
						>
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:page-sizes="[5, 10, 20, 30]"
				small
				background
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotalCount"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
// @ts-ignore
import useSystemStore from '@/stores/main/system/system'
// @ts-ignore
import { formatUTC } from '@/utils/format'
// @ts-ignore
import { localCache } from '@/utils/cache'

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

const systemStore = useSystemStore()
// 1.发起action，请求用户列表
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()

// 2.获取页面列表数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore) // 类型于计算属性computed和监听watch

// 自定义列表的索引index
function indexMethod(index: number) {
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	return offset + index + 1
}

// 3.分页的逻辑
function handleSizeChange() {
	fetchPageListData()
}
function handleCurrentChange() {
	fetchPageListData()
}

// 4.定义函数，用于发送网络请求分页数据
function fetchPageListData(queryInfo: any = {}) {
	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	const localInfo = { size, offset }

	// 对分页进行缓存
	localCache.setCache('localInfo', localInfo)

	const info = { ...localInfo, ...queryInfo }
	// 发起action，请求列表
	systemStore.postPageListAction('department', info)
}

// 对用户的操作-------------------------------------
// 5.删除用户数据
function handleDeleteClick(id: number) {
	const pageInfo = localCache.getCache('pageInfo')

	systemStore.deletePageByIdAction('department', id, pageInfo)
}
// 6.新建用户
function handleNewUserClick() {
	emit('newClick')
}
// 7.编辑用户
function handleEditClick(itemData: any) {
	emit('editClick', itemData)
}
// 为父组件暴露方法：ref使用
defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
	margin-top: 20px;
	padding: 20px;
	background-color: #fff;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
}
.table {
	:deep(.el-table__cell) {
		padding: 10px 0;
	}
	.el-button {
		margin-left: 0px;
		padding: 5px 8px;
	}
}

.pagination {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}
</style>
