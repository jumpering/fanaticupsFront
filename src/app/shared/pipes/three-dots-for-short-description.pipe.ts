import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'threeDotsForShortDescription'
})
export class ThreeDotsForShortDescriptionPipe implements PipeTransform {

  transform(value: String): String {
    return value + '...';
  }

}
