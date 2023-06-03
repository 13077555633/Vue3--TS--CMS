<template>
	<div class="content">
		<div class="header">
			<h2>{{ contentConfig?.header?.title ?? '数据列表' }}</h2>
			<el-button
				type="primary"
				@click="handleNewPageDataClick"
				v-if="contentConfig.header.btnTitle && isCreate"
			>
				{{ contentConfig?.header?.btnTitle ?? '新建数据' }}
			</el-button>
		</div>
		<div class="table" style="z-index: 1">
			<el-table
				:data="pageList"
				border
				stripe
				style="width: 100%"
				v-bind="contentConfig.childrenTree"
			>
				<template v-for="item in contentConfig.propsList" :key="item.prop">
					<template v-if="item.type === 'timer'">
						<el-table-column align="center" v-bind="item">
							<template #default="scope">{{ formatUTC(scope.row[item.prop]) }}</template>
						</el-table-column>
					</template>

					<template v-else-if="item.type === 'handler'">
						<el-table-column align="center" v-bind="item">
							<template #default="scope">
								<el-button
									v-if="isUpdate"
									size="small"
									icon="Edit"
									type="primary"
									text
									@click="handleEditPageDataClick(scope.row)"
									>编辑</el-button
								>
								<el-button
									v-if="isDelete"
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
					</template>

					<template v-else-if="item.type === 'custom'">
						<el-table-column align="center" v-bind="item">
							<template #default="scope">
								<slot :name="item.slotName" v-bind="scope" :prop="item.prop"></slot>
							</template>
						</el-table-column>
					</template>

					<template v-else>
						<el-table-column align="center" v-bind="item" />
					</template>
				</template>
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
// @ts-ignore
import usePermission from '@/hooks/usePermission'

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 接收属性
type IProps = {
	contentConfig: {
		pageName: string
		header: {
			title: string
			btnTitle: string
		}
		propsList: any[]
		childrenTree?: any
	}
}
const props = defineProps<IProps>()

// 获取是否有对应的按钮权限
const isCreate = usePermission(`${props.contentConfig.pageName}:create`)
const isDelete = usePermission(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermission(`${props.contentConfig.pageName}:update`)
const isQuery = usePermission(`${props.contentConfig.pageName}:query`)

const systemStore = useSystemStore()
// 1.发起action，请求用户列表
const currentPage = ref(1)
const pageSize = ref(10)

// 监听action的触发(让新建数据后回到第一页)
systemStore.$onAction(({ name, after }) => {
	after(() => {
		if (name === 'newPageDataAction') {
			currentPage.value = 1
		}
	})
})

fetchPageListData()

// 2.获取页面列表数据进行展示
const { pageList, pageTotalCount } = storeToRefs(systemStore) // 类型于计算属性computed和监听watch

// 自定义列表的索引index
// function indexMethod(index: number) {
// 	const size = pageSize.value
// 	const offset = (currentPage.value - 1) * size
// 	return offset + index + 1
// }

// 3.分页的逻辑
function handleSizeChange() {
	fetchPageListData()
}
function handleCurrentChange() {
	fetchPageListData()
}

// 4.定义函数，用于发送网络请求分页数据
function fetchPageListData(queryInfo: any = {}) {
	if (!isQuery) return

	const size = pageSize.value
	const offset = (currentPage.value - 1) * size
	const localInfo = { size, offset }

	// 对分页进行缓存
	localCache.setCache('localInfo', localInfo)

	const info = { ...localInfo, ...queryInfo }
	// 发起action，请求列表
	systemStore.postPageListAction(props.contentConfig.pageName, info)
}

// 对用户的操作-------------------------------------
// 5.删除用户数据
function handleDeleteClick(id: number) {
	const localInfo = localCache.getCache('localInfo')

	systemStore.deletePageByIdAction(props.contentConfig.pageName, id, localInfo)
}
// 6.新建
function handleNewPageDataClick() {
	emit('newClick')
}
// 7.编辑
function handleEditPageDataClick(itemData: any) {
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
