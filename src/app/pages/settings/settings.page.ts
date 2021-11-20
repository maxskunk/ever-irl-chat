import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public settingsForm = new FormGroup({
    receiverUrl: new FormControl('http://localhost:3000'),
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
