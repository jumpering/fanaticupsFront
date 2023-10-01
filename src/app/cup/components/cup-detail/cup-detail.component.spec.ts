import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupDetailComponent } from './cup-detail.component';

describe('CupDetailComponent', () => {
  let component: CupDetailComponent;
  let fixture: ComponentFixture<CupDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
