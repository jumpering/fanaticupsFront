import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { SignupComponent } from '@auth/components/signup/signup.component';
import { MatDialog } from '@angular/material/dialog';
import { CupComponent } from '@cup/components/cup/cup.component';
import { LoginComponent } from '@auth/components/login/login.component';

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
  ) { }

  ngOnInit(): void {
    this.authService.hasSession().subscribe(logged => this.isLogged = logged);
  }

  toHome() {
    this.router.navigate(['/']);
  }

  // isLogin$(): Observable<boolean>{
  //   return this.authService.hasSession();
  // }

  logout(): void {
    // this.authService.logout().then(user => console.log('currentUser after logout subscribe: ' + user));
    this.authService.logout();
  }

  openSignupDialog(){
    this.dialog.open(SignupComponent);
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

}

