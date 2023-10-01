import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'website',
    pathMatch: 'full'
  },
  {
    path: 'cups',
    loadChildren: () => import('@cup/cup.module').then(m => m.CupModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'website',
    loadChildren: () => import('@website/website.module').then(m => m.WebsiteModule)
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
