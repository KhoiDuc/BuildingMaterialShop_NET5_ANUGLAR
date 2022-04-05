import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productSort'
})
export class ProductSortPipe implements PipeTransform {

  transform(values: any[]): any[] {
    return values.sort((a, b) => a.lastname.localeCompare(b.lastname));
  }
}