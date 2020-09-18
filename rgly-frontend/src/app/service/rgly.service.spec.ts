import { TestBed } from '@angular/core/testing';

import { RglyService } from './rgly.service';

describe('RglyService', () => {
  let service: RglyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RglyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
