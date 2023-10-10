import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.buildForm();
   }

  ngOnInit(): void {
  }

  buildForm(): void{
    this.form = this.formBuilder.group({
      //name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required, Validators.minLength(6)]
    });
  }

  login(){
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.login(email, password).then(response =>{
      console.log(response);
      this.router.navigate(['/']);
      this.dialogRef.close();
    },
    error => {
      console.error(error);
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
