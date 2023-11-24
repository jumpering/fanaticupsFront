import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credentials } from '@auth/models/Credentials';
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  credentials: Credentials = {
    //user: '',
    name: '',
    email:'',
    password: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      //name: ['', Validators.required],


      email: ['', [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(8)]],


      //email: ['', [Validators.required]],
      password: ['', [Validators.required]],




      //confirmPassword: ['', Validators.required, Validators.minLength(6)]
    });
  }

  login() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.credentials.email = email;
    this.credentials.password = password;
    this.authService.login(this.credentials).subscribe(
      response => {
        this.showSnackBarMessage('Wellcome ' + this.authService.getUsername() + '!');
        this.closeDialog();
        this.router.navigate(['/']);
    }, 
    error => {
      this.showSnackBarMessage('Authenticate error');
    }
    )
  }

  showSnackBarMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  closeDialog():void {
    this.dialogRef.close();
  }
}
