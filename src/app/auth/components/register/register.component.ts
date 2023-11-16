import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credentials } from '@auth/models/Credentials';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RegisterComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: 'ojo al dato'
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void{
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      //password: ['', [Validators.required, Validators.minLength(8)]],
      //confirmPassword: ['', Validators.required, Validators.minLength(6)]
    });
  }

  register(): void {
    if (this.form.valid) {
      const name = this.form.value.name;
      const email = this.form.value.email;
      const password = this.form.value.password;
      //this.credentials.user = email;
      this.credentials.name = name;
      this.credentials.email = email;
      this.credentials.password = password;
      this.authService.register(this.credentials).subscribe(
        response => {
          this.showSnackBarMessage('Wellcome!');
          this.closeDialog();
          this.router.navigate(['/']);
      }, 
      error => {
        this.showSnackBarMessage('error: ' + error);
      }
      )
    }
  }

  get emailField(): string{
    return this.form.value.email;
  }

  showSnackBarMessage(message: string): void {
    this.snackBar.open(message, '', { duration: 5000 });
  }

  closeDialog():void {
    this.dialogRef.close();
  }

}
