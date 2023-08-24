import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupListComponent } from './cup-list.component';

describe('CupListComponent', () => {
  let component: CupListComponent;
  let fixture: ComponentFixture<CupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
