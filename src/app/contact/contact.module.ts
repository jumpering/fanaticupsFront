import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactRoutingModule } from '@contact/contact-routing.module';
import { FormComponent } from '@contact/components/form/form.component';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule
  ]
})
export class ContactModule { }
