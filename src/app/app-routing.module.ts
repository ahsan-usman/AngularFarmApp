import { LoginComponent } from './main-home/login/login.component';
import { CustomErrorComponent } from './main-app/custom-error/custom-error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreLoadingService } from './services/custom-pre-loading.service';

const routes: Routes = [
  {
    path: 'homeapp',
    loadChildren: () => import('./main-home/main-home.module').then(m => m.MainHomeModule)
  },
  {
    path: 'mainapp',
    data: { preload: true, loadAfterSeconds: 1 },
    loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule)
  },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: CustomErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,
    { preloadingStrategy: CustomPreLoadingService,
     })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
