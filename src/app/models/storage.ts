export type TSchedule = true | false;
export interface Storage {
	id: number,
	name: string,
	adress: string,
	phone?: string,
	email?: string,
	schedule: TSchedule[],
	isActive: boolean
}
