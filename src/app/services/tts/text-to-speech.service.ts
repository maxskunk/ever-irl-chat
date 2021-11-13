import { Injectable } from '@angular/core';
import { TextToSpeech, TTSOptions } from '@capacitor-community/text-to-speech';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private _toSpeekQueue: string[] = [];
  private _currentlySpeaking: boolean = false;

  constructor() { }

  public async speakInQueue(say: string) {
    //TextToSpeech.speak({ text: say });
    this._toSpeekQueue.push(say);
    if (!this._currentlySpeaking) {
      this.speakNext();
    }
  }

  private async speakNext() {
    this._currentlySpeaking = true;
    await this.speakText(this._toSpeekQueue.shift());
    if (this._toSpeekQueue.length > 0) {
      this.speakNext();
    }
    else {
      this._currentlySpeaking = false;
    }
  }

  private async speakText(say: string) {
    return TextToSpeech.speak({ text: say });
  }
}
