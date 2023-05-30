import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'
const pinia = createPinia()

function registerStore(app: App) {
	// 注册pinia
	app.use(pinia)

	// 刷新页面时重新加载动态路由
	const loginStore = useLoginStore()
	loginStore.loadLocalCacheAction()
}

export default registerStore
