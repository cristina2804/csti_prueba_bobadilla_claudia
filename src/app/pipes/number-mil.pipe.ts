import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberMil'
})
export class NumberMilPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}
