import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberDecimal'
})
export class NumberDecimalPipe implements PipeTransform {

  transform(value: number): string {
    return value.toFixed(2);
  }

}
