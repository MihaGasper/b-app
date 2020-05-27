import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BucketsListWrapperComponent } from './buckets-list-wrapper/buckets-list-wrapper.component';
import { BucketsListComponent } from './buckets-list/buckets-list.component';
import { AddBucketFormComponent } from './add-bucket-form/add-bucket-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BucketDetailsComponent } from './bucket-details/bucket-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TabsModule
  ],
    declarations: [
        BucketsListWrapperComponent,
        BucketsListComponent,
        AddBucketFormComponent,
        BucketDetailsComponent
    ],
})

export class ComponentModule {}
