import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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


  constructor(private http: HttpClient) {
    
 
  }

 

  setSelectedItem(item: HideoutItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): HideoutItem {
    return this.selectedItem;
  }

  addToCart(item: Item): Observable<Item> {
  
  
    return this.http.post<Item>(`${this.itemApiUrl}/items`, item).pipe(
      tap((newItem) => {
        const currentItems = this.cartItemsSubject.value;
        this.cartItemsSubject.next([...currentItems, newItem]);
      })
    );
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${this.itemApiUrl}/items`).pipe(
      tap(() => {
        this.cartItemsSubject.next([]); // Réinitialiser le cartItemsSubject à un tableau vide
      }),
      catchError((error) => {
        console.error('Erreur lors de la suppression du panier:', error);
        return throwError(() => error);
      })
    );
  }
}
