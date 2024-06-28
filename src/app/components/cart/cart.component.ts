import { Component, Input } from '@angular/core';
import { Item } from '../../models/hideout-item.model';
import { HideoutDetailService } from '../../services/hideout-detail.service';
import { NgClass } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgClass, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  items: Item[] = [];

  constructor(private hideoutDetailService: HideoutDetailService) {}

  ngOnInit(): void {
    this.hideoutDetailService.getCart().subscribe({
      next: (items) => {
        // this.items = items;

        this.items = [
          {
            name: 'Moteur électrique',
            iconLink:
              'https://assets.tarkov.dev/5d1b2fa286f77425227d1674-icon.webp',
            id: '5d1b2fa286f77425227d1674',
            quantity: 1,
          },
          {
            name: 'Batterie de voiture',
            iconLink:
              'https://assets.tarkov.dev/5733279d245977289b77ec24-icon.webp',
            id: '5733279d245977289b77ec24',
            quantity: 1,
          },
          {
            name: 'Ventilateur de processeur',
            iconLink:
              'https://assets.tarkov.dev/5734779624597737e04bf329-icon.webp',
            id: '5734779624597737e04bf329',
            quantity: 3,
          },
          {
            name: 'Pièces détachées métalliques',
            iconLink:
              'https://assets.tarkov.dev/61bf7b6302b3924be92fa8c3-icon.webp',
            id: '61bf7b6302b3924be92fa8c3',
            quantity: 2,
          },
          {
            name: 'Moteur électrique',
            iconLink:
              'https://assets.tarkov.dev/5d1b2fa286f77425227d1674-icon.webp',
            id: '5d1b2fa286f77425227d1674',
            quantity: 1,
          },
          {
            name: 'Batterie de voiture',
            iconLink:
              'https://assets.tarkov.dev/5733279d245977289b77ec24-icon.webp',
            id: '5733279d245977289b77ec24',
            quantity: 1,
          },
          {
            name: 'Ventilateur de processeur',
            iconLink:
              'https://assets.tarkov.dev/5734779624597737e04bf329-icon.webp',
            id: '5734779624597737e04bf329',
            quantity: 3,
          },
          {
            name: 'Pièces détachées métalliques',
            iconLink:
              'https://assets.tarkov.dev/61bf7b6302b3924be92fa8c3-icon.webp',
            id: '61bf7b6302b3924be92fa8c3',
            quantity: 2,
          },
        ];
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  deleteItem(id: string) {
    this.hideoutDetailService.deleteCartItem(id).subscribe({
      next: (res) => {
        console.log("L'item " + id + ' a bien été retiré:', res);
      },
      error: (e) =>
        console.error("Erreur lors de la suppression de l'item:", e),
    });
  }

  deleteAll() {
    this.hideoutDetailService.clearCart().subscribe({
      next: (res) => {
        console.log('la liste à été clear');
      },
      error: (e) => console.error(e),
    });
  }
}
