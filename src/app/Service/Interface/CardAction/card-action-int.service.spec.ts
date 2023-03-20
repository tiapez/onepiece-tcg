import { TestBed } from '@angular/core/testing';

import { CardActionIntService } from './card-action-int.service';

describe('CardActionIntService', () => {
  let service: CardActionIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardActionIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
