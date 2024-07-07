import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, forwardRef } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environnement } from '../../../.env/env';
import { User } from '../models/user.model';
import { Item } from '../models/hideout-item.model';
import { UserDataService } from './user.data.service';

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
  }

  addToCart(itemTarkovId: string): Observable<any> {
    const user: any = this.userDataService.getUserData();
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
    const user: any = this.userDataService.getUserData();
    this.http.get<any>(`${this.apiUrl}/user-items/${user.id}`).subscribe({
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
    const user: any = this.userDataService.getUserData();
    return this.http
      .delete<any>(`${this.apiUrl}/user-items/${user.id}/${tarkovId}`)
      .pipe(
        map(() => {
          //Permet de laisser à l'animation le temps de se jouer//
          setTimeout(() => {
            const currentItems = this.cartItemsSubject.value.filter(
              (item) => item.tarkovId !== tarkovId
            );
            this.cartItemsSubject.next(currentItems);
          }, 1000);
        })
      );
  }

  deleteUserCart(): Observable<any> {
    const user :  any = this.userDataService.getUserData();
    return this.http.delete<any>(`${this.apiUrl}/user-items/${user.id}`).pipe(
      map(() => {
        this.cartItemsSubject.next([]);
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
