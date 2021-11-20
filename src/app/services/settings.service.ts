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
    this._currentSettings = await this.getSettings();

    if (this._currentSettings.endpointUrl) {
      //Attempt to connect to any endpoint that's saved
      this.bracerService.setEndpointAndConnect(this._currentSettings.endpointUrl);
    }
    this._currentSettings = await this.getSettings();
    this.setKeepAwakePref(this._currentSettings.keepAwake);

  }

  public async getSettings(): Promise<Settings> {
    const endPointobj = await Storage.get({ key: ENDPOINT_KEY });
    const returnSetttings = new Settings(endPointobj.value);

    const stayAwakeobj = await Storage.get({ key: STAYAWAKE_KEY });
    returnSetttings.keepAwake = stayAwakeobj.value === 'true';

    return returnSetttings
  }

  public async setSettings(newSettings: Settings) {
    await Storage.set({ key: ENDPOINT_KEY, value: newSettings.endpointUrl });
    await Storage.set({ key: STAYAWAKE_KEY, value: String(newSettings.keepAwake) });
    this._currentSettings = newSettings;
    return this._currentSettings;
  }

  public async setKeepAwakePref(isAwake: boolean) {
    if (isAwake) {
      return await KeepAwake.keepAwake();
    }
    else {
      return await KeepAwake.allowSleep();
    }
  }
}
