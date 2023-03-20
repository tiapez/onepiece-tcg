import { TestBed } from '@angular/core/testing';

import { CryptServiceImpl } from './crypt-impl.service';

describe('UserService', () => {
  let service: CryptServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
