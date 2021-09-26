import { Component } from '@angular/core';
import { TextToSpeechService } from '../services/tts/text-to-speech.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private tts: TextToSpeechService) { }

  public testMsg() {
    this.tts.speakInQueue("TEST");
  }
}
