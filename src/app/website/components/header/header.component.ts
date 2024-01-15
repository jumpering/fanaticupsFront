import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { RegisterComponent } from '@auth/components/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@auth/components/login/login.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged!: boolean;
  public isSmallScreen: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver
  ) {
   }

  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      const breakpoints = result.breakpoints;
      if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall]){
        this.isSmallScreen = true;
      } else {
        this.isSmallScreen = false;
      }
    });
  }

  hasSession(): Observable<boolean>{
    return this.authService.hasSession();
  }

  toHome() {
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.clear();
  }

  openRegisterDialog(){
    this.dialog.open(RegisterComponent);
  }

  openLoginDialog(){
    this.dialog.open(LoginComponent);
  } 

  getUsername(): string | undefined{
    return this.authService.getUsername();
  }
}

