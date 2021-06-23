import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { TypeentiteComponent } from './typeentite/typeentite.component';
import { EntiteComponent } from './entite/entite.component';
import { LocaliteComponent } from './localite/localite.component';
import { ProfilComponent } from './profil/profil.component';
import { ApplicationComponent } from './application/application.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { PartailsComponent } from './partails/partails.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    DashboardComponent,
    SidenavComponent,
    LoginComponent,
    TypeentiteComponent,
    EntiteComponent,
    LocaliteComponent,
    ProfilComponent,
    ApplicationComponent,
    UtilisateurComponent,
    PartailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // * MATERIAL IMPORTS
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
