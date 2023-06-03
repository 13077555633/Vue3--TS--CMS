import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/services/login/login'

import router from '@/router'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

import { mapMenusToPermission, mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
	token: string
	userInfo: any
	userMenus: any
	permission: any
}
const useLoginStore = defineStore('loginStore', {
	state: (): ILoginState => ({
		token: '',
		userInfo: {},
		userMenus: [],
		permission: []
	}),
	actions: {
		// 用户登录逻辑
		async loginAccountAction(account: IAccount) {
			// 1.帐号登录，获取token
			const loginResult = await accountLoginRequest(account)
			if (!loginResult.data) {
				ElMessage.error(loginResult.response.data)
				return
			}
			const token = loginResult.data.token
			const id = loginResult.data.id
			this.token = token

			// 2.进行本地缓存token
			localCache.setCache(LOGIN_TOKEN, token)

			// 2.1 获取该用户的角色信息
			const userInfoResult = await getUserInfoById(id)
			const userInfo = userInfoResult.data
			this.userInfo = userInfo

			const roleId = this.userInfo.role.id

			// 2.2 获取该用户的角色菜单
			const userMenusResult = await getUserMenusByRoleId(roleId)
			const userMenus = userMenusResult.data
			this.userMenus = userMenus

			// 2.3 本地缓存角色信息和角色菜单
			localCache.setCache('userInfo', userInfo)
			localCache.setCache('userMenus', userMenus)

			// 请求角色列表和部门列表的数据(新增用户、角色管理、部门管理 都会用到)
			const mainStore = useMainStore()
			mainStore.fetchEntireDataAction()

			// 重要：获取登录用户的所有按钮的权限
			const permission = mapMenusToPermission(userMenus)
			this.permission = permission

			// 重要：2.4 根据用户角色的相应的菜单信息动态添加相应的路由对象
			const routes = mapMenusToRoutes(userMenus) // 将获取动态路由 封装了函数
			routes.forEach((route) => router.addRoute('main', route))

			// 3.跳转到主页面
			router.push('/main')
		},

		// 本地保存数据和动态路由逻辑(页面刷新重新执行该函数)
		loadLocalCacheAction() {
			// 登录后会有本地缓存数据
			const token = localCache.getCache(LOGIN_TOKEN)
			const userInfo = localCache.getCache('userInfo')
			const userMenus = localCache.getCache('userMenus')

			if (token && userInfo && userMenus) {
				// 刷新页面时数据再次保存state
				this.token = token
				this.userInfo = userInfo
				this.userMenus = userMenus

				// 请求角色列表和部门列表的数据(新增用户、角色管理、部门管理 都会用到)
				const mainStore = useMainStore()
				mainStore.fetchEntireDataAction()

				// 重要：获取登录用户的所有按钮的权限
				const permission = mapMenusToPermission(userMenus)
				this.permission = permission

				//重要： 动态添加路由，防止刷新页面动态路由丢失
				const routes = mapMenusToRoutes(userMenus)
				routes.forEach((route) => router.addRoute('main', route))
			}
		}
	}
})

export default useLoginStore
