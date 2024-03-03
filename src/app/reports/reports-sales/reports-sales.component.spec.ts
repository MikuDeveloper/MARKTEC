import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsSalesComponent } from './reports-sales.component';

describe('ReportsSalesComponent', () => {
  let component: ReportsSalesComponent;
  let fixture: ComponentFixture<ReportsSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
