import { InterceptorInterceptor } from './services/interceptor.interceptor';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSortModule } from '@angular/material/sort';
import { ActivateGuardGuard } from './activate-guard.guard';
import { GuardServiceService } from './services/guard-service.service';
import { NgToastModule } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FooterComponent } from './component/footer/footer.component';
import { NgxUiLoaderConfig, NgxUiLoaderModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NgChartsModule } from 'ng2-charts';
import { MatTableExporterModule } from 'mat-table-exporter';



console.log("app module")

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "white",
  "fgsPosition": "center-center",
  "fgsSize": 80,
  "fgsType": "rectangle-bounce-pulse-out-rapid",
  "masterLoaderId": "master",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "white",
  "pbDirection": "ltr",
  "pbThickness": 4,
  "hasProgressBar": true,
  "text": "Loading....",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
}


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
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
    MatTableExporterModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    NgToastModule,
    DragDropModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgChartsModule,
  ],
  exports: [
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ActivateGuardGuard, GuardServiceService, {provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
