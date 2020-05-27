import { FileSizePipe } from './size.pipe';

describe('FileSizePipe', () => {
  it('should display bytes if file size is under 1024',
    () => {
      let pipe = new FileSizePipe();

      expect(pipe.transform(100, 2)).toEqual('100.00 B');
    }
  );

  it('should display KB if file size is between 1024 and 1048575',
    () => {
      let pipe = new FileSizePipe();

      expect(pipe.transform(9000, 2)).toEqual('8.79 KB');
    }
  );

  it('should display MB if file size is between 1048576 and 1073741823',
    () => {
      let pipe = new FileSizePipe();

      expect(pipe.transform(107374170, 2)).toEqual('102.40 MB');
    }
  );

  it('should display GB if file size is between 1073741824 and 1099511627775',
    () => {
      let pipe = new FileSizePipe();

      expect(pipe.transform(1573741824, 2)).toEqual('1.47 GB');
    }
  );

  it('should display TB if file size is between 1099511627776 and 1125899906842624',
    () => {
      let pipe = new FileSizePipe();

      expect(pipe.transform(10995116277766, 2)).toEqual('10.00 TB');
    }
  );
});
