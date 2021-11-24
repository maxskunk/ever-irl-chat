import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
    ],
    entryComponents: [],
    imports: [
        FlexLayoutModule,
        IonicModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    exports: [
        FlexLayoutModule,
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,

    ]

})
export class SharedModule { }