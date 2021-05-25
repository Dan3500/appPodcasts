import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserLogComponent } from './components/user-log/user-log.component';
import { HeaderComponent } from './components/header/header.component';
import { CreatePodcastComponent } from './components/create-podcast/create-podcast.component';
import { VerPodcastComponent } from './components/ver-podcast/ver-podcast.component';
import { EditPodcastComponent } from './components/edit-podcast/edit-podcast.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserLogComponent,
    HeaderComponent,
    CreatePodcastComponent,
    VerPodcastComponent,
    EditPodcastComponent,
    UserProfileComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    routing, 
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    MomentModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
