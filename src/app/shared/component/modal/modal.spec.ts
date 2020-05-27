import { ComponentFixture, TestBed} from '@angular/core/testing';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let fixture: ComponentFixture<ModalComponent>;
  let component: ModalComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BsModalRef
      ],
      declarations: [ModalComponent],
      imports: [ModalModule.forRoot()]
    });

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should call delete method when modal delete button is clicked',() => {
    const cancelModalButton = fixture.debugElement.query(By.css('.btn-delete'));
    spyOn(component, 'delete').and.callThrough();

    cancelModalButton.triggerEventHandler('click', null);
    expect(component.delete).toHaveBeenCalled();
  });

});
