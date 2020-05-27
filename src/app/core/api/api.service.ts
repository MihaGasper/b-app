import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

import { catchError, map} from 'rxjs/operators';
import { CoreModule } from '../core.module';
import {
  BucketLocations,
  BucketLocation,
  Bucket,
  BucketsWrapper,
  BucketWrapper,
  AddBucket,
  File,
  FilesWrapper
} from './api.interface';

@Injectable({
  providedIn: CoreModule,
})

export class ApiService {
  // For working app URL must be replaced with real one that is copyrighted
  readonly SERVER_URL = 'https://www.better.si/storage/';
  constructor(private httpClient: HttpClient) { }

  public getBucketLocations(path: string){
    return this.httpClient
      .get<BucketLocations<BucketLocation>>(this.SERVER_URL + path)
      .pipe(
        map(({locations}) => locations),
        catchError(this.handleError));
  }

  public getBuckets(path: string){
    return this.httpClient
      .get<BucketsWrapper<Bucket>>(this.SERVER_URL + path)
      .pipe(
        map(({buckets}) => buckets),
        catchError(this.handleError));
  }

  public getBucket(id: string){
    return this.httpClient
      .get<BucketWrapper<Bucket>>(`${this.SERVER_URL}buckets/${id}`)
      .pipe(
        map(({bucket}) => bucket),
        catchError(this.handleError));
  }

  public addBucket(path: string, bucket: AddBucket){
    return this.httpClient
      .post<BucketWrapper<Bucket>>(this.SERVER_URL + path, bucket)
      .pipe(
        catchError(this.handleError));
  }

  public deleteBucket(bucketId: string){
    return this.httpClient
      .delete(`${this.SERVER_URL}buckets/${bucketId}`)
      .pipe(catchError(this.handleError));
  }

  public getFiles(bucketId: string){
    return this.httpClient
      .get<FilesWrapper<File>>(`${this.SERVER_URL}buckets/${bucketId}/objects`)
      .pipe(
        map((data) => {
          data.bucketSize = data.objects.reduce((acc, obj) => acc + obj?.size, 0) || 0;
          return data;
        }),
        catchError(this.handleError));
  }

  public addFile(bucketId: string, file){
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient
      .post<File>(  `${this.SERVER_URL}buckets/${bucketId}/objects`, formData)
      .pipe(catchError(this.handleError));
  }

  public deleteFile(bucketId: string, objectId: string){
    return this.httpClient
      .delete(`${this.SERVER_URL}buckets/${bucketId}/objects/${objectId}`)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
