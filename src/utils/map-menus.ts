import type { RouteRecordRaw } from 'vue-router'

// 获取所有的本地路由数组对象localRouters
export function loadLocalRoutes() {
	// .1.先创建数组对象存放路由信息
	const localRouters: RouteRecordRaw[] = []
	//2.通过vite的全局环境变量获取文件信息(这里的路由对象都存放在routers/main/**/*.ts文件下的，需要遍历出来并存放到数组中)
	const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
		eager: true
	})
	// 3.将路由对象存放到localRouters中
	for (const key in files) {
		const module = files[key]
		localRouters.push(module.default)
	}

	return localRouters
}

// 定义一个存放第一次进去main页面的路由对象 全局变量
export let firstMenu: any = null

// 根据菜单的路由信息去匹配正确的路由信息
export function mapMenusToRoutes(userMenus: any[]) {
	const localRouters = loadLocalRoutes() // 获取所有的本地路由数组对象

	// 4. 根据菜单路由path去匹配正确的路由对象
	const routes: RouteRecordRaw[] = []
	for (const menu of userMenus) {
		for (const subMenu of menu.children) {
			// 在本地路由中获取正确的路由对象
			const route = localRouters.find((item) => item.path === subMenu.url)
			// 5.将匹配到的路由对象存放到路由映射中(main的children中)
			if (route) {
				// 添加一级菜单路由和被一级菜单路由重定向第一次匹配到的路由对象
				if (!routes.find((item) => item.path === menu.url)) {
					routes.push({ path: menu.url, redirect: route.path })
				}

				// 保存正确匹配的动态路由信息
				routes.push(route)
			}
			// 记录第一个匹配到的菜单路由
			if (!firstMenu && route) firstMenu = subMenu
		}
	}
	return routes
}

/**
 *
 * @param path 传入的路由地址
 * @param userMenus 传入角色的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
	for (const menu of userMenus) {
		for (const subMenu of menu.children) {
			if (path === subMenu.url) {
				return subMenu
			}
		}
	}
}
interface IBreadcrumbs {
	name: string
	path: string
}
export function mapPathToBreadcrumb(path: string, userMenus: any[]) {
	// 定义面包屑数组对象
	const breadcrumbs: IBreadcrumbs[] = []

	for (const menu of userMenus) {
		for (const subMenu of menu.children) {
			if (path === subMenu.url) {
				// 添加当前菜单name和路由path
				breadcrumbs.push({ name: menu.name, path: menu.url }) // 主菜单
				breadcrumbs.push({ name: subMenu.name, path: subMenu.url }) // 子菜单
			}
		}
	}
	return breadcrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList: any[]) {
	const ids: number[] = []
	// 递归
	function recurseGetId(menus: any[]) {
		for (const item of menus) {
			if (item.children) {
				recurseGetId(item.children)
			} else {
				ids.push(item.id)
			}
		}
	}
	recurseGetId(menuList)

	return ids
}

/**
 * 从菜单映射到按钮的权限
 * @param menuList 菜单列表
 * @returns 按钮权限的字符串数组
 */
export function mapMenusToPermission(userMenus: any) {
	const permission: string[] = []

	function recursionPermission(menus: any) {
		for (const item of menus) {
			if (item.type === 3) {
				permission.push(item.permission)
			} else {
				recursionPermission(item.children ?? [])
			}
		}
	}
	recursionPermission(userMenus)

	return permission
}
