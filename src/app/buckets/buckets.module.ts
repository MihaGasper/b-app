import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BucketsRoutingModule } from './buckets-routing.module';
import { ComponentModule } from './component/component.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BucketsRoutingModule,
    ComponentModule,
    SharedModule,
  ],
})

export class BucketsModule { }
