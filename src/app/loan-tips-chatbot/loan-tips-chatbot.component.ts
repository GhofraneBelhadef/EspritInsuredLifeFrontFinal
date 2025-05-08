import { Component, Input, OnInit } from '@angular/core';
import { Loan } from '../models/LoanManagement/Loan.model';
import { SpeechSynthesisService } from '../service/LoanManagement/speech-synthesis';


@Component({
  selector: 'app-loan-tips-chatbot',
  templateUrl: './loan-tips-chatbot.component.html',
  styleUrls: ['./loan-tips-chatbot.component.scss']
})
export class LoanTipsChatbotComponent implements OnInit {
  @Input() loan: Loan| undefined;
  messages: {text: string, sender: 'bot' | 'user'}[] = [];
  isSpeaking = false;
  userInput = '';

  constructor(private speechService: SpeechSynthesisService) {}

  ngOnInit() {
    this.addBotMessage("Hello! I'm here to help you with loan improvement tips. Would you like me to analyze your loan details?");
  }

  generateLoanTips(): string[] {
    const tips: string[] = [];
    if (!this.loan) return tips;

    if (this.loan.interestRate)
    if (this.loan.interestRate > 8.0) {
      tips.push("The interest rate is relatively high. Consider negotiating a lower rate.");
    }
 
    
    return tips;
  }

  addBotMessage(text: string) {
    this.messages.push({text, sender: 'bot'});
    setTimeout(() => {
      this.speechService.speak(text);
    }, 500);
  }

  handleUserResponse() {
    const userText = this.userInput.trim();
    if (userText) {
      this.messages.push({text: userText, sender: 'user'});
      this.userInput = '';
      
      if (userText.toLowerCase().includes('yes') || userText.toLowerCase().includes('analyze')) {
        const tips = this.generateLoanTips();
        if (tips.length > 0) {
          this.addBotMessage("Here are some personalized tips to improve your loan:");
          tips.forEach(tip => this.addBotMessage(tip));
        } else {
          this.addBotMessage("I couldn't generate specific tips for this loan. Here are some general suggestions...");
        }
      } else {
        this.addBotMessage("How else can I help you with your loan?");
      }
    }
  }

  toggleVoice() {
    if (this.isSpeaking) {
      this.speechService.cancel();
    } else if (this.messages.length > 0) {
      this.speechService.speak(this.messages[this.messages.length - 1].text);
    }
    this.isSpeaking = !this.isSpeaking;
  }
}