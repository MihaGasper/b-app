import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('getBucketLocations', () => {
    it('should call http get method with the right URL and return right number of locations & right data', () => {
      const mockLocations = {
        locations: [
          {
            id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
            name: 'Ljubljana'
          },
          {
            id: '671E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
            name: 'Maribor'
          }
        ]
      };

      service.getBucketLocations('locations')
        .subscribe(locations => {
          expect<any>(locations.length).toBe(2);
          expect(locations).toEqual(mockLocations.locations);
        });

      const req = httpTestingController.expectOne(
        ''
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockLocations);
    });
  });

  describe('getBuckets', () => {
    it('should call with get method with the right URL and return right number of buckets & right data', () => {
      const mockBuckets = {
        buckets: [{
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
      };

      service.getBuckets('buckets')
        .subscribe(
          buckets => {
            expect<any>(buckets.length).toBe(2);
            expect(buckets).toEqual(mockBuckets.buckets);

          }
        );

      const req = httpTestingController.expectOne(
        'https://www.better.si/storage/buckets'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockBuckets);
    });
  });

  describe('getBucket', () => {
    it ('should call http.get with the right URL and return bucket1', () => {
      const mockBucket = {
        bucket: {
        id: 'bucket1',
        location:
          {
            id: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4',
            name: 'Ljubljana'},
        name: 'bucket1'
      }};
      service.getBucket('bucket1').subscribe(
        (bucket) => {
          expect<any>(bucket.id).toBe('bucket1');
        }
      );
      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets/bucket1');

      expect(testRequest.request.method).toEqual('GET');

      testRequest.flush(mockBucket);

      httpTestingController.verify();
    });

    it ('should call get method and return getBucket error response', () => {
      service.getBucket('bucket1').subscribe(
        (bucket) => fail('this should be an error'),
        (err) => {
          expect(err).toEqual('Error Code: 500');
        });
      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets/bucket1');

      expect(testRequest.request.method).toEqual('GET');

      testRequest.flush('error', {
        status: 500,
        statusText: 'Server error',
      });

      httpTestingController.verify();
    });
  });

  describe('addBucket', () => {
    it('should call http.post method with the right URL and add bucket', () => {
      const mockBucket = {
        name: 'bucket1',
        location: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4'
      };

      service.addBucket('buckets', mockBucket)
        .subscribe(
          (bucket: any) => {
            expect(bucket.name).toBe('bucket1');
          }
        );
      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets');

      expect(testRequest.request.method).toEqual('POST');

      testRequest.flush(mockBucket);
    });
  });

  describe('deleteBucket', () => {
    it(' should call http.delete method with the right URL and delete the bucket', () => {
      const mockBucket = {
        name: 'bucket1',
        location: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4'
      };

      service.deleteBucket('bucket1')
        .subscribe();

      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets/bucket1');

      expect(testRequest.request.method).toEqual('DELETE');

      testRequest.flush(mockBucket);
    });
  });

  describe('getFiles', () => {
    it('should call http.get method with the right URL and return right number of files', () => {
      const mockFiles = {
        bucketSize: 12000,
        objects: [{
          name: 'file1',
          modified: '"2020-05-04T14:53:31.671541661Z"',
          size: 100
        }, {
          name: 'file2',
          modified: '"2019-04-04T14:53:31.671541661Z"',
          size: 10000
        }, {
            name: 'file3',
            modified: '"2018-04-04T14:53:31.671541661Z"',
            size: 30000
          }]
      };

      service.getFiles('bucket1')
        .subscribe(data => {
          expect<any>(data.objects.length).toBe(3);
          expect<any>(data).toEqual(mockFiles);
        });

      const req = httpTestingController.expectOne(
        'https://www.better.si/storage/buckets/bucket1/objects'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(mockFiles);
    });
  });

  describe('addFile', () => {
    it('should call http.post with the right URL and add a file', () => {
      const mockFile = {
        lastModified: 1589285347342,
        lastModifiedDate: 'Tue May 12 2020 14:09:07 GMT+0200 (Central European Summer Time) {}',
        name: 'file4',
        size: 290246,
        type: 'image/png',
        webkitRelativePath: ''
      };

      service.addFile('bucket1', mockFile)
        .subscribe(
          (data) => expect<any>(data).toEqual(mockFile)
        );

      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets/bucket1/objects');

      expect(testRequest.request.method).toEqual('POST');

      testRequest.flush(mockFile);
    });
  });

  describe('deleteFile', () => {
    it('should call http.delete with the right URL and delete a file', () => {
      const mockFile = {
        name: 'file1',
        location: '571E30F3-7A96-45FF-8FDE-0A3F0E6BBDF4'
      };


      service.deleteFile('bucket1', 'file1')
        .subscribe(
            (data) => expect<any>(data).toEqual(mockFile)
        );

      const testRequest = httpTestingController.expectOne('https://www.better.si/storage/buckets/bucket1/objects/file1');

      expect(testRequest.request.method).toEqual('DELETE');

      testRequest.flush(mockFile);
    });
  });
});
