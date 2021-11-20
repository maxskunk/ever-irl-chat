import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscriber, Subscription, interval } from 'rxjs';
import { Msg } from 'src/app/models/msg.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Storage } from '@capacitor/storage';

const MSG_REQUEST: string = "msg_request";
const MSG_PAYLOAD: string = "msg_payload";
const IMG_PAYLOAD: string = "img_payload";
const IMG_REQUEST: string = "img_request";
const MSG_CLIENT_MSG: string = "msg_client_msg";;

//Storage
export const ENDPOINT_KEY: string = "storage_endpoint_key";


@Injectable({
  providedIn: 'root'
})
export class BracerService {

  private msgSubscriber: Subscriber<Msg[]> = new Subscriber<Msg[]>();
  public bracerPayload: Observable<Msg[]> = new Observable<Msg[]>();

  private subscription: Subscription;


  private connectionStatusSubscriber: Subscriber<boolean> = new Subscriber<boolean>();
  public connectionStatus: Observable<boolean> = new Observable<boolean>();

  private previewSubscriber: Subscriber<SafeResourceUrl> = new Subscriber<SafeResourceUrl>();
  public previewImage: Observable<SafeResourceUrl> = new Observable<SafeResourceUrl>();

  private _connected: boolean = false;

  public msgs: Msg[] = [];
  constructor(private socket: Socket, private _sanitizer: DomSanitizer) {

    //Configure Subscribers
    this.bracerPayload = new Observable<Msg[]>((observer) => {
      this.msgSubscriber = observer;
    });

    this.previewImage = new Observable<Blob>((observer) => {
      this.previewSubscriber = observer;
    });

    this.connectionStatus = new Observable<boolean>((observer) => {
      this.connectionStatusSubscriber = observer;
      this.connectionStatusSubscriber.next(this._connected);
    });

    socket.on(MSG_PAYLOAD, (res) => this.recievedMessages(res));
    socket.on(IMG_PAYLOAD, (res) => this.receivedPreview(res));
    socket.on('connect_failed', (res) => {
      console.log("Connection FailedE");
    });
    socket.on('disconnect', (text) => {
      this._connected = false;
      this.connectionStatusSubscriber.next(this._connected);


      console.log("Disconnect Detected");
    });
    socket.on('connect', (text) => {
      this._connected = true;
      this.connectionStatusSubscriber.next(this._connected);
    });
  }

  loadHistory() {
    this.socket.emit(MSG_REQUEST, null);
  }
  sendMsg(newMsg: string) {
    this.socket.emit(MSG_CLIENT_MSG, newMsg);
  }

  requestPreview() {
    if (this._connected) {
      this.socket.emit(IMG_REQUEST);
    }
  }

  public receivedPreview(res: any) {
    this.previewSubscriber.next(this._sanitizer.bypassSecurityTrustResourceUrl(res));
  }

  //Recieved Messages
  public recievedMessages(msgs: Msg[]) {
    this.msgSubscriber.next(msgs);
  }

  public startPreview() {
    const source = interval(5000);
    this.subscription = source.subscribe(val => this.requestPreview());
  }

  public async connectToSavedEndpoint() {
    const endpoint = await Storage.get({ key: ENDPOINT_KEY });
    if (endpoint && endpoint.value) {
      console.log("CONNECTING TO ENDPOINT: " + endpoint.value);
      this.setEndpointAndConnect(endpoint.value);
    }
  }

  public async getCurrentSavedEndpoint() {

  }

  public async setEndpointAndConnect(newEndPoint: string) {
    await Storage.set({ key: ENDPOINT_KEY, value: newEndPoint });
    this.socket.disconnect();
    this.socket.ioSocket.io.uri = newEndPoint;
    this.socket.connect();
  }
}
