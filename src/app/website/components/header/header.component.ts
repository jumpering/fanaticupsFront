import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isLogged!: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
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

}

