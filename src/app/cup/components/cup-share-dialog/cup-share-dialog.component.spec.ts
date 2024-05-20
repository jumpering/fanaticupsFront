import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CupShareDialogComponent } from './cup-share-dialog.component';

describe('CupShareDialogComponent', () => {
  let component: CupShareDialogComponent;
  let fixture: ComponentFixture<CupShareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CupShareDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CupShareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
