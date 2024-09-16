import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupUserListComponent } from './cup-user-list.component';

describe('CupUserListComponent', () => {
  let component: CupUserListComponent;
  let fixture: ComponentFixture<CupUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupUserListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CupUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
