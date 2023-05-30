import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// 因为utc是0时区，转成东八区要加8小时
export function formatUTC(utcString: string, format: string = 'YYYY/MM/DD HH:mm:ss') {
	const resultTime = dayjs.utc(utcString).utcOffset(8).format(format)
	return resultTime
}
