import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Settings } from 'src/app/models/settings.model';
import { BracerService } from 'src/app/services/bracer/bracer.service';
import { SettingsService } from 'src/app/services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  private defaultSettings: Settings;
  public settingsForm = new FormGroup({
    endpointUrl: new FormControl('', Validators.required),
    keepAwake: new FormControl(''),
  });

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private settingsService: SettingsService,
    private router: Router) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log("LOADING FROM SAVE");
    const data: Settings = this.activatedRoute.snapshot.data.data;
    this.settingsForm.patchValue(data);
    //this.settingsForm.patchValue({ receiverUrl: data.endpointUrl });
  }

  public async applySettings() {
    //TODO CHECK IF VALID
    const newSettings: Settings = this.settingsForm.value as Settings;
    //console.log("SETTING ENDPOOINT TO: " + newSettings.endpointUrl);
    //this.bracer.setEndpointAndConnect(newSettings.endpointUrl);
    //await this.settingsService.setKeepAwakePref(newSettings.keepAwake);
    await this.settingsService.setSettings(newSettings);
    this.router.navigate(['/'])

  }

}
