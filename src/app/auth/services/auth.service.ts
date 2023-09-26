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

  signup(email: string, password: string) {
    return this.authFire.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authFire.signOut();
  }

  hasSession(): Observable<boolean> {
  //hasSession(): boolean {    
    //this.authFire.onAuthStateChanged.
    // this.authFire.authState.subscribe(user => user === null ? flag = false : flag = true);
    //return flag;
    //console.log('test');
    return this.authFire.authState
    .pipe(
      // tap(user => {
      //   if (user) {
      //     localStorage.setItem('currentUser', JSON.stringify(user));
      //     const currentUser = localStorage.getItem('currentUser');
      //     const original = JSON.parse(currentUser);
      //   }
      // }),
      // map((user) => user === null ? false : true),
      map(user => {
        //console.log('dentro pipe/map')
        if(user === null || user === undefined){
          //console.log('es false');
          return false;
        } else {
          //console.log('es true');
          return true;
        }
      }
    ));
  }



  currentUserMail(): string | undefined{
    var userName;
    this.authFire.currentUser.then(user => {
      if (user?.email === null || user?.email === undefined){
        userName = 'nulo';
      } else {
        userName = user.email.toString();
      }
    });
    return userName;
  }

}
