import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './api/token.interceptor';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})

export class CoreModule { }
