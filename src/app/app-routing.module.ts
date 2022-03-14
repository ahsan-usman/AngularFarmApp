import { VaccineDialogComponent } from './component/vaccine-dialog/vaccine-dialog.component';
import { FeedDialogComponent } from './component/feed-dialog/feed-dialog.component';
import { SalesDialogComponent } from './component/sales-dialog/sales-dialog.component';
import { SalesHomeComponent } from './component/sales-home/sales-home.component';
import { ActivateGuardGuard } from './activate-guard.guard';
import { VaccineComponent } from './component/vaccine/vaccine.component';
import { FeedComponent } from './component/feed/feed.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CustomErrorComponent } from './component/custom-error/custom-error.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { LoginComponent } from './component/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate:[ActivateGuardGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[ActivateGuardGuard]},
  {path: 'feed', component: FeedComponent, canActivate:[ActivateGuardGuard]},
  {path: 'feedDialog', component: FeedDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: 'vaccine', component: VaccineComponent, canActivate:[ActivateGuardGuard]},
  {path: 'vaccineDialog', component: VaccineDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: 'saleHome', component: SalesHomeComponent, canActivate:[ActivateGuardGuard]},
  {path: 'salesDailog', component: SalesDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: '**', component: CustomErrorComponent, canActivate:[ActivateGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
