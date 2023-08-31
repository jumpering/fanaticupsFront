import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CustomValidators } from 'src/app/utils/customValidators';

import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  emailField: FormControl;
  nameField: FormControl;

  constructor() { 
    const validations = [Validators.minLength(10), Validators.required, Validators.email];
    this.emailField = new FormControl('', validations);
    this.emailField.valueChanges
    .pipe(debounceTime(350))
    .subscribe(value => {
      console.log(value);
      console.log('valido? ',this.emailField.valid);
    });

    const nameValidators = [CustomValidators.isXaviNameValidator];
    this.nameField = new FormControl('', nameValidators);
  }

  ngOnInit(): void {
  }

}
