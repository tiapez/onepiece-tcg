import { TestBed } from '@angular/core/testing';

import { CardActionService } from './card-action.service';

describe('CardActionService', () => {
  let service: CardActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
