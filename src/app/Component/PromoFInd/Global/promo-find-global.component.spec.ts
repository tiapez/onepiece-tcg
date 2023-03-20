import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoFindGlobalComponent } from './promo-find-global.component';

describe('PromoFindGlobalComponent', () => {
  let component: PromoFindGlobalComponent;
  let fixture: ComponentFixture<PromoFindGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoFindGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromoFindGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
