import { Injectable } from '@angular/core';
import { BracerService } from 'src/app/services/bracer/bracer.service';
import { Storage } from '@capacitor/storage';
import { Settings } from '../models/settings.model';
import { KeepAwake } from '@capacitor-community/keep-awake';


export const ENDPOINT_KEY: string = "storage_endpoint_key";
export const STAYAWAKE_KEY: string = "storage_stayawake_key";


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _currentSettings: Settings = new Settings("");

  constructor(
    private bracerService: BracerService
  ) {


  }
  public async loadAndEffectSettings() {
    console.log("LOADING AND EFFECTING SETTINGS");

    //Load Settings values
    const endPointobj = await Storage.get({ key: ENDPOINT_KEY });
    this._currentSettings.endpointUrl = endPointobj.value;

    const stayAwakeobj = await Storage.get({ key: STAYAWAKE_KEY });
    this._currentSettings.allowSleep = Boolean(stayAwakeobj.value);

    if (this._currentSettings.endpointUrl) {
      //Attempt to connect to any endpoint that's saved
      this.bracerService.setEndpointAndConnect(this._currentSettings.endpointUrl);
    }

    this.setKeepAwakePref(this._currentSettings.allowSleep);

  }

  private async setKeepAwakePref(isAwake: boolean) {
    if (isAwake) {
      console.log("Setting phone to Keep Awake")
      return await KeepAwake.keepAwake();
    }
    else {
      console.log("Setting phone to allow sleep")
      return await KeepAwake.allowSleep();
    }
  }
}
