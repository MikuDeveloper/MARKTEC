import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInventoryComponent } from './reports-inventory.component';

describe('ReportsInventoryComponent', () => {
  let component: ReportsInventoryComponent;
  let fixture: ComponentFixture<ReportsInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsInventoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
