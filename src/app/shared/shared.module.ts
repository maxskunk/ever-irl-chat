import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';



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
        MatIconModule
    ]

})
export class SharedModule { }