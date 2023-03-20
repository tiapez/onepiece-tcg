import { TestBed } from '@angular/core/testing';

import { ToastIntService } from './toast-int.service';

describe('ToastIntService', () => {
  let service: ToastIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
