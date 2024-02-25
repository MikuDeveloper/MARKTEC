import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersArchivedComponent } from './customers-archived.component';

describe('CustomersArchivedComponent', () => {
  let component: CustomersArchivedComponent;
  let fixture: ComponentFixture<CustomersArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomersArchivedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomersArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
