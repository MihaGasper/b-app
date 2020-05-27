export interface BucketLocations<T> {
  locations: [T];
}

export interface BucketLocation {
    id: string;
    name: string;
}

export interface BucketsWrapper<T> {
  buckets: [T];
}

export interface BucketWrapper<T> {
  bucket: T;
}

export interface AddBucket {
  name: string;
  location: string;
}

export interface Bucket {
    id: string;
    name: string;
    location: {
      id: string;
      name: string
    };
}

export interface FilesWrapper<T> {
  objects: [T];
  bucketSize: number;
}

export interface File {
    name: string;
    modified: string;
    size: number;
    reduce?(a, b): number;
}
