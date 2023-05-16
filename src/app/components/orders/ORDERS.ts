import { count } from "d3";
import { IOrder } from "src/app/models/order";

export const ORDERS: IOrder[] = [
	{
		_id: "01",
		createdAt: '01.12.2012',
		storageName: 'Омск',
		positions: [
			{
				product: {
					_id: '123124',
					name: 'Зубная щётка',
					price: 160
				},
				count: 1
			}
		],
		orderPrice: 1201,
		status: 'created',
		updatedAt: '12.01.12'
	},
	{
		_id: "02",
		createdAt: '01.11.2012',
		storageName: 'Томск',
		positions: [
			{
				product: {
					_id: '123123',
					name: 'Зубная нитка',
					price: 80
				},
				count: 1
			}
		],
		orderPrice: 80,
		status: 'created',
		updatedAt: '12.01.12'
	},
	{
		_id: "01231231",
		createdAt: '01.12.2012',
		storageName: 'Москва',
		positions: [
			{
				product: {
					_id: '123124',
					name: 'Зубная пятка',
					price: 220
				},
				count: 1
			}
		],
		orderPrice: 220,
		status: 'created',
		updatedAt: '12.01.12'
	},
]