import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from './component/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { CustomErrorComponent } from './component/custom-error/custom-error.component';
import { Custom1Pipe } from './pipe/custom1.pipe';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FeedComponent } from './component/feed/feed.component';
import { VaccineComponent } from './component/vaccine/vaccine.component';
import { ActivateGuardGuard } from './activate-guard.guard';
import { GuardServiceService } from './services/guard-service.service';
import { NgToastModule } from 'ng-angular-popup';
import { SalesHomeComponent } from './component/sales-home/sales-home.component';
import { SalesDialogComponent } from './component/sales-dialog/sales-dialog.component';
import { FeedDialogComponent } from './component/feed-dialog/feed-dialog.component';
import { VaccineDialogComponent } from './component/vaccine-dialog/vaccine-dialog.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { ExpensesComponent } from './component/expenses/expenses.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
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
    ContactUsComponent,
    ExpensesComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    DragDropModule
  ],
  exports: [
    HeaderComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ActivateGuardGuard, GuardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
