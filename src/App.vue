<template>
	<!-- 对日期组件的转成中文(文档：国际化) -->
	<el-config-provider :locale="locale">
		<div class="app">
			<Router-view></Router-view>
		</div>
	</el-config-provider>
</template>

<script setup lang="ts">
import locale from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped>
.app {
	width: 100vw;
	height: 100vh;
}
</style>
