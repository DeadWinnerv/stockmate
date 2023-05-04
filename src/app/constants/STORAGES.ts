import { Storage } from "../models/storage";

export const STORAGES: Storage[] = [
	{
		id: 16352,
		name: 'Склад 1',
		adress: 'г. Воронеж, ул.Александровская, д.6/1',
		schedule: [true, true, true, true, true, false, false],
		isActive: true
	},
	{
		id: 12363,
		name: 'Склад 2',
		adress: 'г. Воронеж, ул. Федора Тютчева, д.99а',
		schedule: [true, true, true, true, true, false, false],
		phone: '+79008005544',
		email: 'email@mail.com',
		isActive: true
	},
	{
		id: 12353,
		name: 'Склад 3',
		adress: 'г. Воронеж, ул., д.6/1',
		schedule: [true, true, true, true, true, true, true],
		isActive: false
	},
	{
		id: 52434,
		name: 'Склад 4',
		adress: 'г. Воронеж, ул. Федора, д.99а',
		schedule: [true, true, true, true, true, false, false],
		phone: '+79008005544',
		email: 'email@mail.com',
		isActive: true
	},
	{
		id: 12312,
		name: 'Склад 5',
		adress: ' Harum, repellat veniam! Reprehenderit debitis deserunt animi!',
		schedule: [true, true, true, false, false, false, false],
		isActive: true
	},
	{
		id: 21231,
		name: 'Склад 6',
		adress: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
		schedule: [false, false, true, true, true, true, true],
		phone: '+79008005544',
		email: 'email@mail.com',
		isActive: true
	}
];