import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BackApiService } from '../../services/back.api';
import { Item } from '../../models/tarkovApi.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgClass, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  items: Item[] = [];

  constructor( private backApiService: BackApiService) {}

  ngOnInit(): void {
    this.backApiService.cartItems$.subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  clearCart(){
    this.backApiService.deleteUserCart().subscribe({
      next: () => {
        console.log('la liste à été clear');
      },
      error: (e) => console.error(e),
    })
  }

}
