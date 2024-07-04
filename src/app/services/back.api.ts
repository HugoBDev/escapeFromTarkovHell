import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { LoginService } from './login.service';
import { Item } from '../models/hideout-item.model';

@Injectable({
  providedIn: 'root',
})
export class BackApiService {
  private cartItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<
    Item[]
  >([]);
  cartItems$: Observable<Item[]> = this.cartItemsSubject.asObservable();
  apiUrl = environnement.apiUrl;
  loginService = this.injector.get(LoginService);
  user = this.loginService.getUserData();
  constructor(private http: HttpClient, private injector: Injector) {
    this.loadInitialCart();
  }

  addToCart(itemTarkovId: string, user: User): Observable<any> {
    return this.http
      .post<Item>(`${this.apiUrl}/user-items`, { itemTarkovId, user })
      .pipe(
        tap((newItem) => {
          const currentItems = this.cartItemsSubject.value;
          console.log('current items before update: ', currentItems);

          const updatedItems = [...currentItems, newItem];
          this.cartItemsSubject.next(updatedItems);

          console.log('updated items: ', updatedItems);
        })
      );
  }

  private loadInitialCart(): void {
    this.http.get<any>(`${this.apiUrl}/user-items/${this.user.id}`).subscribe({
      next: (items) => {
        items.userItems.forEach((item: any) => {
          console.log(item.item);

          this.cartItemsSubject.next([
            ...this.cartItemsSubject.value,
            item.item,
          ]);
        });
      },
      error: (e) => console.error(e),
    });
  }

  getCart(): Observable<Item[]> {
    return this.cartItems$;
  }

  deleteUserItem(tarkovId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/user-items/${this.user.id}/${tarkovId}`)
      .pipe(
        map(() => {
//Permet de laisser à l'animation le temps de se jouer//
          setTimeout(() => {
            const currentItems = this.cartItemsSubject.value.filter(
              (item) => item.tarkovId !== tarkovId
            );
            this.cartItemsSubject.next(currentItems);
          }, 1000)
        })
      );
  }

  deleteUserCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user-items/${this.user.id}`).pipe( 
      map(() => {
      
          
          this.cartItemsSubject.next([])
     
      })
    )
  }
}
