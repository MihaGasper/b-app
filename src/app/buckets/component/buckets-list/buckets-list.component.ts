import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-buckets-list',
  templateUrl: './buckets-list.component.html',
})

export class BucketsListComponent{
  @Input() bucketsList: any[];
}
