import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
	history: createWebHashHistory(),
	// 映射关系：path => component
	routes: [
		{
			path: '/',
			redirect: '/main'
		},
		{
			path: '/login',
			component: () => import('../views/login/login.vue')
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('../views/main/main.vue')
		},
		{
			path: '/:pathMatch(.*)',
			component: () => import('../views/not-found/not-found.vue')
		}
	]
})

// 导航守卫
// 参数：to(跳转到的位置)、from(从哪里跳转过来)
// 返回值：返回值决定导航的路径(不返回或者返回undefined，默认跳转)
// 举个例子：/ => /main
// to: /main  from: / 返回值：/abc
router.beforeEach((to) => {
	// 只有登录成功(token),才会真正进入main页面
	const token = localCache.getCache(LOGIN_TOKEN)
	if (to.path === '/main' && !token) {
		return '/login'
	}

	// 如果进入到main页面
	if (to.path === '/main') {
		return firstMenu?.url
	}
})

export default router
