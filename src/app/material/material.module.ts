import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    // MatCardModule,
    // MatDividerModule,
    // MatButtonModule,
    // MatToolbarModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatSnackBarModule,
    // MatDialogModule,
    // MatTooltipModule,
    // MatIconModule,
    // MatMenuModule
  ],
  exports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
})
export class MaterialModule { }
