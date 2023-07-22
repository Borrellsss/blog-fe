import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'strReplace'
})
export class StrReplacePipe implements PipeTransform {
  transform(value: any, regex: string, replaceWith: string): unknown {
    return value.replace(regex, replaceWith);
  }
}
