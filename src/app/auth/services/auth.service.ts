import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private authFire: AngularFireAuth
  ) { }
  login(email: string, password: string) {
    return this.authFire.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authFire.signOut();
  }

  hasSession(): Observable<boolean> {
    return this.authFire.authState
    .pipe(
      // tap(user => {
      //   if (user) {
      //     localStorage.setItem('currentUser', JSON.stringify(user));
      //     const currentUser = localStorage.getItem('currentUser');
      //     const original = JSON.parse(currentUser);
      //   }
      // }),
      map((user) => user === null ? false : true),
    );
  }

}
