import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDebstComponent } from './details-debst.component';

describe('DetailsDebstComponent', () => {
  let component: DetailsDebstComponent;
  let fixture: ComponentFixture<DetailsDebstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsDebstComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsDebstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
