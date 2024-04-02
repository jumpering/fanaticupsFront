import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitInTwoLines',
  standalone: true
})
export class SplitInTwoLinesPipe implements PipeTransform {

  transform(value: String): String {
// if(value.length > 50){
//   // const parts = value.split(' ');
//   // const middle = Math.ceil(parts.length / 2);
//   // const firstLine = parts.slice(0, middle).join(' ');
//   // const secondLine = parts.slice(middle).join(' ');
//   // return `${firstLine}<br>${secondLine}`;
// }
//   return value;
    const parts = value.split(' ');
    const middle = Math.ceil(parts.length / 2);
    const firstLine = parts.slice(0, middle).join(' ');
    const secondLine = parts.slice(middle).join(' ');
    return `${firstLine}<br>${secondLine}`;
  }

}
