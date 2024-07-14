import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BackApiService } from '../../services/back.api';
import { Item } from '../../models/tarkovApi.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgClass, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  items: Item[] = [];

  constructor( private backApiService: BackApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe({
      next: (items) => {
        this.items = items;
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  clearCart(){
    this.cartService.deleteUserCart().subscribe({
      next: (res) => {        
        console.log('la liste à été clear');
      },
      error: (e) => console.error(e),
    })
  }

}
