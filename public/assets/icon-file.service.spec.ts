import { TestBed } from '@angular/core/testing';

import { IconFileService } from './icon-file.service';

describe('IconFileService', () => {
  let service: IconFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
