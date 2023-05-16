import { IProduct } from "./product";

export interface IOrderPosition {
	product: IProduct,
	count: number
}