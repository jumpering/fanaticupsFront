import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';

import { MatDialogRef } from '@angular/material/dialog';
import { Credentials } from '@auth/models/Credentials';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  credentials: Credentials = {
    name: '',
    email:'',
    password: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackBar: MatSnackBar
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    //this.form.markAllAsTouched();
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
