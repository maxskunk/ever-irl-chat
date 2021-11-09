import { Component, Input, OnInit } from '@angular/core';
import { Msg } from 'src/app/models/msg.model';
import { BracerService } from 'src/app/services/bracer/bracer.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {

  @Input()
  public msgs: Msg[] = [];

  public inputValue: string = "";
  constructor(private bracer: BracerService) { }

  ngOnInit() { }


  public sendMsg() {

    this.bracer.sendMsg(this.inputValue);
    this.inputValue = "";
  }

}
