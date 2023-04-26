export interface Storage {
	id: number,
	name: string,
	adress: string,
	phone?: string,
	email?: string,
	schedule: 'full-time' | 'weekdays'
}
