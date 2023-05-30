<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<div class="tabs">
			<el-tabs v-model="activeName" type="border-card" stretch>
				<el-tab-pane label="帐号登录" name="account">
					<template #label>
						<el-icon class="icon"><UserFilled /></el-icon>
						<span class="text">账号登录</span>
					</template>
					<panel-account ref="accountRef" />
				</el-tab-pane>
				<el-tab-pane label="手机登录" name="phnoe">
					<template #label>
						<el-icon class="icon"><Cellphone /></el-icon>
						<span class="text">手机登录</span>
					</template>
					<panel-phone />
				</el-tab-pane>
			</el-tabs>
		</div>
		<div class="controls">
			<el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
			<el-link type="primary">忘记密码</el-link>
		</div>
		<el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">
			点击登录
		</el-button>
	</div>
</template>

<script setup lang="ts">
//@ts-ignore
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'
import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)

watch(isRemPwd, (newValue) => {
	localCache.setCache('isRemPwd', newValue)
})

const accountRef = ref<InstanceType<typeof PanelAccount>>() // 拿组件类的返回值实例的类型

function handleLoginBtnClick() {
	if (activeName.value === 'account') {
		accountRef.value?.loginAction(isRemPwd.value)
	} else {
		console.log('用户点击了手机登录')
	}
}
</script>

<style lang="less" scoped>
.login-panel {
	width: 330px;
	margin-bottom: 150px;
	.title {
		text-align: center;
		margin-bottom: 15px;
	}
	.tabs {
		.icon {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.text {
			margin-left: 5px;
		}
	}
	.controls {
		margin-top: 12px;
		display: flex;

		justify-content: space-between;
	}

	.login-btn {
		margin-top: 10px;
		width: 100%;
	}
}
</style>
