import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor() { }

  public async speakInQueue(say: string) {
    console.log("PLEASE TO SAY: " + say);
  }
}
