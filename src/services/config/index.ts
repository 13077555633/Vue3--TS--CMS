// 方式1.区分开发环境dev和生产环境prod
// export const BASE_URL = 'http://codercba.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 方式2.代码逻辑判断，判断当前环境
// 利用vite默认提供的环境变量import.meta.env,如果是webpack，则是process.env.变量名
// console.log(import.meta.env.MODE) // 具体值development/production
// console.log(import.meta.env.DEV) // 是否为开发环境 true/false
// console.log(import.meta.env.PROD) // 是否为生产环境 true/false
// console.log(import.meta.env.SSR) // 是否为服务器端渲染 server side render
let BASE_URL = ''
if (import.meta.env.PROD) {
	BASE_URL = 'http://codercba.com:5000'
} else {
	BASE_URL = 'http://codercba.com:5000'
}
// console.log(BASE_URL)
// console.log(import.meta.env)

export const TIME_OUT = 10000
export { BASE_URL }
