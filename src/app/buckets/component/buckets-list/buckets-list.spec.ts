import { BucketsListComponent } from './buckets-list.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('BucketsListComponent', () => {
  let fixture: ComponentFixture<BucketsListComponent>;
  let component: BucketsListComponent;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BucketsListComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(BucketsListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  })

  it('should create BucketDetailsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render number of all buckets ',() => {
    component.bucketsList = [{
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
    }];
    expect(fixture.componentInstance.bucketsList.length).toBe(2);
    const bucketsCount = 'All Buckets (2)';

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const bucketsCountElement = fixture.debugElement.query(By.css('.buckets-count')).nativeElement;
      expect<any>(bucketsCountElement.textContent).toBe(bucketsCount);
    });
  });

  it('should render in template bucket name, bucket location',async(() => {
    component.bucketsList = [{
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
    }];

    const bucketName = 'bucket1';
    const bucketLocation = 'Ljubljana';

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const filesNameElement = fixture.debugElement.query(By.css('a.nav-link')).nativeElement;
      expect<any>(filesNameElement.textContent).toContain(bucketName);

      const filesLocationElement = fixture.debugElement.query(By.css('.location-name')).nativeElement;
      expect<any>(filesLocationElement.textContent).toBe(bucketLocation);

    });
  }));

  it('should have the correct bucket name from list of buckets', () => {
      component.bucketsList = [{
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
      }];

      expect(component.bucketsList[1].name).toEqual('bucket2')
   });

  it('should render the bucket.name of first bucket inside an anchor tag', () => {
    component.bucketsList = [{
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
    }];

    fixture.detectChanges();

    expect(element.querySelector('a').textContent).toContain('bucket1');
  });

  it('should render one bucket-item node element for each tr', () => {
    component.bucketsList = [{
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
    }];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('.nav-link')).length).toBe(2);
  });
});
