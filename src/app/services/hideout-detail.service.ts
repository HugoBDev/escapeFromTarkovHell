import { Injectable } from '@angular/core';
import { HideoutItem } from '../models/hideout-item.model';

@Injectable({
  providedIn: 'root'
})
export class HideoutDetailService {
  private selectedItem! : HideoutItem ;

  constructor() { }

  setSelectedItem(item: HideoutItem): void {
    this.selectedItem = item;
  }

  getSelectedItem(): HideoutItem{
    return this.selectedItem;
  }
}