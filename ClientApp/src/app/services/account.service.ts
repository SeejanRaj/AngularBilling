import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
//import { basename } from 'path';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  private baseUrlLogin: string = "/api/account/login";
  private baseUrlRegister: string = "/api/account/register";
  //private baseUrlAppointment: string = "/api/appointment/addappointment";

  //user prperties

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private Email = new BehaviorSubject<string>(localStorage.getItem('email'));
  private UserRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));


  //register
  register(username: string, password: string, email: string) {
    var name = username;
    return this.http.post<any>(this.baseUrlRegister, { username, password, email}).pipe(map(result => {
      //registration was successful
      return result;
    },
      error => {
        return error;
      }));
  }
  //login method
  login(email: string, password: string) {
    return this.http.post<any>(this.baseUrlLogin, { email, password }).pipe(
      map(result => {
        if (result && result.token) {
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus', '1');
          localStorage.setItem('jwt', result.token);
          localStorage.setItem('email', result.email);
          localStorage.setItem('expiration', result.expiration);
          localStorage.setItem('userRole', result.userRole);
        }
        return result;
      })

    );
  }

  logout() {
    this.loginStatus.next(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['/login']);
    console.log("Logged out!");
  }

  checkLoginStatus(): boolean {
    return false;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }

  loginCheck() {
    if (this.loginStatus) {
      return true;
    }
      return false;
  }


  get currentEmail() {
    return this.Email.asObservable();
  }

  get currentUserRole() {
    return this.UserRole.asObservable();
  }

}
