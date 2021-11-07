import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { Msg } from 'src/app/models/msg.model';

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";
const MSG_CLIENT_MSG: string = "msg_client_msg";

@Injectable({
  providedIn: 'root'
})
export class BracerService {
  private subscriber: Subscriber<Msg[]> = new Subscriber<Msg[]>();
  public bracerPayload: Observable<Msg[]> = new Observable<Msg[]>();

  public msgs: Msg[] = [];
  constructor(private socket: Socket) {

    this.bracerPayload = new Observable<Msg[]>((observer) => {
      console.log("SEtTING SUB");
      this.subscriber = observer;
    });

    socket.on(MSG_PAYLOAD, (res) => this.recievedMessages(res));
  }

  loadHistory() {
    console.log("REQUESTING HISTORY FROM SERVER");
    this.socket.emit(MSG_REQUEST, null);
  }
  sendMsg(newMsg: string) {
    console.log("SENDING MESSAGE TO SERVER");
    this.socket.emit(MSG_CLIENT_MSG, newMsg);
  }

  //Recieved Messages
  public recievedMessages(msgs: Msg[]) {
    console.log("RECEIVING MESSAGES: " + msgs.length);
    msgs.forEach(msg => {
      console.log(msg);
    });
    this.subscriber.next(msgs);
  }
}
