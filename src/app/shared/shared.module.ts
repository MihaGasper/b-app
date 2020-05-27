import { NgModule } from '@angular/core';
import { ComponentModule } from './component/component.module';
import { FileSizePipe } from './size.pipe';

@NgModule({
  imports: [ComponentModule],
  declarations:[FileSizePipe],
  exports: [ComponentModule, FileSizePipe]
})

export class SharedModule { }
