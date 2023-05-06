export type TSchedule = true | false;
export interface Storage {
	_id: string ,
	name: string,
	adress: string,
	phone?: string,
	email?: string,
	schedule: TSchedule[],
	isActive: boolean,
  createdBy: string ,
}
