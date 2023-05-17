import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableHeader',
})
export class TableHeaderPipe implements PipeTransform {
  transform(value: string): any {
    switch (value) {
      case 'productName':
        return 'Товар';
      case 'productPrice':
        return 'Цена';
      case 'stock':
        return 'Остаток';
      case 'storageName':
        return 'Склад';
      case 'totalPrice':
        return 'Всего';
      case '_id':
        return 'ID';
      case 'name':
        return 'Название';
      case 'price':
        return 'Цена';
      case 'createdAt':
        return 'Создано'
      case 'updatedAt':
        return 'Обновлено'
      case 'status':
        return 'Статус'
      case 'positions':
        return 'Позиции'
      case 'orderPrice':
        return 'Стоимость'
      default:
        return value;
    }
  }
}
