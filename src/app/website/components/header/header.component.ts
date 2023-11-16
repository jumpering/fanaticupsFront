import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { RegisterComponent } from '@auth/components/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { CupComponent } from '@cup/components/cup/cup.component';
import { LoginComponent } from '@auth/components/login/login.component';
import * as JWT from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    //this.isLogged = this.authService.getToken() !== null;
    //this.isLogged = this.authService.hasSession();
   }

  ngOnInit(): void {
    //this.authService.hasSession().subscribe(logged => this.isLogged = logged);
  }

  hasSession(): Observable<boolean>{
    return this.authService.hasSession();
  }

  toHome() {
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.clear();
    // this.authService.logout().then(user => console.log('currentUser after logout subscribe: ' + user));
    //this.authService.logout();
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent);
    //this.dialog.open(SignupComponent);
    // const dialogRef = this.dialog.open(SignupComponent);
    // dialogRef.afterClosed().subscribe(resp => {
    //   console.log(resp);
    // })
  }

  openLoginDialog(){
    this.dialog.open(LoginComponent);
    //this.dialog.open(SignupComponent);
    // const dialogRef = this.dialog.open(SignupComponent);
    // dialogRef.afterClosed().subscribe(resp => {
    //   console.log(resp);
    // })
  } 

  getUsername(): string | undefined{
    return 'Wellcome ' + this.authService.getUsername();
  }
}

