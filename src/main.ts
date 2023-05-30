import { createApp } from 'vue'

import 'normalize.css'
import '@/assets/css/index.less'

import router from './router'
import registerStore from './stores'

// 0.针对引入elementPlus的消息组件和加载组件的方式
// 方式一：全局引入
// import 'element-plus/dist/index.css'
// 方式二：手动进行 组件的样式引入
// import 'element-plus/theme-chalk/el-message.css'
// 方式三：安装插件，并且在vite的配置文件进行相关的配置，实现自动按需导入 npm i vite-plugin-style-import consola -D

// 1.全局注册elementPlus：方便 简介
// import elementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(elementPlus)

// 2.按需导入：使用自动按需导入的插件
// npm install -D unplugin-vue-components unplugin-auto-import

// 3.全局导入elementPlus图标 先安装插件npm install @element-plus/icons-vue
// 然后封装全局导入函数，通过vue.use()运行函数
import registerIcons from './global/register-icons'

import App from './App.vue'

const app = createApp(App)
app.use(registerIcons)
app.use(registerStore)
app.use(router)
app.mount('#app')
