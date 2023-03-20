import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListTextComponent } from './card-list-text.component';

describe('CardListTextComponent', () => {
  let component: CardListTextComponent;
  let fixture: ComponentFixture<CardListTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
