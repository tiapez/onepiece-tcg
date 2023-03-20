import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCardComponent } from './import-card.component';

describe('ImportCardComponent', () => {
  let component: ImportCardComponent;
  let fixture: ComponentFixture<ImportCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
