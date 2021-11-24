import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Settings } from "src/app/models/settings.model";
import { Storage } from '@capacitor/storage';
import { ENDPOINT_KEY } from './../../services/bracer/bracer.service'
import { Observable } from "rxjs";
import { LoadingController } from "@ionic/angular";
import { SettingsService } from "src/app/services/settings.service";

@Injectable({ providedIn: 'root' })
export class SettingsResolver implements Resolve<Settings> {
    private _loader: HTMLIonLoadingElement;

    constructor(
        private loadingController: LoadingController,
        private settingsService: SettingsService) {

    }


    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,

    ) {
        this._loader = await this.loadingController.create();
        this._loader.present();
        const settings = await this.settingsService.getSettings();
        this._loader.dismiss();
        return settings;
    }
}