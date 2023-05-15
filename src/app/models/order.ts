import { IOrderPosition } from "./position"

export interface IOrder {
	_id: string,
	createdAt: string,
	storageName: string,
	positions: IOrderPosition[],
	orderPrice: number,
	status: 'created' | 'paid' | 'delievering' | 'acceptence' | 'completed',
	updatedAt: string
}