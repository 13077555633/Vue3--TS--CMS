import { coordinateData } from './coordinate-data'

export function convertData(data: any) {
	const res = []
	for (let i = 0; i < data.length; i++) {
		const geoCoord = coordinateData[data[i].name]
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: [...geoCoord, data[i].value]
			})
		}
	}
	return res
}
