import { AddBucketFormComponent } from './add-bucket-form.component';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../core/api/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('AddBucketFormComponent', () => {
  let fixture: ComponentFixture<AddBucketFormComponent>;
  let component: AddBucketFormComponent;
  let mockApiService;
  let locations: any;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['getBucketLocations']);
    locations = [
          {
            id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
            name: 'Ljubljana'
          },
          {
            id: '671E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
            name: 'Maribor'
          }];

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService, useValue: mockApiService
        },
        FormBuilder
      ],
      declarations: [AddBucketFormComponent],
      imports: [ReactiveFormsModule]
    });

    fixture = TestBed.createComponent(AddBucketFormComponent);
    component = fixture.componentInstance;
  });

  it('should create AddBucketFormComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set locations from the api service', () => {
    mockApiService.getBucketLocations.and.returnValue(of(locations));
    fixture.detectChanges();

    expect(component.locations.length).toBe(2);
  });

  it('should be called method toggleViewForm on click', fakeAsync(() => {
    spyOn(fixture.componentInstance, 'toggleViewForm');
    let btn = fixture.debugElement.query(By.css('#toggle-view'));

    btn.triggerEventHandler('click', null);
    fixture.whenStable().then(() => {
      expect(component.toggleViewForm).toHaveBeenCalled();
    });
  }));

  it('should be called method onSubmit on click', fakeAsync(() => {
    mockApiService.getBucketLocations.and.returnValue(of(locations));
    spyOn(component, 'onSubmit');

    let btnToggle = fixture.debugElement.query(By.css('#toggle-view'));
      btnToggle.triggerEventHandler('click', null);
      fixture.detectChanges();

    let form = fixture.debugElement.query(By.css('form'));

    component.bucket.controls['name'].setValue('bucket3');
    component.bucket.controls['location'].setValue('571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4');

    form.triggerEventHandler('submit', null);
    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.bucket.value).toEqual({name: 'bucket3', location: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4'});
    });
  }))
})
