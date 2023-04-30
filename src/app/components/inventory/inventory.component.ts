import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface inventoryData {
  id: number;
  name: string;
  storage: string;
  price: number;
  stock: number;
}

type TColumnName = 'id' | 'name' | 'storage' | 'price' | 'stock' | '';

type TSortingColumn = {
  column?: TColumnName;
  direction?: 'asc' | 'desc';
};

const INVENTORY: inventoryData[] = [
  {
    id: 1,
    name: 'Книга',
    storage: 'Хоругвино',
    price: 699,
    stock: 10,
  },
  {
    id: 2,
    name: 'Ноутбук',
    storage: 'Тверь',
    price: 56999,
    stock: 5,
  },
  {
    id: 3,
    name: 'Фотоаппарат',
    storage: 'Воронеж',
    price: 23999,
    stock: 8,
  },
  {
    id: 4,
    name: 'Кофемашина',
    storage: 'Хоругвино',
    price: 12999,
    stock: 3,
  },
  {
    id: 5,
    name: 'Утюг',
    storage: 'Тверь',
    price: 2499,
    stock: 12,
  },
  {
    id: 6,
    name: 'Холодильник',
    storage: 'Воронеж',
    price: 48999,
    stock: 2,
  },
  {
    id: 7,
    name: 'Микроволновка',
    storage: 'Хоругвино',
    price: 7999,
    stock: 6,
  },
  {
    id: 8,
    name: 'Фен',
    storage: 'Тверь',
    price: 1499,
    stock: 15,
  },
  {
    id: 9,
    name: 'Монитор',
    storage: 'Воронеж',
    price: 25999,
    stock: 4,
  },
  {
    id: 10,
    name: 'Телевизор',
    storage: 'Хоругвино',
    price: 69999,
    stock: 1,
  },
  {
    id: 11,
    name: 'Мышь',
    storage: 'Хоругвино',
    price: 1999,
    stock: 20,
  },
  {
    id: 12,
    name: 'Клавиатура',
    storage: 'Тверь',
    price: 2999,
    stock: 15,
  },
  {
    id: 13,
    name: 'Настольная лампа',
    storage: 'Воронеж',
    price: 4999,
    stock: 7,
  },
  {
    id: 14,
    name: 'Пылесос',
    storage: 'Хоругвино',
    price: 15999,
    stock: 4,
  },
  {
    id: 15,
    name: 'Умные часы',
    storage: 'Тверь',
    price: 7999,
    stock: 9,
  },
  {
    id: 16,
    name: 'Блендер',
    storage: 'Воронеж',
    price: 3999,
    stock: 11,
  },
  {
    id: 17,
    name: 'Электрический чайник',
    storage: 'Хоругвино',
    price: 2499,
    stock: 18,
  },
  {
    id: 18,
    name: 'Кошелек',
    storage: 'Тверь',
    price: 1499,
    stock: 25,
  },
  {
    id: 19,
    name: 'Джинсы',
    storage: 'Воронеж',
    price: 3999,
    stock: 6,
  },
  {
    id: 20,
    name: 'Кроссовки',
    storage: 'Хоругвино',
    price: 8999,
    stock: 3,
  },
  {
    id: 21,
    name: 'Чехол для смартфона',
    storage: 'Тверь',
    price: 499,
    stock: 30,
  },
  {
    id: 22,
    name: 'Коврик для мыши',
    storage: 'Воронеж',
    price: 599,
    stock: 22,
  },
  {
    id: 23,
    name: 'Кружка',
    storage: 'Хоругвино',
    price: 299,
    stock: 40,
  },
  {
    id: 24,
    name: 'Сковорода',
    storage: 'Тверь',
    price: 1499,
    stock: 12,
  },
  {
    id: 25,
    name: 'Набор посуды',
    storage: 'Воронеж',
    price: 6999,
    stock: 5,
  },
  {
    id: 26,
    name: 'Бумага для принтера',
    storage: 'Хоругвино',
    price: 799,
    stock: 50,
  },
  {
    id: 27,
    name: 'Батарейки',
    storage: 'Тверь',
    price: 299,
    stock: 40,
  },
  {
    id: 28,
    name: 'Мыло',
    storage: 'Воронеж',
    price: 99,
    stock: 100,
  },
  {
    id: 29,
    name: 'Шампунь',
    storage: 'Хоругвино',
    price: 299,
    stock: 25,
  },
  {
    id: 30,
    name: 'Тушь для ресниц',
    storage: 'Тверь',
    price: 499,
    stock: 20,
  },
  {
    id: 31,
    name: 'Крем для рук',
    storage: 'Воронеж',
    price: 299,
    stock: 30,
  },
  {
    id: 32,
    name: 'Стиральный порошок',
    storage: 'Хоругвино',
    price: 999,
    stock: 15,
  },
  {
    id: 33,
    name: 'Гель для душа',
    storage: 'Тверь',
    price: 399,
    stock: 25,
  },
  {
    id: 34,
    name: 'Крем для лица',
    storage: 'Воронеж',
    price: 899,
    stock: 10,
  },
  {
    id: 35,
    name: 'Пакеты для мусора',
    storage: 'Хоругвино',
    price: 199,
    stock: 50,
  },
  {
    id: 36,
    name: 'Ноутбук',
    storage: 'Хоругвино',
    price: 59999,
    stock: 5,
  },
  {
    id: 37,
    name: 'Коврик для мыши',
    storage: 'Тверь',
    price: 499,
    stock: 20,
  },
  {
    id: 38,
    name: 'Губная помада',
    storage: 'Воронеж',
    price: 399,
    stock: 30,
  },
  {
    id: 39,
    name: 'Кухонные ножи',
    storage: 'Хоругвино',
    price: 1499,
    stock: 10,
  },
  {
    id: 40,
    name: 'Плитка для ванной комнаты',
    storage: 'Тверь',
    price: 4999,
    stock: 15,
  },
  {
    id: 41,
    name: 'Бейсболка',
    storage: 'Воронеж',
    price: 699,
    stock: 30,
  },
  {
    id: 42,
    name: 'Карандаши цветные',
    storage: 'Хоругвино',
    price: 299,
    stock: 50,
  },
  {
    id: 43,
    name: 'Матрас на надуве',
    storage: 'Тверь',
    price: 1999,
    stock: 10,
  },
  {
    id: 44,
    name: 'Конструктор Lego',
    storage: 'Воронеж',
    price: 2499,
    stock: 5,
  },
  {
    id: 45,
    name: 'Чайник электрический',
    storage: 'Хоругвино',
    price: 2999,
    stock: 5,
  },
  {
    id: 46,
    name: 'Блокнот',
    storage: 'Тверь',
    price: 149,
    stock: 100,
  },
  {
    id: 47,
    name: 'Клавиатура для компьютера',
    storage: 'Воронеж',
    price: 2999,
    stock: 10,
  },
  {
    id: 48,
    name: 'Флешка',
    storage: 'Хоругвино',
    price: 999,
    stock: 30,
  },
  {
    id: 49,
    name: 'Крем для тела',
    storage: 'Тверь',
    price: 299,
    stock: 40,
  },
  {
    id: 50,
    name: 'Шоколад',
    storage: 'Воронеж',
    price: 119,
    stock: 41,
  },
  {
    id: 51,
    name: 'Футболка',
    storage: 'Хоругвино',
    price: 999,
    stock: 20,
  },
  {
    id: 52,
    name: 'Набор кистей для макияжа',
    storage: 'Тверь',
    price: 1499,
    stock: 10,
  },
  {
    id: 53,
    name: 'Шампунь',
    storage: 'Воронеж',
    price: 249,
    stock: 50,
  },
  {
    id: 54,
    name: 'Набор детской посуды',
    storage: 'Хоругвино',
    price: 599,
    stock: 15,
  },
  {
    id: 55,
    name: 'Кошелек женский',
    storage: 'Тверь',
    price: 999,
    stock: 20,
  },
  {
    id: 56,
    name: 'Пульт ДУ для телевизора',
    storage: 'Воронеж',
    price: 399,
    stock: 10,
  },
  {
    id: 57,
    name: 'Кондиционер для волос',
    storage: 'Хоругвино',
    price: 349,
    stock: 30,
  },
  {
    id: 58,
    name: 'Кофта',
    storage: 'Тверь',
    price: 1499,
    stock: 10,
  },
  {
    id: 59,
    name: 'Бутылка для воды',
    storage: 'Воронеж',
    price: 299,
    stock: 30,
  },
  {
    id: 60,
    name: 'Резинки для волос',
    storage: 'Хоругвино',
    price: 99,
    stock: 50,
  },
  {
    id: 61,
    name: 'Чехол для смартфона',
    storage: 'Тверь',
    price: 499,
    stock: 20,
  },
  {
    id: 62,
    name: 'Крем для рук',
    storage: 'Воронеж',
    price: 149,
    stock: 40,
  },
  {
    id: 63,
    name: 'Пазл',
    storage: 'Хоругвино',
    price: 999,
    stock: 5,
  },
  {
    id: 64,
    name: 'Часы наручные',
    storage: 'Тверь',
    price: 2999,
    stock: 5,
  },
  {
    id: 65,
    name: 'Крем для тела',
    storage: 'Хоругвино',
    price: 199,
    stock: 30,
  },
  {
    id: 66,
    name: 'Набор маркеров',
    storage: 'Тверь',
    price: 499,
    stock: 15,
  },
  {
    id: 67,
    name: 'Мыло',
    storage: 'Воронеж',
    price: 49,
    stock: 100,
  },
  {
    id: 68,
    name: 'Детская книжка',
    storage: 'Хоругвино',
    price: 199,
    stock: 20,
  },
  {
    id: 69,
    name: 'Флешка USB 16 Гб',
    storage: 'Тверь',
    price: 599,
    stock: 10,
  },
  {
    id: 70,
    name: 'Кофе в зернах',
    storage: 'Воронеж',
    price: 599,
    stock: 20,
  },
  {
    id: 71,
    name: 'Шапка мужская',
    storage: 'Хоругвино',
    price: 799,
    stock: 15,
  },
  {
    id: 72,
    name: 'Домашняя тапочки',
    storage: 'Тверь',
    price: 499,
    stock: 25,
  },
  {
    id: 73,
    name: 'Книга',
    storage: 'Воронеж',
    price: 599,
    stock: 10,
  },
  {
    id: 74,
    name: 'Подушка',
    storage: 'Хоругвино',
    price: 999,
    stock: 10,
  },
  {
    id: 75,
    name: 'Гель для душа',
    storage: 'Тверь',
    price: 149,
    stock: 50,
  },
  {
    id: 76,
    name: 'Очки солнцезащитные',
    storage: 'Воронеж',
    price: 999,
    stock: 10,
  },
  {
    id: 77,
    name: 'Крем-гель для бритья',
    storage: 'Хоругвино',
    price: 199,
    stock: 30,
  },
  {
    id: 78,
    name: 'Чехол для планшета',
    storage: 'Тверь',
    price: 799,
    stock: 10,
  },
  {
    id: 79,
    name: 'Массажер для шеи',
    storage: 'Хоругвино',
    price: 2999,
    stock: 5,
  },
  {
    id: 80,
    name: 'Бумага для принтера',
    storage: 'Тверь',
    price: 599,
    stock: 30,
  },
  {
    id: 81,
    name: 'Карандаши цветные',
    storage: 'Воронеж',
    price: 99,
    stock: 50,
  },
  {
    id: 82,
    name: 'Книга на английском языке',
    storage: 'Хоругвино',
    price: 699,
    stock: 20,
  },
  {
    id: 83,
    name: 'Часы наручные женские',
    storage: 'Тверь',
    price: 1499,
    stock: 10,
  },
  {
    id: 84,
    name: 'Кроссовки мужские',
    storage: 'Воронеж',
    price: 3499,
    stock: 5,
  },
  {
    id: 85,
    name: 'Горшок для цветов',
    storage: 'Хоругвино',
    price: 399,
    stock: 30,
  },
  {
    id: 86,
    name: 'Пазл',
    storage: 'Тверь',
    price: 499,
    stock: 20,
  },
  {
    id: 87,
    name: 'Сковорода',
    storage: 'Воронеж',
    price: 999,
    stock: 10,
  },
  {
    id: 88,
    name: 'Печенье',
    storage: 'Хоругвино',
    price: 99,
    stock: 50,
  },
  {
    id: 89,
    name: 'Подушечка для колец',
    storage: 'Тверь',
    price: 299,
    stock: 30,
  },
  {
    id: 90,
    name: 'Скатерть',
    storage: 'Воронеж',
    price: 599,
    stock: 15,
  },
  {
    id: 91,
    name: 'Ключница',
    storage: 'Хоругвино',
    price: 399,
    stock: 20,
  },
  {
    id: 92,
    name: 'Плед',
    storage: 'Тверь',
    price: 999,
    stock: 10,
  },
  {
    id: 93,
    name: 'Банки для хранения продуктов',
    storage: 'Хоругвино',
    price: 799,
    stock: 15,
  },
  {
    id: 94,
    name: 'Термос',
    storage: 'Тверь',
    price: 1199,
    stock: 8,
  },
  {
    id: 95,
    name: 'Шампунь для волос',
    storage: 'Воронеж',
    price: 199,
    stock: 50,
  },
  {
    id: 96,
    name: 'Клавиатура компьютерная',
    storage: 'Хоругвино',
    price: 1999,
    stock: 5,
  },
  {
    id: 97,
    name: 'Комплект бокалов для вина',
    storage: 'Тверь',
    price: 1499,
    stock: 10,
  },
  {
    id: 98,
    name: 'Кошелек женский',
    storage: 'Воронеж',
    price: 799,
    stock: 15,
  },
  {
    id: 99,
    name: 'Браслет из натурального камня',
    storage: 'Хоругвино',
    price: 499,
    stock: 20,
  },
  {
    id: 100,
    name: 'Мультиварка',
    storage: 'Тверь',
    price: 4999,
    stock: 3,
  },
];

type TShownColumn = 'id' | 'name' | 'storage' | 'price' | 'stock' | ''
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements AfterViewInit {
  public displayedColumns: string[] = [
    'id',
    'name',
    'storage',
    'price',
    'stock',
  ];
  public dataSource = new MatTableDataSource<inventoryData>(INVENTORY);
  private sortedTable: inventoryData[] = [...INVENTORY];
  private filteredTable: inventoryData[] = [...INVENTORY];
  public storageFilter = 'all';
  public sortingColumn: TSortingColumn = {};
  public shownColumn: string = ''

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  handleStorageFilterChange(): void {
    this.sortingColumn = {}
    this.filteredTable = [...INVENTORY]
    this.filteredTable = this.filteredTable.filter((item) =>
      this.storageFilter !== 'all' ? item.storage === this.storageFilter : true
    );
    this.dataSource = new MatTableDataSource<inventoryData>(this.filteredTable);
    this.dataSource.paginator = this.paginator;
  }

  private sortData(columnName: TColumnName): void {
    this.sortedTable = [...this.filteredTable]
    const compareFn = (a: inventoryData, b: inventoryData): number => {
      const direction = this.sortingColumn.direction === 'asc' ? 1 : -1;
      switch (columnName) {
        case 'id':
          return direction * (a.id - b.id);
        case 'name':
          return direction * a.name.localeCompare(b.name);
        case 'price':
          return direction * (a.price - b.price);
        case 'stock':
          return direction * (a.stock - b.stock);
        default:
          return 0;
      }
    };
    
    !this.sortingColumn.direction
    ? this.sortedTable = [...this.filteredTable]
    : this.sortedTable.sort(compareFn)

    this.dataSource = new MatTableDataSource<inventoryData>(this.sortedTable);
    this.dataSource.paginator = this.paginator;
  }

  handleSortChange(columnName: TColumnName): void {
    if (this.sortingColumn.column !== columnName) {
      this.sortingColumn = { column: columnName, direction: 'desc' };
    } else if (this.sortingColumn.direction === 'desc') {
      this.sortingColumn.direction = 'asc';
    } else {
      this.sortingColumn = {};
    }
    this.sortData(columnName);
  }
}
