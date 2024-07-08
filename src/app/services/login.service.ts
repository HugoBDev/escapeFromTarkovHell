import { Injectable, Injector } from '@angular/core';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  map,
} from 'rxjs';
import { Router } from '@angular/router';
import { BackApiService } from './back.api';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router, private injector: Injector) {}
  BASE_URL = environnement.apiUrl;
  public userLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  createAccount(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/user`, user);
  }

  getToken(user: User): Observable<any> {
    return this.http.post(`${this.BASE_URL}/auth/login`, user);
  }

  login(user: User):Promise<any> {
    return new Promise((resolve, reject) => this.getToken(user).subscribe({
      next: (res) => {
        sessionStorage.setItem('tarkovToken', res.token);
        this.getUserStatus().subscribe({
          next: () => {
            this.router.navigate(['']), console.log('login complete');
            this.userLogged.next(true)
            resolve('login complete');
          },
          error: (e:HttpErrorResponse) => {
            reject(e)
          },
        });
      },
      error: (e:HttpErrorResponse) => {
        reject(e)
      },
    }))
  }

  isLogged(): boolean {
    const isLogged = sessionStorage.getItem('tarkovToken');

    if (isLogged) {
      return true;
    } else {
      console.log('veuillez vous connectez');
      return false;
    }
  }

  logout() {
    sessionStorage.clear();
    this.userLogged.next(false);
    this.router.navigate(['/login']);
  }

  getUserData() : any{
    const tarkovUserData =  sessionStorage.getItem('tarkovUser')
    if(tarkovUserData){
      return JSON.parse(tarkovUserData)
    }else {
      throw new Error('Aucun utilisateur n\'est connecté')
    }
  }

  getUserStatus(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/auth/status`).pipe(
      map((res: any) => {
        console.log(res.id);
        sessionStorage.setItem('tarkovUser', JSON.stringify(res));
      })
    );
  }
}
