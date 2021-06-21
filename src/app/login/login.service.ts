import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = 'http://localhost:1111';

  userData = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) { }

  signIn( credential) {
    // credential.login = 'admin';
    // credential.password = 'admin' 
    return this.http.post(this.API + '/authenticate', credential).pipe(
      tap(data => {
         localStorage.setItem('userData', JSON.stringify(data))
         this.userData.next(data)
       })
    );

               
  }


  autoLogin() {
    let localUser = JSON.parse(localStorage.getItem('userData'))
    console.log('behivior: ', localUser)
    if(localUser) {
      this.userData.next(localUser)
    }
  }

  logout() {
    this.userData.next(null)
    localStorage.removeItem('userData')
    this.router.navigate(['/login'])
  }


  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
  }
}
