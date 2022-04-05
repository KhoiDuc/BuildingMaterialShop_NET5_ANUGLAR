import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})

export class SearchTablePipe implements PipeTransform{
  transform(value: any, args?: any): any{
    if(!args) {
      return value;
    }

    return value.filter((val) => {
      let rVal =
        (val.address.includes(args)) ||
        (val.email.includes(args)) || 
        (val.fullName.includes(args)) ||
        (val.phoneNumber.includes(args)) ||
        (val.birthDay.includes(args)) ;
      return rVal;
    })
  }
}

@Pipe({
  name: 'productFilter'
})
export class ProductSearchPipe implements PipeTransform{
  transform(value: any, args?: any): any {
    if(!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =
        (val.address.includes(args)) ||
        (val.email.includes(args)) || 
        (val.fullName.includes(args)) ||
        (val.phoneNumber.includes(args)) ||
        (val.gender.includes(args));
      return rVal;
    })
  }
}
