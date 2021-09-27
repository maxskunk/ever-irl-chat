import { Injectable } from '@angular/core';
import { TextToSpeech, TTSOptions } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  public async speakInQueue(say: string) {
    console.log("PLEASE TO SAY: " + say);
    TextToSpeech.speak({ text: say });
  }
}
