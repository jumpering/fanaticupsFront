import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar 
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

  signup(): void {
    if (this.form.valid) {
      const email = this.form.value.email;
      const password = this.form.value.password;
      this.authService.signup(email, password)
      .then(data => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log({error});
        this.snackBar.open(error.message,'close',{duration: 5000});
      });
    }
  }

  // get emailField(){
  //   return this.form.value.email;
  // }

}
