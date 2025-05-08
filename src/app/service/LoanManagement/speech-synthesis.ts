// speech-synthesis.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {
  private synth = window.speechSynthesis;

  speak(text: string) {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.voice = this.getPreferredVoice();
    
    this.synth.speak(utterance);
  }

  cancel() {
    this.synth.cancel();
  }

  private getPreferredVoice(): SpeechSynthesisVoice | null {
    const voices = this.synth.getVoices();
    return voices.find(v => v.name.includes('Alex')) || 
           voices[0] || 
           null;
  }
}