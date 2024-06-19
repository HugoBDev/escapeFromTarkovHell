import { Component } from '@angular/core';
import {
  HideoutItem,
  Item,
  ItemRequirement,
  Level,
} from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss',
})
export class StationDetailPageComponent {
  stationDetail!: HideoutItem;
  itemsRequired: ItemRequirement[] = [];
  itemCart: ItemRequirement[] = [];
  constructor(private hideoutDetailService: HideoutDetailService) {}

  ngOnInit(): void {
    this.stationDetail = this.hideoutDetailService.getSelectedItem();
    this.itemsRequired =
      this.stationDetail.levels[
        this.stationDetail.currentStationLvl
      ].itemRequirements;
      
      
  }

  addToCart(item: Item, itemQuantity : ItemRequirement) {
    
    item.quantity = itemQuantity.quantity
    this.hideoutDetailService.addToCart(item).subscribe({
      next: (response) => {
        
        console.log("l'objet à bien été ajouté au panier:", item);
    
      },
      error: (e) =>
        console.error("cette object n'a pas pu etre ajouté au panier:", e),
    });
  }

  // addAllToCart() {
  //   this.itemsRequired.forEach((item) => {
  //     this.addToCart(item)
  //   });
  // }
}
