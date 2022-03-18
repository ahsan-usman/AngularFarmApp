import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppRoutingModule } from './main-app-routing.module';
import { Custom1Pipe } from '../pipe/custom1.pipe';
import { CustomErrorComponent } from './custom-error/custom-error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedDialogComponent } from './feed-dialog/feed-dialog.component';
import { FeedComponent } from './feed/feed.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SalesHomeComponent } from './sales-home/sales-home.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VaccineDialogComponent } from './vaccine-dialog/vaccine-dialog.component';
import { VaccineComponent } from './vaccine/vaccine.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgToastModule } from 'ng-angular-popup';
import { ActivateGuardGuard } from '../activate-guard.guard';
import { GuardServiceService } from '../services/guard-service.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';


export function HttpLoaderFactoryMainApp(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

console.log("MAIN Module")
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    DialogComponent,
    CustomErrorComponent,
    Custom1Pipe,
    DashboardComponent,
    FeedComponent,
    VaccineComponent,
    SalesHomeComponent,
    SalesDialogComponent,
    FeedDialogComponent,
    VaccineDialogComponent,
    UserProfileComponent,
    ExpensesComponent,
    ExpenseDialogComponent,
  ],
  imports: [
    CommonModule,
    MainAppRoutingModule,
    GoogleMapsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    NgToastModule,
    DragDropModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactoryMainApp,
        deps: [HttpClient]
    }
    })
  ],
  providers: [ActivateGuardGuard, GuardServiceService],
})
export class MainAppModule { }
