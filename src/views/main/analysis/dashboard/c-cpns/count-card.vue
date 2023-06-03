<template>
	<div class="count-card">
		<div class="header">
			<span>{{ title }}</span>
			<el-tooltip :content="tips" placement="top" effect="light">
				<el-icon><Warning /></el-icon>
			</el-tooltip>
		</div>
		<div class="content">
			<!-- <span v-if="amount === 'saleroom'">¥</span> -->
			<span ref="count1Ref">{{ number1 }}</span>
		</div>
		<div class="footer">
			<span>{{ subtitle }}</span>
			<!-- <span v-if="amount === 'saleroom'">¥</span> -->
			<span ref="count2Ref">{{ number2 }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CountUp } from 'countup.js'

type IProps = {
	amount?: string
	title?: string
	tips?: string
	subtitle?: string
	number1?: number
	number2?: number
}
const props = withDefaults(defineProps<IProps>(), {
	title: '商品总销量',
	tips: '所有商品的总销量',
	subtitle: '商品总销量',
	number1: 509989,
	number2: 509989
})

// 获取dom元素
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()

const countOption = {
	prefix: props.amount === 'saleroom' ? '¥' : '',
	duration: 1
}

onMounted(() => {
	// 给元素的数量加动画效果
	const countup1 = new CountUp(count1Ref.value, props.number1, countOption)
	const countup2 = new CountUp(count2Ref.value, props.number2, countOption)
	countup1.start()
	countup2.start()
})
</script>

<style lang="less" scoped>
.count-card {
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	height: 130px;
	background: white;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

	.header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		height: 38px;
		font-size: 14px;
		color: rgba(0, 0, 0, 0.45);
	}
	.content {
		flex: 1;
		display: flex;
		align-items: center;
		margin-left: -1px;
		font-size: 26px;
		color: rgba(0, 0, 0, 0.85);
	}
	.footer {
		display: flex;
		align-items: center;
		height: 38px;
		font-size: 14px;
		letter-spacing: 1px;
		color: rgba(0, 0, 0, 0.85);
		border-top: 1px solid #f1f1f1;
		span:last-of-type {
			margin-left: 2px;
		}
	}
}
</style>
