import { Component, Input, OnInit } from '@angular/core';
import { Msg } from 'src/app/models/msg.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent implements OnInit {

  @Input()
  public msgs: Msg[] = [];
  constructor() { }

  ngOnInit() { }

}
