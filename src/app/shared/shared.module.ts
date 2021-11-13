import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
    declarations: [
    ],
    entryComponents: [],
    imports: [
        FlexLayoutModule,
        IonicModule,
        CommonModule,
        FormsModule,
    ],
    exports: [
        FlexLayoutModule,
        IonicModule,
        CommonModule,
        FormsModule,
    ]

})
export class SharedModule { }