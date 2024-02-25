import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesArchivedComponent } from './employees-archived.component';

describe('EmployeesArchivedComponent', () => {
  let component: EmployeesArchivedComponent;
  let fixture: ComponentFixture<EmployeesArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesArchivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
