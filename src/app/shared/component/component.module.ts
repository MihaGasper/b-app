import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalComponent } from './modal/modal.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ModalComponent,
    NotFoundComponent,
  ],
  exports: [
    ModalComponent,
    NotFoundComponent,
  ],
})
export class ComponentModule {}
