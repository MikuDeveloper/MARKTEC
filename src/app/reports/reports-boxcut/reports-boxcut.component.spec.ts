import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsBoxcutComponent } from './reports-boxcut.component';

describe('ReportsBoxcutComponent', () => {
  let component: ReportsBoxcutComponent;
  let fixture: ComponentFixture<ReportsBoxcutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsBoxcutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportsBoxcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
