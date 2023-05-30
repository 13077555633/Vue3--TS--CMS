<template>
	<div class="main-header">
		<div class="menu-icon" @click="handleIsFoldClick">
			<el-icon size="28px">
				<component :is="isFold ? 'Fold' : 'Expand'" />
			</el-icon>
		</div>
		<div class="content">
			<div class="breadcrumb">
				<header-breadcrumb />
			</div>
			<div class="info">
				<header-info />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerBreadcrumb from './c-cpns/header-breadcrumb.vue'
import headerInfo from './c-cpns/header-info.vue'

// 1.自定义事件(子传父事件)
const emit = defineEmits(['foldChange'])
const isFold = ref(false)
// 2.是否折叠菜单栏
const handleIsFoldClick = () => {
	// 改变折叠状态
	isFold.value = !isFold.value
	// 将状态传递给父组件
	emit('foldChange', isFold.value)
}
</script>

<style lang="less" scoped>
.main-header {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.menu-icon {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.breadcrumb {
			margin-left: 10px;
		}
	}
}
</style>
