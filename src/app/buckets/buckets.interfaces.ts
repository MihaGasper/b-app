export interface BucketLocation {
  id: string;
  name: string;
}

export interface Bucket {
  id: string;
  name: string;
  location: {
    id: string;
    name: string
  };
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

