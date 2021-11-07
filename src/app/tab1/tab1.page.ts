import { Component } from '@angular/core';
import { Msg } from '../models/msg.model';
import { BracerService } from '../services/bracer/bracer.service';
import { TextToSpeechService } from '../services/tts/text-to-speech.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public msgData: Msg[] = [];
  constructor(
    private tts: TextToSpeechService,
    private bracer: BracerService) {
    this.bracer.bracerPayload.subscribe(msgs => {
      this.msgData = msgs;
      console.log("NEW MESSAGES");
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg) {
        this.tts.speakInQueue(lastMsg.userName + " says " + lastMsg.msg);
      }
    });
    this.testMsg()
  }

  public testMsg() {
    this.bracer.loadHistory();
  }

}
