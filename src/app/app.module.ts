import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { BackendService } from './backend.service';
import { DataStoreService } from './data-store.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { DataItemViewComponent } from './data-item-view/data-item-view.component';
import { MainComponent } from './main/main.component';
import {RouterModule, Routes} from "@angular/router";
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    DataItemViewComponent,
    MainComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    BackendService,
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
