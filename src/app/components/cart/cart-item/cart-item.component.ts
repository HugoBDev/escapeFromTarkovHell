import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../models/hideout-item.model';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [],
  styleUrl: './cart-item.component.scss',
  template: `
      <div id="cart-item">
        <p>x{{item.quantity}}</p>
        <img [src]="item.iconLink" [alt]="item.name+'\'icon.'" />
        <div>
          <div id="name">{{ item.name }}</div>
          <div id="goal">Vent lvl 2</div>
        </div>
        <button id="found-btn" (click)="foundClick.emit($event)">found!</button>
        <button class="stealth" (click)="deleteClick.emit($event)">delete</button>
      </div>
  `,
})
export class CartItemComponent {
  @Input() item!: Item;
  @Output() deleteClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() foundClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
