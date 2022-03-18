import { ContactUsComponent } from './contact-us/contact-us.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeRoutingModule } from './main-home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { ActivateGuardGuard } from '../activate-guard.guard';
import { GuardServiceService } from '../services/guard-service.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

console.log("i am main home module")

export function HttpLoaderFactoryMainHome(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    HomePageComponent,
    HomeHeaderComponent,
    ContactUsComponent
  ],
  imports: [
    CommonModule,
    MainHomeRoutingModule,
    GoogleMapsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactoryMainHome,
        deps: [HttpClient]
    }
    })
  ],
  providers: [ActivateGuardGuard, GuardServiceService],
})
export class MainHomeModule { }
