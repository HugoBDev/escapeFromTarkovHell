import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HideoutItem, Item } from '../models/hideout-item.model';
import { environnement } from '../../../.env/env';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class HideoutDetailService {
  private selectedItem!: HideoutItem;
  private itemApiUrl = environnement.apiUrl;
  private cartItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject<
    Item[]
  >([]);
  cartItems$: Observable<Item[]> = this.cartItemsSubject.asObservable();


  constructor(private http: HttpClient, private loginService : LoginService) {
    
    this.loadInitialCart();
  }

 

  setSelectedItem(item: HideoutItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): HideoutItem {
    return this.selectedItem;
  }
  //*Charger Cart dans le constructor du service//
  private loadInitialCart(): void {
    this.http.get<Item[]>(`${this.itemApiUrl}/items`).subscribe({
      next: (items) => {
        this.cartItemsSubject.next(items);
      },
      error: (e) =>
        console.error('Erreur lors du chargement initial du panier:', e),
    });
  }
  //*Ici j'ajoute à la DB les Item puis je met à jour directement grave au BehaviorSubject
  addToCart(item: Item): Observable<Item> {
  
  
    return this.http.post<Item>(`${this.itemApiUrl}/items`, item).pipe(
      tap((newItem) => {
        const currentItems = this.cartItemsSubject.value;
        this.cartItemsSubject.next([...currentItems, newItem]);
      })
    );
  }

  getCart(): Observable<Item[]> {
      return this.cartItems$;
  }

  deleteCartItem(id: string): Observable<any> {
    return this.http.delete(`${this.itemApiUrl}/items/${id}`).pipe(
      tap(() => {
        const currentItems = this.cartItemsSubject.value.filter(
          (item) => item.id !== id
        );
        this.cartItemsSubject.next(currentItems);
      })
    );
  }
}
