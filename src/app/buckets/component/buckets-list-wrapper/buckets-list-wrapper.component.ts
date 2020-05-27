import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { AddBucket, Bucket, BucketWrapper } from '../../buckets.interfaces';

@Component({
  selector: 'app-buckets',
  templateUrl: './buckets-list-wrapper.component.html',
})

export class BucketsListWrapperComponent implements OnInit {
  title: string;
  buckets: Bucket[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.title = 'Bucket list';
    this.apiService
      .getBuckets('buckets')
      .subscribe((buckets) => {
          this.buckets = buckets;
        }
      );
  }

  onSubmit(value: AddBucket) {
    this.apiService
      .addBucket('buckets', value)
      .subscribe(
        (data: BucketWrapper<Bucket>) => {
          this.buckets = [...this.buckets, data.bucket];
        });
  }
}
