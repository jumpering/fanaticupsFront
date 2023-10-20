import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credentials } from '@auth/models/Credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  credentials: Credentials = {
    user: '',
    password: ''
  }

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


      // email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8)]],


      email: ['', [Validators.required]],
      password: ['', [Validators.required]],




      //confirmPassword: ['', Validators.required, Validators.minLength(6)]
    });
  }

  login(){
    const user = this.form.value.email;
    const password = this.form.value.password;
    this.credentials.user = user;
    this.credentials.password = password;
    console.log('datos: ', this.credentials);
    this.authService.login(this.credentials).subscribe(response =>{
      console.log('subscrito!');
      this.router.navigate(['/']);
    }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
