import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./buckets/buckets.module')
      .then((m) => m.BucketsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
