import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from './components/cup-detail/cup-detail.component';
import { AuthGuard } from '@auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CupListComponent
  },
  {
    path: ':id',
    component: CupDetailComponent
  },
  {
    path: 'add',
    canActivate: [AuthGuard],
    //component: AddCupComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CupRoutingModule { }
