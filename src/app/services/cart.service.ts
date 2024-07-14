import { forwardRef, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Item, StationItem } from '../models/tarkovApi.model';
import { HttpClient } from '@angular/common/http';
import { UserDataService } from './user.data.service';

@Injectable({
    providedIn: 'root',
})

export class CartService {
  private cartItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<
    Item[]
  >([]);
  cartItems$: Observable<Item[]> = this.cartItemsSubject.asObservable();
  apiUrl = 'http://localhost:3000';

  constructor(
    private userDataService: UserDataService,
    private http: HttpClient
  ) {
    this.loadInitialCart();
  }

  refreshCart(): void {
    const user: User | null = this.userDataService.getUserData();
    if (user) {
      this.http.get<any>(`${this.apiUrl}/user_cart/${user.id}`).subscribe({
        next: (stationItems: StationItem[]) => {
          const cartItems = stationItems.map((item) => item.item);
          this.cartItemsSubject.next(cartItems);
        },
        error: (e) => console.error('Error refreshing cart:', e),
      });
    }
  }

  getCart(): Observable<Item[]> {
    return this.cartItems$;
  }

  private loadInitialCart(): void {
    const user: User | null = this.userDataService.getUserData();
    this.http.get<any>(`${this.apiUrl}/user_cart/${user?.id}`).subscribe({
      next: (stationItems: StationItem[]) => {
        console.log(stationItems);

        stationItems.forEach((item: any) => {
          this.cartItemsSubject.next([
            ...this.cartItemsSubject.value,
            item.item,
          ]);
        });
      },
      error: (e) => console.error(e),
    });
  }

  addToCart(itemId: number, quantity: number): Observable<any> {
    return this.http
      .post<Item>(`${this.apiUrl}/user_cart/add`, { itemId, quantity })
      .pipe(
        tap(() => {
          this.refreshCart();
        })
      );
  }

  deleteUserCartItem(itemId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user_cart/${itemId}`).pipe(
      tap(() => {
        setInterval(() => {
        this.refreshCart();
        }, 2000);
      })
    );
  }

  deleteUserCart(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user_cart/`).pipe(
      tap(() => {
      this.refreshCart();
      })
    );
  }
}
