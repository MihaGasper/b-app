import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
  private units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  transform(bytes: number = 0, precision: number = 2): string {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
      return '?';
    }

    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }

    return Number.parseFloat(String(bytes)).toFixed(2) + ' ' + this.units[unit];
  }
}
