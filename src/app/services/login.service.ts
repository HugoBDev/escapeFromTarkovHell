import { Injectable } from '@angular/core';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
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

  login(user: User) {
    this.getToken(user).subscribe({
      next: (res) => {
        sessionStorage.setItem('tarkovToken', res.token);
        this.getUserStatus().subscribe({
          next: () => {
            this.router.navigate(['']), console.log('login complete');
            this.userLogged.next(true)
          },
          error: (e) => console.error(e),
        });
      },
    });
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
