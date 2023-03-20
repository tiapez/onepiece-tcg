import { TestBed } from '@angular/core/testing';

import { CrypterService } from './crypter.service';

describe('CrypterService', () => {
  let service: CrypterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrypterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
