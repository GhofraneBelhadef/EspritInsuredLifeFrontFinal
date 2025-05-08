import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTipsChatbotComponent } from './loan-tips-chatbot.component';

describe('LoanTipsChatbotComponent', () => {
  let component: LoanTipsChatbotComponent;
  let fixture: ComponentFixture<LoanTipsChatbotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanTipsChatbotComponent]
    });
    fixture = TestBed.createComponent(LoanTipsChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
