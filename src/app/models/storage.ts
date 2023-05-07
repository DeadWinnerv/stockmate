export type TSchedule = true | false;
export interface IStorage {
	_id: string ,
	name: string,
	address: string,
	phone?: string,
	email?: string,
	schedule: TSchedule[],
	isActive: boolean,
  createdBy: string ,
}
