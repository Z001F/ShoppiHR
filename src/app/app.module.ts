import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbComponent } from './navb/navb.component';
import { HomeComponent } from './home/home.component';
import { ManagmentComponent } from './managment/managment.component';
import { AboutComponent } from './about/about.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbComponent,
    HomeComponent,
    ManagmentComponent,
    AboutComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
