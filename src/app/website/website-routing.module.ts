import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from '@cup/components/cup-detail/cup-detail.component';
import { CreateComponent } from '../cup/components/cup-create/create.component';
import { LoginComponent } from '@auth/components/login/login.component';
import { AuthGuard } from '@auth/guards/auth.guard';
import { Page404Component } from '../page404/page404.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CupProfileComponent } from '@cup/components/cup-profile/cup-profile.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      component: HomeComponent
    },
    {
      path: 'create',
      component: CreateComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'profile',
      component: CupProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: ':id',
      component: CupDetailComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: '**',
      component: Page404Component
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
