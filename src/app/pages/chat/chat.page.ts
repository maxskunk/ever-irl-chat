import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Msg } from 'src/app/models/msg.model';
import { BracerService } from 'src/app/services/bracer/bracer.service';
import { SettingsService } from 'src/app/services/settings.service';
import { TextToSpeechService } from 'src/app/services/tts/text-to-speech.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  public msgData: Msg[] = [];
  public inputValue: string = "";
  public previewData: any;
  public ttsOn: boolean = false;

  public currentlyConnected: boolean = false;

  @ViewChild('content') private content: IonContent;

  constructor(
    private tts: TextToSpeechService,
    private bracer: BracerService,
    private ss: SettingsService) {


  }

  public async ngOnInit() {

    //Attempt to connect to any endpoint that's saved
    //this.bracer.connectToSavedEndpoint();
    this.ss.loadAndEffectSettings();
    this.bracer.bracerPayload.subscribe(msgs => {
      //TODO Re-enable
      this.msgData = msgs;
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg && this.ttsOn) {
        this.tts.speakInQueue(lastMsg.userName + " says " + lastMsg.msg);
      }
      this.scrollToBottom();
    });
    this.bracer.loadHistory();


    this.bracer.previewImage.subscribe((res) => {
      this.previewData = res;
    });

    //Subscribe to status changes
    this.bracer.connectionStatus.subscribe((isConnected) => {
      this.currentlyConnected = isConnected;
      if (isConnected) {
        this.bracer.loadHistory();
      }
    });

    this.bracer.startPreview();
  }

  public requestPreview() {
    this.bracer.requestPreview();
  }

  scrollToBottom(): void {
    this.content.scrollToBottom(300);
  }

  public sendMsg() {
    this.bracer.sendMsg(this.inputValue);
    this.inputValue = "";
  }

  public toggleSpeek() {
    this.ttsOn = !this.ttsOn;
  }

}
