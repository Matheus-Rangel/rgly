import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NotFoundComponent} from "./404/not-found.component";
import {RedirectComponent} from "./redirect/redirect.component";
import {AuthInterceptor} from "./service/auth-interceptor";
import {ManagementComponent} from "./management/management.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from "@angular/material/menu";
import { ManagementToolbarComponent } from './management/management-toolbar/management-toolbar.component';
import { ManagementLinkDetailComponent } from './management/management-link-detail/management-link-detail.component';
import {ManagementLinkListComponent} from "./management/management-link-list/management-link-list.component";
import { LinkListItemComponent } from './management/management-link-list/link-list-item/link-list-item.component';
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import { CreateUpdateLinkDialogComponent } from './management/create-update-link-dialog/create-update-link-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ManagementComponent,
    RedirectComponent,
    NotFoundComponent,
    ManagementToolbarComponent,
    ManagementLinkDetailComponent,
    ManagementLinkListComponent,
    LinkListItemComponent,
    CreateUpdateLinkDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatListModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
      {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
