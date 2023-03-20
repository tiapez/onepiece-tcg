import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListImgComponent } from './card-list-img.component';

describe('CardListComponent', () => {
  let component: CardListImgComponent;
  let fixture: ComponentFixture<CardListImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardListImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardListImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
