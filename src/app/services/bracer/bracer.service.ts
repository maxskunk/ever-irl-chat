import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { observable, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { Msg } from 'src/app/models/msg.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";
const IMG_PAYLOAD: string = "img_payload";
const IMG_REQUEST: string = "img_request";
const MSG_CLIENT_MSG: string = "msg_client_msg";;

@Injectable({
  providedIn: 'root'
})
export class BracerService {
  private msgSubscriber: Subscriber<Msg[]> = new Subscriber<Msg[]>();
  public bracerPayload: Observable<Msg[]> = new Observable<Msg[]>();

  private previewSubscriber: Subscriber<SafeResourceUrl> = new Subscriber<SafeResourceUrl>();
  public previewImage: Observable<SafeResourceUrl> = new Observable<SafeResourceUrl>();

  public msgs: Msg[] = [];
  constructor(private socket: Socket, private _sanitizer: DomSanitizer) {

    this.bracerPayload = new Observable<Msg[]>((observer) => {
      console.log("SEtTING SUB");
      this.msgSubscriber = observer;
    });

    this.previewImage = new Observable<Blob>((observer) => {
      this.previewSubscriber = observer;
    })

    socket.on(MSG_PAYLOAD, (res) => this.recievedMessages(res));
    socket.on(IMG_PAYLOAD, (res) => this.receivedPreview(res));
  }

  loadHistory() {
    console.log("REQUESTING HISTORY FROM SERVER");
    this.socket.emit(MSG_REQUEST, null);
  }
  sendMsg(newMsg: string) {
    console.log("SENDING MESSAGE TO SERVER");
    this.socket.emit(MSG_CLIENT_MSG, newMsg);
  }

  requestPreview() {
    console.log("REQUESTING PREIVEW");
    this.socket.emit(IMG_REQUEST);
  }

  public receivedPreview(res: any) {
    this.previewSubscriber.next(this._sanitizer.bypassSecurityTrustResourceUrl(res));
  }

  //Recieved Messages
  public recievedMessages(msgs: Msg[]) {
    console.log("RECEIVING MESSAGES: " + msgs.length);
    msgs.forEach(msg => {
      console.log(msg);
    });
    this.msgSubscriber.next(msgs);
  }
}
