import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoanManagementComponent } from './add-loan-management.component';

describe('AddLoanManagementComponent', () => {
  let component: AddLoanManagementComponent;
  let fixture: ComponentFixture<AddLoanManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddLoanManagementComponent]
    });
    fixture = TestBed.createComponent(AddLoanManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
