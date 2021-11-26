import { Injectable } from '@angular/core';
import { BracerService } from 'src/app/services/bracer/bracer.service';
import { Storage } from '@capacitor/storage';
import { Settings } from '../models/settings.model';
import { KeepAwake } from '@capacitor-community/keep-awake';


export const ENDPOINT_KEY: string = "storage_endpoint_key";
export const STAYAWAKE_KEY: string = "storage_stayawake_key";
export const SERVER_PASS_KEY: string = "storage_server_pass_key";
export const LAST_READ_ID_KEY: string = "storage_last_read_key";
export const TTS_ON_KEY: string = "tts_on_key";


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
      //this.bracerService.setEndpointAndConnect(this._currentSettings.endpointUrl);
      this.bracerService.connectToSavedEndpoint();
    }
    this._currentSettings = await this.getSettings();
    this.setKeepAwakePref(this._currentSettings.keepAwake);

  }

  public async getSettings(): Promise<Settings> {
    const endPointobj = await Storage.get({ key: ENDPOINT_KEY });
    const returnSetttings = new Settings(endPointobj.value);

    const stayAwakeobj = await Storage.get({ key: STAYAWAKE_KEY });
    returnSetttings.keepAwake = stayAwakeobj.value === 'true';


    returnSetttings.serverPass = await this.getServerPass();

    return returnSetttings
  }

  public async setSettings(newSettings: Settings) {
    await Storage.set({ key: ENDPOINT_KEY, value: newSettings.endpointUrl });
    await Storage.set({ key: STAYAWAKE_KEY, value: String(newSettings.keepAwake) });
    await this.setServerPass(newSettings.serverPass);
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

  public async setLastMessageId(id: string) {
    return await Storage.set({ key: LAST_READ_ID_KEY, value: id });
  }
  public async getLastMessageId() {
    const readValue = await Storage.get({ key: LAST_READ_ID_KEY });
    return readValue.value;
  }

  public async setTTSOnPref(isTTS: boolean) {
    return await Storage.set({ key: TTS_ON_KEY, value: String(isTTS) });
  }
  public async getTTSOnPref(): Promise<boolean> {
    const readValue = await Storage.get({ key: TTS_ON_KEY });
    return readValue.value === 'true';
  }

  public async setServerPass(newPass: string) {
    return await Storage.set({ key: SERVER_PASS_KEY, value: newPass });
  }
  public async getServerPass(): Promise<string> {
    const readValue = await Storage.get({ key: SERVER_PASS_KEY });
    return readValue.value;
  }

}
