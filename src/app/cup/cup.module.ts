import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CupRoutingModule } from '@cup/cup-routing.module';
import { CupComponent } from '@cup/components/cup/cup.component';
import { CupListComponent } from '@cup/components/cup-list/cup-list.component';
import { CupDetailComponent } from '@cup/components/cup-detail/cup-detail.component';
import { CupService } from '@cup/services/cup.service';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { CreateComponent } from './components/cup-create/create.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DeleteDialogComponent } from './components/cup-delete-dialog/delete-dialog.component';
import { SplitInTwoLinesPipe } from "../shared/pipes/split-in-two-lines.pipe";
import { ChatComponent } from '../chat/components/chat.component';
import { ChipsListComponent } from '../category/components/chips-list/chips-list.component';
//import { LayoutModule } from '@angular/cdk/layout';
// import { NgxMasonryModule } from 'ngx-masonry';

@NgModule({
    declarations: [
        CupComponent,
        CupListComponent,
        CupDetailComponent,
        CreateComponent,
        DeleteDialogComponent
    ],
    exports: [
        CupListComponent
    ],
    providers: [
        CupService
    ],
    imports: [
        CommonModule,
        CupRoutingModule,
        FormsModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        SplitInTwoLinesPipe,
        ChatComponent,
        ChipsListComponent
        // NgxMasonryModule
    ]
})
export class CupModule { }
