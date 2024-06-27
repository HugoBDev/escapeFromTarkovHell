import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/hideout-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  styleUrl: './cart-item.component.scss',
  template: `
      <div class="cart-item">
      <img [src]="item.iconLink" alt="" />
      {{ item.name }}
      X{{ item.quantity }}
      <button (click)="deleteClick.emit($event)">X</button>
    </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Item;
  @Output() deleteClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();



}
