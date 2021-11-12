import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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

  public previewData: any;

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


    this.bracer.previewImage.subscribe((res) => {

      this.previewData = res;
      //this.previewData = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  }

  public testMsg() {
    this.bracer.loadHistory();
  }

  public requestPreview() {
    this.bracer.requestPreview();
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

}
