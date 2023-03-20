import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCardAddComponent } from './modal-card-add.component';

describe('ModalCardAddComponent', () => {
  let component: ModalCardAddComponent;
  let fixture: ComponentFixture<ModalCardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCardAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
