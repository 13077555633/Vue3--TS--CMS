<template>
	<div class="breadcrumb">
		<el-breadcrumb separator-icon="ArrowRight">
			<template v-for="item in breadcrumbs" :key="item.name">
				<el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
//@ts-ignore
import { mapPathToBreadcrumb } from '@/utils/map-menus'
//@ts-ignore
import useLoginStore from '@/stores/login/login'

// 根据动态路由设置相应的面包屑
const route = useRoute() // 获取当前路由对象,切换菜单路由时里面的路由对象会发生改变
// watch(route, (newValue) => {
// 	console.log(newValue.path)
// })

const userMenus = useLoginStore().userMenus // 获取菜单对象
const breadcrumbs = computed(() => {
	return mapPathToBreadcrumb(route.path, userMenus) // 根据当前路由对象获取该当前面包屑
})
</script>

<style lang="less" scoped></style>
