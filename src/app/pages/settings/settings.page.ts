import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Settings } from 'src/app/models/settings.model';
import { BracerService } from 'src/app/services/bracer/bracer.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public settingsForm = new FormGroup({
    receiverUrl: new FormControl(''),
  });

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private bracer: BracerService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log("LOADING FROM SAVE");
    const data: Settings = this.activatedRoute.snapshot.data.data;
    this.settingsForm.patchValue({ receiverUrl: data.endpointUrl });
  }

  public applySettings() {
    //TODO CHECK IF VALID
    const newEndpoint = this.settingsForm.controls['receiverUrl'].value;
    console.log("SETTING ENDPOOINT TO: " + newEndpoint);
    this.bracer.setEndpointAndConnect(newEndpoint);
  }

}
