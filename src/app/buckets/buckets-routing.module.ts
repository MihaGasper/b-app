import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BucketsListWrapperComponent } from './component/buckets-list-wrapper/buckets-list-wrapper.component';
import { BucketDetailsComponent } from './component/bucket-details/bucket-details.component';
import { NotFoundComponent } from '../shared/component/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BucketsListWrapperComponent,
  },

  {
    path: ':bucketId',
    component: BucketDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BucketsRoutingModule { }
