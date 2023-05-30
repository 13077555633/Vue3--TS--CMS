<template>
	<div class="panel-account">
		<el-form
			ref="formRef"
			:model="account"
			:rules="accountRules"
			label-width="55px"
			size="large"
			status-icon
		>
			<el-form-item label="帐号" prop="name">
				<el-input v-model="account.name" />
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="account.password" show-password />
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup lang="ts">
//@ts-ignore
import { localCache } from '@/utils/cache'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
//@ts-ignore

import useLoginStore from '@/stores/login/login'
//@ts-ignore
import type { IAccount } from '@/types'

const LOGIN_NAME = 'name'
const LOGIN_PASSWORD = 'password'

const account = reactive<IAccount>({
	name: localCache.getCache(LOGIN_NAME) ?? '',
	password: localCache.getCache(LOGIN_PASSWORD) ?? ''
})

// 帐号密码校验规则
const accountRules: FormRules = {
	name: [
		{ required: true, message: '必须输入帐号信息~', trigger: 'blur' },
		{ pattern: /^[a-z0-9]{6,20}$/, message: '必须是6-20位的数字或字母组成~', trigger: 'blur' }
	],
	password: [
		{ required: true, message: '必须输入密码~', trigger: 'blur' },
		{ pattern: /^[a-z0-9]{3,}$/, message: '必须是3位以上的数字或字母组成~', trigger: 'blur' }
	]
}

// 执行登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
	formRef.value?.validate((valid) => {
		// 验证成功
		if (valid) {
			// 1.获取输入的帐号和密码
			const name = account.name
			const password = account.password

			// 2.想服务器发送网络请求(携带帐号密码)
			loginStore.loginAccountAction({ name, password }).then(() => {
				if (isRemPwd) {
					localCache.setCache(LOGIN_NAME, name)
					localCache.setCache(LOGIN_PASSWORD, password)
				} else {
					localCache.removeCache(LOGIN_NAME)
					localCache.removeCache(LOGIN_PASSWORD)
				}
			})
		} else {
			// 验证失败
			ElMessage.error('帐号或密码输入错误！')
		}
	})
}

defineExpose({
	loginAction
})
</script>

<style lang="less" scoped></style>
