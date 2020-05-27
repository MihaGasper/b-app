import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  public event: EventEmitter<any> = new EventEmitter();
  closeBtnName: string;
  modalTitle: string;

  constructor(public bsModalRef: BsModalRef) {}

  delete() {
    this.triggerEvent();
    this.bsModalRef.hide();
  }

  triggerEvent() {
    this.event.emit({ delete: true });
  }
}
