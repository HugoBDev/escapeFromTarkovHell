import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { UserDataService } from './user.data.service';
import { Item, StationItem } from '../models/tarkovApi.model';

@Injectable({
  providedIn: 'root',
})
export class BackApiService {
  private cartItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<
    Item[]
  >([]);
  cartItems$: Observable<Item[]> = this.cartItemsSubject.asObservable();
  apiUrl = environnement.apiUrl;

  constructor(
    private http: HttpClient,
    @Inject(forwardRef(() => UserDataService))
    private userDataService: UserDataService
  ) {
    this.loadInitialCart()
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

  private loadInitialCart(): void {
    const user: User | null = this.userDataService.getUserData();
    this.http.get<any>(`${this.apiUrl}/user_cart/${user?.id}`).subscribe({
      next: (stationItems : StationItem[]) => {
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

  refreshCart(): void {
    const user: User | null = this.userDataService.getUserData();
    if (user) {
      this.http.get<any>(`${this.apiUrl}/user_cart/${user.id}`).subscribe({
        next: (stationItems: StationItem[]) => {
          const cartItems = stationItems.map(item => item.item);
          this.cartItemsSubject.next(cartItems);
        },
        error: (e) => console.error('Error refreshing cart:', e),
      });
    }
  }

  getCart(): Observable<Item[]> {    
    return this.cartItems$;
  }

  deleteUserCartItem(itemId: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/user_cart/${itemId}`)
      .pipe(
        tap(() => {
          setInterval(() => {
            
            this.refreshCart();
          }, 2000)
        })
      );
  }

  deleteUserCart(): Observable<any> {
    const user: any = this.userDataService.getUserData();
    return this.http.delete<any>(`${this.apiUrl}/user-cart/${user.id}`).pipe(
      tap(() => {
    
          
          this.refreshCart();
      
      })
    );
  }

  loadStationRequirementById(stationId: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/stations/${stationId}`)
      .pipe(map((res) => res));
  }

  loadAllStationsByLvl(level: number): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/stations/level/${level}`)
      .pipe(map((res) => res));
  }


}
