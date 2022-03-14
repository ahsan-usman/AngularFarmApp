import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom1'
})
export class Custom1Pipe implements PipeTransform {


  transform(items: any[], attr: string): any  {
    if(!items) return [];
    if(!attr) return items;

    return items.filter( it => {
      return it.name.includes(attr);
    }).reduce((a, b) => a.total + b.total, 0);
   }
    
  }


