import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';
import { RegisterComponent } from '@auth/components/register/register.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '@auth/components/login/login.component';
import { BreakpointService } from 'src/app/utils/breakpoint.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged!: boolean;
  public isHandset$!: Observable<boolean>;

  constructor(
    public router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public breakpointService: BreakpointService
  ) {
   }

  ngOnInit(): void {
    this.isHandset$ = this.breakpointService.isHandset$;
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

