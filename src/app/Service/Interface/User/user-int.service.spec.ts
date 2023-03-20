import { TestBed } from '@angular/core/testing';

import { UserIntService } from './user-int.service';

describe('UserIntService', () => {
  let service: UserIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
