import { Component } from '@angular/core';
import { BracerService } from '../services/bracer/bracer.service';
import { TextToSpeechService } from '../services/tts/text-to-speech.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private tts: TextToSpeechService,
    private bracer: BracerService) { }

  public testMsg() {
    this.bracer.sendMessage("PEEE");
    this.bracer.sendMessage
    //this.tts.speakInQueue("TEST");
  }
}
