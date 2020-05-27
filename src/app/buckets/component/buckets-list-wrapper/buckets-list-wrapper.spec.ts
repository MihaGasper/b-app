import { BucketsListWrapperComponent } from './buckets-list-wrapper.component';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../../../core/api/api.service';
import { Component, Input } from '@angular/core';

describe('BucketsListWrapperComponent', () => {
  let fixture: ComponentFixture<BucketsListWrapperComponent>
  let component: BucketsListWrapperComponent;
  let buckets;
  let mockApiService;
  let bucket3;

  @Component({
    selector: 'app-buckets-list',
    template: '<div></div>',
  })

  class MockBucketsListComponent{
    @Input() bucketsList: any[];
  }

  @Component({
    selector: 'app-add-bucket-form',
    template: '<div></div>',
  })

  class MockAddBucketFormComponent{
    @Input() buttonClick: any[];
  }

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['addBucket', 'getBuckets']);
    buckets = [{
      id: 'bucket1',
      location: {
        id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
        name: 'Ljubljana'
      },
      name: 'bucket1'
    }, {
      id: 'bucket2',
      location: {
        id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
        name: 'Ljubljana'
      },
      name: 'bucket2'
    }]

    TestBed.configureTestingModule({
      declarations: [
        BucketsListWrapperComponent,
        MockBucketsListComponent,
        MockAddBucketFormComponent,

      ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ],
    })
    fixture = TestBed.createComponent(BucketsListWrapperComponent);
    component = fixture.componentInstance;
  })

  it('should create BucketsListWrapperComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should set buckets from the api service', () => {
    mockApiService.getBuckets.and.returnValue(of(buckets));
    fixture.detectChanges();

    expect(fixture.componentInstance.buckets.length).toBe(2);
  })

  it('should add new bucket to the list', () => {
      mockApiService.addBucket.and.returnValue(of(true));
      component.buckets = buckets;
      bucket3 = {
        id: 'bucket3',
        location: {
          id: '573qwdF3-7A96-45FF-8FDE-0A3F0E6BBDF4',
          name: 'Maribor'
        },
        name: 'bucket3'
      }
      component.onSubmit(bucket3);

      expect(component.buckets.length).toBe(3);
  })

  it('should call addBucket with path and value param', () => {
      mockApiService.addBucket.and.returnValue(of(true));
      component.buckets = buckets;
      bucket3 = {
        id: 'bucket3',
        location: {
          id: '573qwdF3-7A96-45FF-8FDE-0A3F0E6BBDF4',
          name: 'Maribor'
        },
        name: 'bucket3'
      }

      component.onSubmit(bucket3);

      expect(mockApiService.addBucket).toHaveBeenCalledWith('buckets', bucket3);
  })
});
