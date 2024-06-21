import { Injectable } from '@angular/core';
import { HideoutItem, Item } from '../models/hideout-item.model';
import { environnement } from '../../../.env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideoutDetailService {
  private selectedItem! : HideoutItem ;
  private itemApiUrl = environnement.apiUrl

  constructor(private http:HttpClient) { }

  setSelectedItem(item: HideoutItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): HideoutItem{
    return this.selectedItem;
  }

  addToCart(item : Item) : Observable<any> {
    return this.http.post<Item>(`${this.itemApiUrl}/items`, item)
  }

  getCart() : Observable<any> {
    return this.http.get(`${this.itemApiUrl}/items`)
  }

  deleteCartItem(id :string) : Observable<any> {
    return this.http.delete(`${this.itemApiUrl}/items/${id}`)
  }

}