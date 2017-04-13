import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { DataItemService } from './data-item.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { DataItemViewComponent } from './data-item-view/data-item-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    DataItemViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
