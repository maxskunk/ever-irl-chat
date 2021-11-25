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
  private _lastReadMsgId: string = "";

  public currentlyConnected: boolean = false;

  @ViewChild('content') private content: IonContent;

  constructor(
    private tts: TextToSpeechService,
    private bracer: BracerService,
    private ss: SettingsService,) {


  }

  ionViewWillEnter() {
    //Attempt to connect to any endpoint that's saved
    this.ss.loadAndEffectSettings();
  }

  public async ngOnInit() {

    this.ss.getLastMessageId().then(value => {
      if (value) {
        this._lastReadMsgId = value;
      }
    });

    this.ss.getTTSOnPref().then(value => {
      this.ttsOn = value;
    });

    this.bracer.bracerPayload.subscribe(msgs => {
      this.handleChatHistory(msgs);

    });
    this.bracer.requestChatHistory();


    this.bracer.previewImage.subscribe((res) => {
      this.previewData = res;
    });

    //Subscribe to status changes
    this.bracer.connectionStatus.subscribe((isConnected) => {
      this.currentlyConnected = isConnected;
      if (isConnected) {
        this.bracer.requestChatHistory();
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
    this.ss.setTTSOnPref(this.ttsOn);
  }


  private handleChatHistory(msgs: Msg[]) {
    if (msgs[msgs.length - 1].id === this._lastReadMsgId) {
      this.msgData = msgs;
      this.scrollToBottom();
      //No new Messages Received
      return;
    }
    //Update local storage
    this.msgData = msgs;

    let newMsgs: Msg[] = [...msgs];
    const lastReadMsgIndex = msgs.findIndex(row => {
      return row.id === this._lastReadMsgId;
    });

    if (lastReadMsgIndex !== -1) {
      newMsgs.splice(0, lastReadMsgIndex + 1);
    }

    newMsgs.forEach(msg => {
      if (this.ttsOn) {
        this.tts.speakInQueue(msg.userName + " says " + msg.msg);
      }
      this._lastReadMsgId = msg.id;
    });
    //Record last message;
    this.scrollToBottom();
    this.ss.setLastMessageId(this._lastReadMsgId);
  }

}
