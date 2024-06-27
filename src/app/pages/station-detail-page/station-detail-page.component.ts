import { Component } from '@angular/core';
import {
  HideoutItem,
  Item,
  ItemRequirement,
} from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-station-detail-page',
  standalone: true,
  imports: [AsyncPipe, CartComponent],
  templateUrl: './station-detail-page.component.html',
  styleUrl: './station-detail-page.component.scss',
})
export class StationDetailPageComponent {
  stationDetail!: HideoutItem;
  itemsRequired: ItemRequirement[] = [];
  itemCart: Item[] = [];
  constructor(private hideoutDetailService: HideoutDetailService) {}

  ngOnInit(): void {
    this.stationDetail = this.hideoutDetailService.getSelectedItem();
    this.itemsRequired =
      this.stationDetail.levels[
        this.stationDetail.currentStationLvl
      ].itemRequirements;

    this.showCart();
  }

  addToCart(item: Item, itemQuantity: ItemRequirement) {
    item.quantity = itemQuantity.quantity;
    this.hideoutDetailService.addToCart(item).subscribe({
      next: (response) => {
     console.log("l'objet à bien été ajouté au panier:", item);
        this.showCart()
      },
      error: (e) =>
        console.error("cette object n'a pas pu etre ajouté au panier:", e),
    });
  }

  showCart() {
    
      this.hideoutDetailService.getCart().subscribe({
        next: (items) => {
          this.itemCart = items;
        },
        error: (e) => console.error("Erreur lors de la récupération du panier:", e),
      });
    
  }

  deleteItem(id: string) {
    this.hideoutDetailService.deleteCartItem(id).subscribe({
      next: (res) => {
        console.log("l'item " + id + ' à bien été remove:', res);
      },
    });
  }
  
}
