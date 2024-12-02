import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagmentComponent } from './managment/managment.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';

// Define routes here
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'managment', component: ManagmentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
