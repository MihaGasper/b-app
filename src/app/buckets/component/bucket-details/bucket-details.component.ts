import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bucket } from '../../buckets.interfaces';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../../../shared/component/modal/modal.component';

@Component({
  selector: 'app-bucket-details',
  templateUrl: './bucket-details.component.html',
})

export class BucketDetailsComponent implements OnInit {
  private bucketId: string;
  private bsModalRef: BsModalRef;

  public files: any;
  public bucketSize: any;
  public bucket: Bucket;
  public list = true;
  public filesCount: number;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private modalService: BsModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bucketId = params.bucketId;
      this.onGetBucket(this.bucketId)
    });
    this.onGetBuckets();
  }

  onGetBuckets() {
    this.apiService
      .getFiles(this.bucketId)
      .subscribe((files) => {
        this.files = files.objects;
        this.filesCount = this.files?.length || '0';
        this.bucketSize = files.bucketSize;
      });
  }

  onGetBucket(id:string) {
    this.apiService
        .getBucket(id)
        .subscribe((bucket) => {
          this.bucket = bucket;
        });
  }

  handleUpload(file) {
    this.uploadFileToBucket(this.bucketId, file);
  }

  uploadFileToBucket(id: string, file) {
    this.apiService
      .addFile(id, file)
      .subscribe(data => {
        this.files = [...this.files, data];
        this.bucketSize = this.files.reduce((acc, obj) => acc + obj?.size, 0) || 0
      }, error => {
      console.log(error);
    });
  }

  deleteFileFromBucket(name: string) {
    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.modalTitle = 'Do you really want to delete this object';

    this.bsModalRef.content.event.subscribe(res => {
      this.apiService
        .deleteFile(this.bucketId, name)
        .subscribe(data => {
          this.onGetBuckets();
        }, error => {
          console.log(error);
        });
    });
  }

  deleteBucket() {
    this.bsModalRef = this.modalService.show(ModalComponent);
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.modalTitle = 'Do you really want to delete this bucket?';

    this.bsModalRef.content.event.subscribe(res => {
      if (res.delete === true) {
        this.apiService
          .deleteBucket(this.bucketId)
          .subscribe(data => {
            this.onGetBuckets();
            this.router.navigate(['/'], { replaceUrl: true });
          }, error => {
            console.log(error);
          });
      }
    });
  }
}
