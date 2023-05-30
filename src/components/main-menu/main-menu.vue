<template>
	<div class="main-menu">
		<div class="logo">
			<img class="img" src="@/assets/img/logo.png" alt="" />
			<div class="title" v-if="!isFold">后台管理系统</div>
		</div>

		<div class="menu">
			<el-menu
				:default-active="defaultActive"
				text-color="#b7bdc3"
				active-text-color="#fff"
				background-color="#001529"
				:collapse="isFold"
				:collapse-transition="false"
			>
				<!-- 1.遍历角色菜单 -->
				<template v-for="item in userMenus" :key="item.id">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<!-- 使用动态组件获取图标 -->
							<el-icon>
								<component :is="item.icon.split('el-icon-')[1]" />
							</el-icon>
							<span>{{ item.name }}</span>
						</template>

						<template v-for="subitem in item.children" :key="subitem.id">
							<el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">
								{{ subitem.name }}
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>

				<!-- <el-sub-menu index="2">
					<template #title>
						<el-icon><document /></el-icon>
						<span>Group One2</span>
					</template>
					<el-menu-item index="2-1">item one</el-menu-item>
					<el-menu-item index="2-2">item two</el-menu-item>
				</el-sub-menu> -->
			</el-menu>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// @ts-ignore
import useLoginStore from '@/stores/login/login'
// @ts-ignore
import { mapPathToMenu } from '@/utils/map-menus'
import { useRoute, useRouter } from 'vue-router'

// 获取父组件传过来的折叠状态
defineProps({
	isFold: {
		type: Boolean,
		default: false
	}
})

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus // 获取用户角色菜单

// 监听菜单的点击
const router = useRouter()
function handleItemClick(item) {
	const url = item.url // 拿到点击的菜单路由
	router.push(url) // 跳转到该路由
}

// ------------------ 这里是防止刷新main页面路由和高亮丢失 -----------------------
const route = useRoute() // 获取当前路由对象
// 设置第一次进入main页面的路由
const defaultActive = computed(() => {
	const pathMenu = mapPathToMenu(route.path, userMenus) // 获取刷新进入main页面的路由对象
	return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
	height: 100%;
	background-color: #001529;
}
.logo {
	display: flex;
	height: 28px;
	padding: 12px 10px 8px 10px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	.img {
		height: 100%;
		margin: 0 10px;
	}

	.title {
		margin-right: 10px;

		font-size: 16px;
		font-weight: 700;
		color: white;
		overflow: hidden;
		white-space: nowrap;
	}
	.CollapseBtn {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.el-menu {
	transition: all 10ms;

	border-right: none; // 隐藏有边框
	user-select: none; // 禁止选中文本

	.el-sub-menu {
		.el-menu-item {
			padding-left: 50px !important;
			background-color: #0c2135;
		}

		.el-menu-item:hover {
			color: #fff;
		}

		.el-menu-item.is-active {
			background-color: #0a60bd;
		}
	}
}
</style>
