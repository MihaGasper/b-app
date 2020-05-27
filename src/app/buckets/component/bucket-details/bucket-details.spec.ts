import { async, ComponentFixture, fakeAsync, getTestBed, TestBed} from '@angular/core/testing';
import { BucketDetailsComponent } from '../bucket-details/bucket-details.component';
import { RouterTestingModule} from '@angular/router/testing';
import { ApiService } from '../../../core/api/api.service';
import { FormBuilder } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { FileSizePipe } from '../../../../app/shared/size.pipe'
import { By } from '@angular/platform-browser';
import { ModalComponent } from '../../../shared/component/modal/modal.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

describe('BucketDetailsComponent', () => {
  let fixture: ComponentFixture<BucketDetailsComponent>;
  let component: BucketDetailsComponent;
  let element: HTMLElement;
  let mockApiService;
  let files;
  let bucket;
  let modalService;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['getFiles', 'getBucket', 'addFile', 'deleteFile', 'deleteBucket']);
    files = {
      bucketSize: 75654,
      objects:  [{
          last_modified: '2020-05-04T14:53:31.671541661Z',
          name: 'file-5.png',
          size: 75654
        }
      ]
    }
    bucket = {
      id: 'bucket1',
      location: {
        id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
        name: 'Ljubljana'
      },
      name: 'bucket1'
    }

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: mockApiService
        },
        FormBuilder,
        BsModalService,
        ModalComponent
      ],
      declarations: [BucketDetailsComponent, FileSizePipe],
      imports: [RouterTestingModule, ModalModule.forRoot(), TabsModule.forRoot()]
    });

    modalService = TestBed.inject(BsModalService);
    fixture = TestBed.createComponent(BucketDetailsComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create BucketDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render filesCount ',() => {
    mockApiService.getFiles.and.returnValue(of(files));
    mockApiService.getBucket.and.returnValue(of(bucket));
    fixture.detectChanges();

    expect(fixture.componentInstance.files.length).toBe(1);
    const filesCount = 'All Files (1)';
    const filesCountElement = fixture.debugElement.query(By.css('.files-count')).nativeElement;

    fixture.whenStable().then(() => {
      expect<any>(filesCountElement.textContent).toBe(filesCount);
    });
  });

  it('should render in template file name, file date and file size', async (() => {
    mockApiService.getFiles.and.returnValue(of(files));
    mockApiService.getBucket.and.returnValue(of(bucket));

    const filesName = 'file-5.png';
    const filesDate = '05/04/2020';
    const filesSize = '73.88 KB';

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const filesNameElement = fixture.debugElement.query(By.css('.file-name')).nativeElement;
      expect<any>(filesNameElement.textContent).toBe(filesName);

      const filesDateElement = fixture.debugElement.query(By.css('.file-date')).nativeElement;
      expect<any>(filesDateElement.textContent).toBe(filesDate);

      const filesSizeElement = fixture.debugElement.query(By.css('.file-size')).nativeElement;
      expect<any>(filesSizeElement.textContent).toBe(filesSize);
    });
  }));

  it('should not display the modal unless the delete button is clicked', () => {
    expect(modalService.modalsCount).toBe(0);
  });

  it('should display the modal when delete button is clicked', () => {
    mockApiService.getFiles.and.returnValue(of(files));
    mockApiService.getBucket.and.returnValue(of(bucket));
    fixture.detectChanges();

    let openModalButton = fixture.debugElement.query(By.css('.btn-open-modal'));
    spyOn(component, 'deleteFileFromBucket').and.callThrough();

    openModalButton.triggerEventHandler('click', null);
    expect(component.deleteFileFromBucket).toHaveBeenCalled();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(modalService.modalsCount).toBe(1);
    });
  })
})
