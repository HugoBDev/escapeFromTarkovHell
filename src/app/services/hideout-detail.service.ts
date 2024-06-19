import { Injectable } from '@angular/core';
import { HideoutItem, Item, ItemRequirement } from '../models/hideout-item.model';
import { environnement } from '../../../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideoutDetailService {
  private selectedItem! : HideoutItem ;
  private backEndUrl = `${environnement.apiUrl}`

  constructor(private http:HttpClient) { }

  setSelectedItem(item: HideoutItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): HideoutItem{
    return this.selectedItem;
  }

  addToCart(item : Item) : Observable<any> {
    return this.http.post<Item>(`${this.backEndUrl}`, item)
  }

  
}