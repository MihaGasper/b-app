import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api/api.service';
import { BucketLocation } from '../../buckets.interfaces';


@Component({
  selector: 'app-add-bucket-form',
  templateUrl: './add-bucket-form.component.html',
})

export class AddBucketFormComponent implements OnInit {
  show = false;
  bucket: FormGroup;
  locations: BucketLocation[];

  @Input() buttonClick;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void{
    this.apiService
      .getBucketLocations('locations')
      .subscribe((locations) => {
          this.locations = locations;
        }
      );

    this.bucket = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      location: ['', [Validators.required]]
    });
  }

  onSubmit(newBucket) {
    this.buttonClick(newBucket.value);
  }

  toggleViewForm() {
    this.show = !this.show;
  }
}
