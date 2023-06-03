<template>
	<div class="chart-card">
		<div class="header">{{ header ?? '默认标题' }}</div>
		<div class="content">
			<slot> 默认内容 </slot>
		</div>
	</div>
</template>

<script setup lang="ts">
type IProps = {
	header: string
}
defineProps<IProps>()
</script>

<style lang="less" scoped>
.chart-card {
	display: flex;
	flex-direction: column;
	background: white;
	font-size: 14px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

	.header {
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 40px;
	}
	.content {
		padding: 20px;

		border-top: 2px solid #f1f1f1;
	}
}
</style>
