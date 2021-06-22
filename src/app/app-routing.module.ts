import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TypeentiteComponent } from './typeentite/typeentite.component';
import { EntiteComponent } from './entite/entite.component';
import { LocaliteComponent } from './localite/localite.component';
import { ProfilComponent } from './profil/profil.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'typeentite', component: TypeentiteComponent },
  { path: 'entite', component: EntiteComponent },
  { path: 'localite', component: LocaliteComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'application', component: ApplicationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
