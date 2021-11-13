import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Msg } from 'src/app/models/msg.model';
import { BracerService } from 'src/app/services/bracer/bracer.service';
import { TextToSpeechService } from 'src/app/services/tts/text-to-speech.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage {

  public msgData: Msg[] = [];
  public inputValue: string = "";
  public previewData: any;
  public ttsOn: boolean = true;

  @ViewChild('content') private content: IonContent;

  constructor(
    private tts: TextToSpeechService,
    private bracer: BracerService) {
    // for (let x = 0; x < 100; x++) {
    //   const newMsg: Msg = new Msg();
    //   newMsg.msg = "MSG " + x;
    //   this.msgData.push(newMsg);
    // }
    this.bracer.bracerPayload.subscribe(msgs => {
      //TODO Re-enable
      this.msgData = msgs;
      const lastMsg = msgs[msgs.length - 1];
      if (lastMsg && this.ttsOn) {
        this.tts.speakInQueue(lastMsg.userName + " says " + lastMsg.msg);
      }
      this.scrollToBottom();
    });
    this.testMsg()


    this.bracer.previewImage.subscribe((res) => {
      this.previewData = res;
    });

    this.bracer.startPreview();
  }

  public testMsg() {
    this.bracer.loadHistory();
  }

  public requestPreview() {
    this.bracer.requestPreview();
  }

  scrollToBottom(): void {
    this.content.scrollToBottom(300);
  }

  private createFileFromBlob(image: Blob): Observable<ArrayBuffer> {
    return new Observable<any>((observer) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        observer.next(reader.result);
        observer.complete();
      }, false);
      if (image) {
        reader.readAsDataURL(image);
      }
    });
  }
  public sendMsg() {

    this.bracer.sendMsg(this.inputValue);
    this.inputValue = "";
  }

}
