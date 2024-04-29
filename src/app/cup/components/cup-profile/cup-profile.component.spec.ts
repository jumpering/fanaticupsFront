import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupProfileComponent } from './cup-profile.component';

describe('CupProfileComponent', () => {
  let component: CupProfileComponent;
  let fixture: ComponentFixture<CupProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CupProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
