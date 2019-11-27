import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { ViewPlComponent } from './view-pl/view-pl.component';
import { FractionComponent } from './fraction/fraction.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewPlComponent,
    FractionComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [ViewPlComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
