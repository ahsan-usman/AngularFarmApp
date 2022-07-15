import { FlockDataComponent } from './flock-data/flock-data.component';
import { MainAppComponent } from './main-app-header/main-app.component';
import { FarmsDataComponent } from './farms-data/farms-data.component';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateGuardGuard } from '../activate-guard.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedDialogComponent } from './feed-dialog/feed-dialog.component';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VaccineDialogComponent } from './vaccine-dialog/vaccine-dialog.component';
import { VaccineComponent } from './vaccine/vaccine.component';

const routes: Routes = [
  {
    path:'', component: MainAppComponent, children:[
      { path: 'home', component: HomeComponent, canActivate: [ActivateGuardGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [ActivateGuardGuard] },
      { path: 'feed', component: FeedComponent, canActivate: [ActivateGuardGuard] },
      { path: 'feed-dialog', component: FeedDialogComponent, canActivate: [ActivateGuardGuard] },
      { path: 'vaccine', component: VaccineComponent, canActivate: [ActivateGuardGuard] },
      { path: 'vaccineDialog', component: VaccineDialogComponent, canActivate: [ActivateGuardGuard] },
      { path: 'saleHome', component: SalesHomeComponent, canActivate: [ActivateGuardGuard] },
      { path: 'salesDailog', component: SalesDialogComponent, canActivate: [ActivateGuardGuard] },
      { path: 'userProfile', component: UserProfileComponent, canActivate: [ActivateGuardGuard] },
      { path: 'expenses', component: ExpensesComponent, canActivate: [ActivateGuardGuard] },
      { path: 'expensesDialog', component: ExpenseDialogComponent, canActivate: [ActivateGuardGuard] },
      { path: 'flockData', component: FlockDataComponent, canActivate: [ActivateGuardGuard] },
      { path: 'farmData', component: FarmsDataComponent, canActivate: [ActivateGuardGuard] },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
