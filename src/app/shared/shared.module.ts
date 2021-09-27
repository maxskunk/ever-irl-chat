import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { ChatWindowComponent } from './chat-window/chat-window.component';


@NgModule({
    declarations: [

        ChatWindowComponent],
    entryComponents: [],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    exports: [

        ChatWindowComponent
    ]

})
export class SharedModule { }