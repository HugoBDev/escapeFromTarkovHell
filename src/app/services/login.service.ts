import { Injectable } from '@angular/core';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService  {
    constructor(private http : HttpClient){}
    BASE_URL  = environnement.apiUrl
    
    createAccount(user : User) : Observable<any> {
        return this.http.post(`${this.BASE_URL}/user`, user)
    }

    login(user : User) : Observable<any>{
        return this.http.post(`${this.BASE_URL}/auth/login`, user)
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
}