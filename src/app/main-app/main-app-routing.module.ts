import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateGuardGuard } from '../activate-guard.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedDialogComponent } from './feed-dialog/feed-dialog.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VaccineDialogComponent } from './vaccine-dialog/vaccine-dialog.component';
import { VaccineComponent } from './vaccine/vaccine.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'home', component: HomeComponent, canActivate:[ActivateGuardGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate:[ActivateGuardGuard]},
  {path: 'feed', component: FeedComponent, canActivate:[ActivateGuardGuard]},
  {path: 'feed-dialog', component: FeedDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: 'vaccine', component: VaccineComponent, canActivate:[ActivateGuardGuard]},
  {path: 'vaccineDialog', component: VaccineDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: 'saleHome', component: SalesHomeComponent, canActivate:[ActivateGuardGuard]},
  {path: 'salesDailog', component: SalesDialogComponent, canActivate:[ActivateGuardGuard]},
  {path: 'userProfile', component: UserProfileComponent, canActivate:[ActivateGuardGuard]},
  {path: 'contactUs', component: ContactUsComponent, canActivate:[ActivateGuardGuard]},
  {path: 'expenses', component: ExpensesComponent, canActivate:[ActivateGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
