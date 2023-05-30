<template>
	<div class="main">
		<el-container class="main-content">
			<el-aside :width="isFold ? '60px' : '210px'">
				<main-menu :is-fold="isFold" />
			</el-aside>
			<el-container>
				<el-header height="50px">
					<main-header @fold-change="handleFoldChange" />
				</el-header>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
// 处理子组件传过来折叠状态
const handleFoldChange = (flag: boolean) => {
	isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
	height: 100%;
	.main-content {
		height: 100%;
		.el-aside {
			background-color: #001529;
			overflow-x: hidden;
			overflow-y: auto;
			cursor: pointer;
			transition: width 0.25s linear;

			-ms-overflow-style: none; /* Edge */
			scrollbar-width: none; /* Firefox */

			&::-webkit-scrollbar {
				display: none; /* WebKit */
			}
		}
		.el-header {
			background-color: #fff;
		}
		.el-main {
			background-color: #f1f1f1;
		}
	}
}
</style>
