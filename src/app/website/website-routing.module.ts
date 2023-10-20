import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from '@cup/components/cup-detail/cup-detail.component';
import { CreateComponent } from '../cup/components/create/create.component';
import { LoginComponent } from '@auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: '',
      component: CupListComponent
    },
    {
      path: 'create',
      component: CreateComponent
    },
    {
      path: ':id',
      component: CupDetailComponent
    },
    {
      path: 'login',
      component: LoginComponent
    }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
