import { CustomErrorComponent } from './main-app/custom-error/custom-error.component';
import { HomePageComponent } from './main-home/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'homeapp',
    loadChildren: () => import('./main-home/main-home.module').then(m => m.MainHomeModule)
  },
  {
    path: 'mainapp',
    loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule)
  },
  { path:'', component: HomePageComponent, pathMatch:'full' },
  { path:'**', component:CustomErrorComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
