import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Msg } from 'src/app/models/msg.model';

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";

@Injectable({
  providedIn: 'root'
})
export class BracerService {

  constructor(private socket: Socket) {
    socket.on(MSG_PAYLOAD, this.recievedMessages);
  }

  sendMessage(msg: string) {
    console.log("REQUESTING MESSAGES FROM SERVER");
    this.socket.emit(MSG_REQUEST, msg);
  }

  //Recieved Messages
  public recievedMessages(msgs: Msg[]) {
    console.log("RECEIVING MESSAGES: " + msgs.length);
    msgs.forEach(msg => {
      console.log(msg);
    })
  }
}
