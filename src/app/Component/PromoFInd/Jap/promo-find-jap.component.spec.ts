import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoFindJapComponent } from './promo-find-jap.component';

describe('PromoFindJapComponent', () => {
  let component: PromoFindJapComponent;
  let fixture: ComponentFixture<PromoFindJapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoFindJapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoFindJapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
